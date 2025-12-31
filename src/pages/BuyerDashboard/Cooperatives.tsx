import React, { useEffect, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import BuyerSideNav from "../../components/BuyerSideNav";
import { LuUsers, LuShieldCheck, LuMapPin, LuSprout } from "react-icons/lu";
import { Notification02Icon, Search01Icon, UnfoldMoreIcon } from "hugeicons-react";
import orgLogo from "../../assets/orgLogo.jpeg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchCooperatives, joinCooperative, type Cooperative } from "../../utils/coops";
import { getStoredUser } from "../../utils/user";
import BackToDashboardPill from "../../components/BackToDashboardPill";

type CooperativeDisplay = Cooperative & {
  membersCount: number;
  isVerified: boolean;
  enrollmentStatus: "Open" | "Closed";
  region: string;
  cropFocus: string;
  joined?: boolean;
};

const BuyerCooperatives: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [coops, setCoops] = useState<CooperativeDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [joinedFilter, setJoinedFilter] = useState<"all" | "joined">("all");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCooperatives = async () => {
      try {
        const data = await fetchCooperatives();
        let displayData: CooperativeDisplay[] = data.map(c => ({
          ...c,
          membersCount: Math.floor(Math.random() * 2000) + 100,
          isVerified: Math.random() > 0.3,
          enrollmentStatus: Math.random() > 0.5 ? "Open" : "Closed",
          region: "Midwest",
          cropFocus: "Mixed",
        }));
        const currentUserId = getStoredUser()?.id;
        if (currentUserId) {
          // Basic assumption: no membership API yet, default not joined
          displayData = displayData.map(c => ({ ...c, joined: false }));
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

  const filtered = coops.filter(c => (joinedFilter === "joined" ? c.joined : true));

  const handleJoin = async (id: number) => {
    try {
      await joinCooperative(id);
      setCoops(prev => prev.map(c => c.id === id ? { ...c, membersCount: c.membersCount + 1, joined: true } : c));
      toast.success("Joined cooperative");
      navigate(`/CoopDashboard?id=${id}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Failed to join cooperative.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <BuyerSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 md:ml-64 h-screen overflow-y-auto">
          <div className="mb-4">
            <BackToDashboardPill to="/BuyerDashboard" />
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Discover Cooperatives</h1>
              <p className="text-gray-500 text-sm">Join co-ops to source verified products and build trusted supplier relationships.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2">
                <Search01Icon size={18} />
                <input placeholder="Search cooperatives" className="outline-0 bg-transparent text-sm" />
              </div>
              <button
                onClick={() => setJoinedFilter(prev => prev === "all" ? "joined" : "all")}
                className="px-3 py-2 text-sm rounded-md border bg-white"
              >
                {joinedFilter === "joined" ? "Showing: Joined" : "Showing: All"}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((coop) => (
                <div key={coop.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <img src={coop.image_url || orgLogo} alt={coop.name} className="h-32 w-full object-cover" />
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-base font-semibold text-gray-800">{coop.name}</p>
                        <p className="text-sm text-gray-500">{coop.description}</p>
                      </div>
                      {coop.isVerified && (
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                          <LuShieldCheck /> Verified
                        </span>
                      )}
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1"><LuMapPin /> {coop.region}</div>
                      <div className="flex items-center gap-1"><LuSprout /> {coop.cropFocus}</div>
                      <div className="flex items-center gap-1"><LuUsers /> {(coop.membersCount / 1000).toFixed(1)}k</div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${coop.enrollmentStatus === "Open" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-700"}`}>
                        {coop.enrollmentStatus}
                      </span>
                      {coop.joined ? (
                        <button
                          onClick={() => navigate(`/CoopDashboard?id=${coop.id}`)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold"
                        >
                          Visit Coop
                        </button>
                      ) : (
                        <button
                          onClick={() => handleJoin(coop.id)}
                          className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                        >
                          Join
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BuyerCooperatives;
