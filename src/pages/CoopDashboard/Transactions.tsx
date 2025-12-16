import React, { useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import CoopSideNav from "../../components/CoopSideNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import { CreditCardPosIcon, HourglassIcon, Calendar02Icon, FilterIcon, Download02Icon } from "hugeicons-react";
import user1 from "../../assets/user1.jpeg";
import user2 from "../../assets/user2.jpeg";
import user3 from "../../assets/user3.jpeg";
import user4 from "../../assets/user4.jpeg";
import user5 from "../../assets/user5.jpeg";

const Transactions: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [cropFilter, setCropFilter] = useState("All");

  const rows = [
    { id: "#TRX-9928", farmer: { name: "John Doe", tag: "Member #442", avatar: user1 }, buyer: { name: "Whole Foods Co-op", tag: "Retailer", avatar: user2 }, crop: { name: "Organic Wheat", qty: "500 kg" }, amount: "$450.00", date: "Oct 24, 2023\n10:42 AM", status: { label: "Completed", color: "bg-emerald-100 text-emerald-700" } },
    { id: "#TRX-9929", farmer: { name: "Sarah Smith", tag: "Member #891", avatar: user3 }, buyer: { name: "Green Market", tag: "Wholesaler", avatar: user4 }, crop: { name: "Sweet Corn", qty: "1.2 Tons" }, amount: "$1,120.00", date: "Oct 23, 2023\n02:15 PM", status: { label: "Pending", color: "bg-yellow-100 text-yellow-700" } },
    { id: "#TRX-9930", farmer: { name: "Albert Liu", tag: "Member #102", avatar: user5 }, buyer: { name: "FreshDirect", tag: "Distributor", avatar: user1 }, crop: { name: "Soybeans", qty: "800 kg" }, amount: "$640.00", date: "Oct 23, 2023\n09:00 AM", status: { label: "Disputed", color: "bg-red-100 text-red-700" } },
    { id: "#TRX-9931", farmer: { name: "Maria Garcia", tag: "Member #350", avatar: user2 }, buyer: { name: "EcoFoods", tag: "Retailer", avatar: user3 }, crop: { name: "Barley", qty: "200 kg" }, amount: "$180.00", date: "Oct 22, 2023\n04:30 PM", status: { label: "Completed", color: "bg-emerald-100 text-emerald-700" } },
  ];

  const filtered = rows.filter((r) => (statusFilter === "All" || r.status.label === statusFilter) && (cropFilter === "All" || r.crop.name.includes(cropFilter)));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CoopSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} collapsed={isSidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)} onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)} />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
          <div className="flex items-center justify-between mb-4">
            <Breadcrumbs items={[{ label: "Dashboard", to: "/CoopDashboard" }, { label: "All Transactions" }]} />
            <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-lime-600 text-white text-sm"><Download02Icon size={18} /> Export Report</button>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">All Transactions</h1>
            <p className="text-gray-500 mt-1">Manage and audit all cooperative trade flows in real-time.</p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Total Transacted</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600"><CreditCardPosIcon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">$1,240,500</p>
                <p className="text-xs mt-1"><span className="px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">+12%</span></p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Volume Traded</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-lime-50 text-lime-600"><HourglassIcon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">450 Tons</p>
                <p className="text-xs mt-1"><span className="px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">+5%</span></p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Active Disputes</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-50 text-red-600">!</span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">2</p>
                <p className="text-xs mt-1"><span className="px-2 py-[2px] rounded-full bg-red-100 text-red-700">-10%</span></p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 min-w-[260px]">
                <FilterIcon size={18} className="text-gray-600" />
                <input type="text" placeholder="Search Transaction ID, Farmer, or Buyer..." className="bg-transparent outline-0 w-full text-sm" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border text-gray-800 text-sm"><Calendar02Icon size={18} /> Date Range</button>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-md bg-white border text-sm text-gray-800">
                <option>All</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Disputed</option>
              </select>
              <select value={cropFilter} onChange={(e) => setCropFilter(e.target.value)} className="px-3 py-2 rounded-md bg-white border text-sm text-gray-800">
                <option>All</option>
                <option>Wheat</option>
                <option>Corn</option>
                <option>Soybeans</option>
                <option>Barley</option>
              </select>
              <button className="px-3 py-2 rounded-md bg-lime-600 text-white text-sm">Apply</button>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-12 gap-0 text-xs font-semibold text-gray-500 border-b px-4 py-3">
              <div className="col-span-2">ID</div>
              <div className="col-span-2">Farmer</div>
              <div className="col-span-2">Buyer</div>
              <div className="col-span-3">Crop Detail</div>
              <div className="col-span-1">Amount</div>
              <div className="col-span-1">Date</div>
              <div className="col-span-1">Status</div>
            </div>

            {filtered.map((r, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-0 items-center px-4 py-3 border-b last:border-none">
                <div className="col-span-2 text-sm font-medium text-lime-700">{r.id}</div>
                <div className="col-span-2">
                  <div className="flex items-center gap-3">
                    <img src={r.farmer.avatar} alt={r.farmer.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{r.farmer.name}</p>
                      <p className="text-xs text-gray-500">{r.farmer.tag}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-3">
                    <img src={r.buyer.avatar} alt={r.buyer.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{r.buyer.name}</p>
                      <p className="text-xs text-gray-500">{r.buyer.tag}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <p className="text-sm font-medium text-gray-800">{r.crop.name}</p>
                  <p className="text-xs text-gray-500">{r.crop.qty}</p>
                </div>
                <div className="col-span-1 text-sm font-semibold text-gray-800">{r.amount}</div>
                <div className="col-span-1 text-sm text-gray-700 whitespace-pre-line">{r.date}</div>
                <div className="col-span-1">
                  <span className={`text-xs px-2 py-[2px] rounded-full ${r.status.color}`}>{r.status.label}</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600">
              <p>Showing 1 to 4 of 128 transactions</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-md border">‹</button>
                <button className="px-3 py-1 rounded-md bg-lime-600 text-white">1</button>
                <button className="px-3 py-1 rounded-md border">2</button>
                <button className="px-3 py-1 rounded-md border">3</button>
                <button className="px-3 py-1 rounded-md border">…</button>
                <button className="px-3 py-1 rounded-md border">32</button>
                <button className="px-3 py-1 rounded-md border">›</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
