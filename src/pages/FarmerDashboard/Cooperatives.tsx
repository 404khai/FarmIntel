import React, { useState, useEffect } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import { LuUsers, LuCircleCheck, LuFilter, LuChevronDown } from "react-icons/lu";
import { fetchCooperatives, joinCooperative, type Cooperative } from "../../utils/coops";
import toast, { Toaster } from "react-hot-toast";

// Extended interface for UI display purposes
interface CooperativeDisplay extends Cooperative {
  membersCount: number;
  isVerified: boolean;
  enrollmentStatus?: "Open" | "Closed";
  region?: string;
  cropFocus?: string;
}

const Cooperatives: React.FC = () => {
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

  // Mock data to match the design image
  const mockCooperatives: CooperativeDisplay[] = [
    {
      id: 1,
      name: "GreenField Collective",
      description: "Dedicated to sustainable organic farming practices in the Midwest with a focus on corn and soy exports.",
      image_url: "https://images.unsplash.com/photo-1625246333195-58197bd47d26?auto=format&fit=crop&q=80&w=300&h=200",
      membersCount: 1200,
      isVerified: true,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: "Valley Grain Alliance",
      description: "A powerful network of wheat and barley growers maximizing storage efficiency and logistics.",
      image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=300&h=200",
      membersCount: 850,
      isVerified: true,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      name: "EcoHarvest Network",
      description: "Connecting small-scale fruit farmers with premium organic markets and grocers nationwide.",
      image_url: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=300&h=200",
      membersCount: 400,
      isVerified: false,
      enrollmentStatus: "Open",
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      name: "DairyPro Union",
      description: "A cooperative for dairy farmers focusing on modernizing equipment and ensuring milk price stability.",
      image_url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=300&h=200",
      membersCount: 2100,
      isVerified: true,
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      name: "SoyBean United",
      description: "Export-focused group helping soy farmers reach international markets in Asia and Europe.",
      image_url: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=300&h=200",
      membersCount: 1500,
      isVerified: true,
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      name: "TechFarm Innovators",
      description: "A community for forward-thinking farmers adopting IoT, drones, and precision agriculture.",
      image_url: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=300&h=200",
      membersCount: 320,
      isVerified: false,
      enrollmentStatus: "Open",
      created_at: new Date().toISOString()
    }
  ];

  const [coops, setCoops] = useState<CooperativeDisplay[]>(mockCooperatives);
  const [loading, setLoading] = useState(false);

  const handleJoin = async (id: number) => {
    try {
      // await joinCooperative(id); // backend integration
      toast.success("Request to join sent successfully!");
    } catch (error) {
      toast.error("Failed to join cooperative.");
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
            </div>
          </div>

          {/* Cooperatives List */}
          <div className="space-y-4">
            {coops.map((coop) => (
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
                    {coop.enrollmentStatus === "Open" && (
                      <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        Enrollment Open
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
                  <button 
                    onClick={() => handleJoin(coop.id)}
                    className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-lime-200"
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
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
