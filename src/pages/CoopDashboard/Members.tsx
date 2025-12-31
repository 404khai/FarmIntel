import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav";
import CoopSideNav from "../../components/CoopSideNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import { 
  UserGroupIcon, 
  Motorbike02Icon, 
  Store04Icon, 
  FilterIcon, 
  SortByDown02Icon, 
  PlusSignIcon 
} from "hugeicons-react";
import { fetchCooperativeMembersDetail, isCoopOwner, type CooperativeMemberDetail } from "../../utils/coops";
import { getFullName } from "../../utils/user";
import toast from "react-hot-toast";

const Members: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [members, setMembers] = useState<CooperativeMemberDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allowed, setAllowed] = useState<boolean>(true);
  
  const [searchParams] = useSearchParams();
  const coopId = searchParams.get("id");

  useEffect(() => {
    const loadMembers = async () => {
      if (!coopId) {
        setIsLoading(false);
        return;
      }
      try {
        const idNum = parseInt(coopId);
        const owner = await isCoopOwner(idNum);
        setAllowed(owner);
        if (!owner) {
          setMembers([]);
          return;
        }
        const data = await fetchCooperativeMembersDetail(idNum);
        setMembers(data);
      } catch (error) {
        toast.error("Failed to load cooperative members");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMembers();
  }, [coopId]);

  const getRoleStyle = (role: string) => {
    switch (role?.toLowerCase()) {
      case "owner":
        return { label: "Owner", color: "bg-amber-100 text-amber-700" };
      case "member_farmer":
      case "farmer":
        return { label: "Farmer", color: "bg-emerald-100 text-emerald-700" };
      case "member_buyer":
      case "buyer":
        return { label: "Buyer", color: "bg-blue-100 text-blue-700" };
      default:
        return { label: role || "Member", color: "bg-gray-100 text-gray-700" };
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return { label: "Active", dot: "bg-emerald-500" };
      case "pending":
        return { label: "Pending", dot: "bg-yellow-500" };
      case "deactivated":
        return { label: "Deactivated", dot: "bg-gray-400" };
      default:
        return { label: status || "Unknown", dot: "bg-gray-200" };
    }
  };

  const joinEvent = (() => {
    try {
      const raw = localStorage.getItem("coopJoinEvent");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();
  const coopIdNum = coopId ? parseInt(coopId) : null;
  const isRecentJoin = joinEvent && coopIdNum && joinEvent.coopId === coopIdNum && (Date.now() - (joinEvent.timestamp || 0)) < 5 * 60 * 1000;
  const extraFarmer = isRecentJoin && String(joinEvent.role).includes("farmer") ? 1 : 0;
  const extraBuyer = isRecentJoin && String(joinEvent.role).includes("buyer") ? 1 : 0;
  const extraTotal = isRecentJoin ? 1 : 0;
  const farmersCount = members.filter(m => (m.role || m.role_display).toLowerCase().includes("farmer")).length + extraFarmer;
  const buyersCount = members.filter(m => (m.role || m.role_display).toLowerCase().includes("buyer")).length + extraBuyer;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CoopSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} collapsed={isSidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)} onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)} />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
          {!allowed && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700 mb-6">
              Access restricted — only the cooperative owner can view member management.
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <Breadcrumbs items={[{ label: "Dashboard", to: "/CoopDashboard" }, { label: "Member Management" }]} />
            <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-lime-600 text-white text-sm"><PlusSignIcon size={18} /> Add New Member</button>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Member Management</h1>
            <p className="text-gray-500 mt-1">Manage your co-operative’s members, track roles and statuses, and invite new participants.</p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Total Members</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-lime-50 text-lime-600"><UserGroupIcon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">{isLoading ? "..." : members.length + extraTotal}</p>
                <p className="text-xs mt-1"><span className="px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">+12%</span> <span className="text-gray-500">from last month</span></p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Active Farmers</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-50 text-yellow-600"><Motorbike02Icon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">{isLoading ? "..." : farmersCount}</p>
                <div className="mt-2 w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-yellow-500 rounded-full" style={{ width: members.length > 0 ? `${(farmersCount / members.length) * 100}%` : "0%" }} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Active Buyers</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-600"><Store04Icon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">{isLoading ? "..." : buyersCount}</p>
                <div className="mt-2 w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: members.length > 0 ? `${(buyersCount / members.length) * 100}%` : "0%" }} />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 min-w-[240px]">
                <FilterIcon size={18} className="text-gray-600" />
                <input type="text" placeholder="Search by name, ID, or phone..." className="bg-transparent outline-0 w-full text-sm" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-800 text-sm">All Roles</button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-800 text-sm">Status: All</button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-800 text-sm"><SortByDown02Icon size={18} /> Sort</button>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-12 gap-0 text-xs font-semibold text-gray-500 border-b px-4 py-3">
              <div className="col-span-3">Member</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-3">Location</div>
              <div className="col-span-3">Contact</div>
              <div className="col-span-1">Status</div>
            </div>

            {isLoading ? (
                <div className="p-10 text-center text-gray-500">Loading members...</div>
            ) : !allowed ? (
                <div className="p-10 text-center text-gray-500">You do not have permission to view this page.</div>
            ) : members.length === 0 ? (
                <div className="p-10 text-center text-gray-500">No members found for this cooperative.</div>
            ) : (
                members.map((m, idx) => {
                  const roleStyle = getRoleStyle(m.role || m.role_display);
                  const statusStyle = getStatusStyle(m.status);
                  const name = m.full_name || "Member";
                  const location = m.location || "No Location";

                  return (
                    <div key={idx} className="grid grid-cols-12 gap-0 items-center px-4 py-3 border-b last:border-none hover:bg-gray-50/50 transition-colors">
                      <div className="col-span-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={m.profile_pic_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(name)} 
                            alt={name} 
                            className="w-9 h-9 rounded-full object-cover border border-gray-100 shadow-sm"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{name}</p>
                            <p className="text-xs text-gray-500">ID: {m.member_id || `FI-2023-${m.id}`}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${roleStyle.color}`}>{roleStyle.label}</span>
                      </div>
                      <div className="col-span-3 text-sm text-gray-700 whitespace-pre-line truncate pr-4">{location}</div>
                      <div className="col-span-3 text-sm text-gray-700">
                        <div className="flex items-center gap-2 truncate"><span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> {m.email || "No Email"}</div>
                        <div className="flex items-center gap-2 mt-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> {m.phone || "No Phone"}</div>
                      </div>
                      <div className="col-span-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`w-2.5 h-2.5 rounded-full ${statusStyle.dot}`} />
                          <span className="text-gray-800 text-xs font-semibold">{statusStyle.label}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
            )}

            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600">
              <p>Showing {members.length} result{members.length !== 1 ? "s" : ""}</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-md border hover:bg-gray-50">‹</button>
                <button className="px-3 py-1 rounded-md bg-lime-600 text-white">1</button>
                <button className="px-3 py-1 rounded-md border hover:bg-gray-50">›</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Members;
