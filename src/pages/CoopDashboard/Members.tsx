import React, { useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import CoopSideNav from "../../components/CoopSideNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import { UserGroupIcon, Motorbike02Icon, Store04Icon, FilterIcon, Calendar02Icon, SortByDown02Icon, PlusSignIcon } from "hugeicons-react";

const Members: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const rows = [
    { name: "John Doe", id: "FI-2023-891", role: { label: "Farmer", color: "bg-emerald-100 text-emerald-700" }, location: "Springfield, IL\nNorth Branch", email: "john.doe@farm.com", phone: "+1 (555) 123-4567", status: { label: "Active", dot: "bg-emerald-500" } },
    { name: "Sarah Connor", id: "FI-2023-102", role: { label: "Buyer", color: "bg-blue-100 text-blue-700" }, location: "Chicago, IL\nUrban Market Co-op", email: "sarah.c@freshmarket.com", phone: "+1 (555) 987-6543", status: { label: "Active", dot: "bg-emerald-500" } },
    { name: "Mike Ross", id: "FI-2023-334", role: { label: "Farmer", color: "bg-emerald-100 text-emerald-700" }, location: "Decatur, IL\nSouth Fields", email: "mike.ross@agri.net", phone: "+1 (555) 444-2222", status: { label: "Pending", dot: "bg-yellow-500" } },
    { name: "Jessica Pearson", id: "FI-2023-112", role: { label: "Buyer", color: "bg-blue-100 text-blue-700" }, location: "Peoria, IL\nPeason Whole Foods", email: "jp@pearson.com", phone: "+1 (555) 777-9999", status: { label: "Deactivated", dot: "bg-gray-400" } },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CoopSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} collapsed={isSidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)} onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)} />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
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
                <p className="text-3xl font-bold text-gray-800">1,240</p>
                <p className="text-xs mt-1"><span className="px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">+12%</span> <span className="text-gray-500">from last month</span></p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Active Farmers</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-50 text-yellow-600"><Motorbike02Icon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">850</p>
                <div className="mt-2 w-full h-2 bg-gray-200 rounded-full"><div className="h-2 bg-yellow-500 rounded-full" style={{ width: "70%" }} /></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Active Buyers</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-600"><Store04Icon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">390</p>
                <div className="mt-2 w-full h-2 bg-gray-200 rounded-full"><div className="h-2 bg-blue-500 rounded-full" style={{ width: "40%" }} /></div>
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
            {rows.map((r, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-0 items-center px-4 py-3 border-b last:border-none">
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{r.name}</p>
                      <p className="text-xs text-gray-500">ID: {r.id}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={`text-xs px-2 py-[2px] rounded-full ${r.role.color}`}>{r.role.label}</span>
                </div>
                <div className="col-span-3 text-sm text-gray-700 whitespace-pre-line">{r.location}</div>
                <div className="col-span-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-gray-100" /> {r.email}</div>
                  <div className="flex items-center gap-2 mt-1"><span className="w-4 h-4 rounded bg-gray-100" /> {r.phone}</div>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`w-2.5 h-2.5 rounded-full ${r.status.dot}`} />
                    <span className="text-gray-800">{r.status.label}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600">
              <p>Showing 1 to 4 of 1,240 results</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-md border">‹</button>
                <button className="px-3 py-1 rounded-md bg-lime-600 text-white">1</button>
                <button className="px-3 py-1 rounded-md border">2</button>
                <button className="px-3 py-1 rounded-md border">3</button>
                <button className="px-3 py-1 rounded-md border">…</button>
                <button className="px-3 py-1 rounded-md border">10</button>
                <button className="px-3 py-1 rounded-md border">›</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Members;
