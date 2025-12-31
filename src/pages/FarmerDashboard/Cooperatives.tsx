import React, { useState, useEffect } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import { LuUsers, LuCircleCheck, LuChevronDown } from "react-icons/lu";
import { fetchCooperatives, joinCooperative, fetchCooperativeMembers, type Cooperative } from "../../utils/coops";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getStoredUser } from "../../utils/user";

// Extended interface for UI display purposes
interface CooperativeDisplay extends Cooperative {
  membersCount: number;
  isVerified: boolean;
  enrollmentStatus?: "Open" | "Closed";
  region?: string;
  cropFocus?: string;
  joined?: boolean;
}

const Cooperatives: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("farmerSidebarCollapsed") === "true";
  });

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const newState = !prev;
      localStorage.setItem("farmerSidebarCollapsed", String(newState));
      return newState;
    });
  };

  const [coops, setCoops] = useState<CooperativeDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [joinedFilter, setJoinedFilter] = useState<"all" | "joined">("all");

  useEffect(() => {
    const loadCooperatives = async () => {
      try {
        const data = await fetchCooperatives();
        // Transform the fetched data to match the display interface
        // Adding random/placeholder values for fields not present in the backend yet
        let displayData: CooperativeDisplay[] = data.map(c => ({
          ...c,
          membersCount: Math.floor(Math.random() * 2000) + 100, // Placeholder
          isVerified: Math.random() > 0.3, // Randomly verify 70%
          enrollmentStatus: Math.random() > 0.5 ? "Open" : "Closed",
          region: "Midwest",
          cropFocus: "Mixed"
        }));
        // Determine if current user is a member of each coop
        const currentUserId = getStoredUser()?.id;
        if (currentUserId) {
          const withMembership = await Promise.all(
            displayData.map(async (c) => {
              try {
                const members = await fetchCooperativeMembers(c.id);
                const isMember = members.some(m => m.user?.id === currentUserId);
                return { ...c, joined: isMember };
              } catch {
                return { ...c, joined: false };
              }
            })
          );
          displayData = withMembership;
        }
        setCoops(displayData);
      } catch (error) {
        console.error("Failed to fetch cooperatives", error);
        toast.error("Could not load cooperatives. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCooperatives();
  }, []);

  const handleJoin = async (id: number) => {
    try {
      const membership = await joinCooperative(id);
      setCoops(prev => prev.map(c => c.id === id ? { ...c, membersCount: c.membersCount + 1, joined: true } : c));
      localStorage.setItem("coopJoinEvent", JSON.stringify({ coopId: id, role: membership.role, timestamp: Date.now() }));
      const roleLabel = membership.role?.includes("farmer") ? "Farmer" : membership.role?.includes("buyer") ? "Buyer" : membership.role;
      toast.success(`Joined as ${roleLabel}`);
      navigate(`/CoopDashboard?id=${id}`);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        toast.error("Forbidden: Please ensure join action allows non-owners.");
      } else if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.detail || "Already a member or invalid role.");
      } else {
        toast.error("Failed to join cooperative.");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <FarmerSideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        collapsed={isSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col">
        <DashboardNav
          onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onToggleCollapse={handleToggleCollapse}
        />
        <Toaster position="top-right" />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} transition-all duration-300 min-h-screen`}>
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/Home" },
                { label: "Dashboard", to: "/FarmerDashboard" },
                { label: "Cooperatives" },
              ]}
            />
          </div>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Available Cooperatives</h1>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Region: All <LuChevronDown className="text-gray-400" />
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Crop: All <LuChevronDown className="text-gray-400" />
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Sort by: Popularity <LuChevronDown className="text-gray-400" />
                </button>
              </div>
              <div className="relative">
                <button
                  onClick={() => setJoinedFilter(prev => (prev === "all" ? "joined" : "all"))}
                  className={`flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-medium transition ${
                    joinedFilter === "joined" ? "bg-lime-50 border-lime-200 text-lime-700" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {joinedFilter === "joined" ? "Joined: Only" : "Joined: All"}
                  <LuChevronDown className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Cooperatives List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-20 text-gray-500">Loading cooperatives...</div>
            ) : coops.length === 0 ? (
              <div className="text-center py-20 text-gray-500">No cooperatives found.</div>
            ) : (
              coops
                .filter(c => joinedFilter === "joined" ? c.joined : true)
                .map((coop) => (
              <div key={coop.id} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-5 md:items-center hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="w-full md:w-48 h-32 md:h-28 flex-shrink-0">
                  <img 
                    src={coop.image_url || "https://via.placeholder.com/300x200"} 
                    alt={coop.name} 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-lg font-bold text-gray-900">{coop.name}</h3>
                    {coop.isVerified && (
                      <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        <LuCircleCheck size={12} className="fill-current" /> Verified
                      </span>
                    )}
                    {coop.joined && (
                      <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        You are in this coop
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{coop.description}</p>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2 min-w-[140px] justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="flex items-center gap-2 text-gray-600">
                    <LuUsers className="text-gray-400" />
                    <span className="text-sm font-medium">{(coop.membersCount / 1000).toFixed(1)}k Members</span>
                  </div>
                  {coop.joined ? (
                    <button
                      onClick={() => navigate(`/CoopDashboard?id=${coop.id}`)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Visit Coop
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleJoin(coop.id)}
                      className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-lime-200"
                    >
                      Join
                    </button>
                  )}
                </div>
              </div>
            )))}
          </div>

          {/* Load More */}
          <div className="mt-10 flex justify-center mb-10">
            <button className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
              Load More
            </button>
          </div>

          {/* Footer */}
          <footer className="mt-auto border-t border-gray-200 pt-8 pb-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
            <p>© 2023 FarmIntel. All rights reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-gray-600">Privacy</a>
              <a href="#" className="hover:text-gray-600">Terms</a>
              <a href="#" className="hover:text-gray-600">Help</a>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
};

export default Cooperatives;
