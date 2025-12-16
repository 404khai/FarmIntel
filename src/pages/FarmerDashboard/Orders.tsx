import React, { useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import { Calendar02Icon, CreditCardPosIcon, ChartBarLineIcon, FilterIcon, Download02Icon } from "hugeicons-react";
import { LuCheck, LuX } from "react-icons/lu";

const Orders: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "fulfilled">("all");

  const rows = [
    { buyer: "Whole Foods Market", location: "Austin, TX", crop: "Organic Tomatoes", variant: "Roma Variety • 500 kg", id: "#ORD-2491", date: "Oct 12, 2023", total: "$1,250.00", status: { label: "Pending", color: "bg-yellow-100 text-yellow-700", key: "pending" } },
    { buyer: "Local Bistro", location: "Downtown", crop: "Fresh Basil", variant: "Genovese • 50 kg", id: "#ORD-2488", date: "Oct 11, 2023", total: "$450.00", status: { label: "Accepted", color: "bg-emerald-100 text-emerald-700", key: "accepted" } },
    { buyer: "Green Market Co-op", location: "Springfield", crop: "Sweet Corn", variant: "Yellow • 1200 ears", id: "#ORD-2485", date: "Oct 10, 2023", total: "$600.00", status: { label: "Pending", color: "bg-yellow-100 text-yellow-700", key: "pending" } },
    { buyer: "Mark’s Diner", location: "Uptown", crop: "Potatoes", variant: "Russet • 200 kg", id: "#ORD-2470", date: "Oct 08, 2023", total: "$320.00", status: { label: "Fulfilled", color: "bg-gray-100 text-gray-700", key: "fulfilled" } },
    { buyer: "The Table Restaurant", location: "Westside", crop: "Kale", variant: "Lacinato • 20 bunches", id: "#ORD-2465", date: "Oct 05, 2023", total: "$80.00", status: { label: "Rejected", color: "bg-red-100 text-red-700", key: "rejected" } },
  ];

  const filtered = rows.filter(r => filter === "all" ? true : r.status.key === filter);

  return (
    <div className="flex min-h-screen bg-white">
      <FarmerSideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        collapsed={isSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col">
        <DashboardNav
          onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)}
        />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">Incoming Orders</h1>
              <p className="text-gray-500 mt-1">Manage your sales, approve requests, and track deliveries.</p>
            </div>
            <button className="px-4 py-2 rounded-md bg-lime-600 text-white text-sm flex items-center gap-2"><Download02Icon size={18} /> Export Report</button>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Pending</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-50 text-orange-600"><Calendar02Icon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">12</p>
                <p className="text-xs mt-1"><span className="px-2 py-[2px] rounded-full bg-red-100 text-red-700">+2</span> <span className="text-gray-500">requests today</span></p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Earnings (Oct)</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600"><CreditCardPosIcon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">$4,250</p>
                <p className="text-xs mt-1"><span className="px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">+15%</span> <span className="text-gray-500">vs last month</span></p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Deliveries</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-600"><ChartBarLineIcon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">5</p>
                <p className="text-xs mt-1 text-gray-500">Upcoming in 2 days</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 min-w-[240px]">
                <FilterIcon size={18} className="text-gray-600" />
                <input type="text" placeholder="Search by buyer name, order ID, or crop..." className="bg-transparent outline-0 w-full text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setFilter("all")} className={`px-3 py-2 rounded-full text-sm ${filter === "all" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>All Orders</button>
                <button onClick={() => setFilter("pending")} className={`px-3 py-2 rounded-full text-sm ${filter === "pending" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>Pending</button>
                <button onClick={() => setFilter("accepted")} className={`px-3 py-2 rounded-full text-sm ${filter === "accepted" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>Accepted</button>
                <button onClick={() => setFilter("fulfilled")} className={`px-3 py-2 rounded-full text-sm ${filter === "fulfilled" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>Fulfilled</button>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-12 gap-0 text-xs font-semibold text-gray-500 border-b px-4 py-3">
              <div className="col-span-3">Buyer</div>
              <div className="col-span-3">Crop Details</div>
              <div className="col-span-2">Order ID & Date</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Actions</div>
            </div>

            {filtered.map((r, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-0 items-center px-4 py-3 border-b last:border-none">
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{r.buyer}</p>
                      <p className="text-xs text-gray-500">{r.location}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <p className="text-sm font-medium text-gray-800">{r.crop}</p>
                  <p className="text-xs text-gray-500">{r.variant}</p>
                </div>
                <div className="col-span-2 text-sm text-gray-700">
                  <p className="font-medium">{r.id}</p>
                  <p className="text-xs text-gray-500">{r.date}</p>
                </div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">{r.total}</div>
                <div className="col-span-1">
                  <span className={`text-xs px-2 py-[2px] rounded-full ${r.status.color}`}>{r.status.label}</span>
                </div>
                <div className="col-span-1 flex items-center gap-2 justify-end">
                  {r.status.label === "Pending" && (
                    <>
                      <button className="w-8 h-8 rounded-md bg-red-100 text-red-700 flex items-center justify-center"><LuX size={16} /></button>
                      <button className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm flex items-center gap-2"><LuCheck size={16} /> Accept</button>
                    </>
                  )}
                  {r.status.label === "Accepted" && (
                    <button className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 text-sm">Mark as Fulfilled</button>
                  )}
                  {r.status.label !== "Pending" && r.status.label !== "Accepted" && (
                    <button className="text-sm text-lime-700">View Details</button>
                  )}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600">
              <p>Showing 1-5 of 24 orders</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-md border">Prev</button>
                <button className="px-3 py-1 rounded-md border">Next</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Orders;
