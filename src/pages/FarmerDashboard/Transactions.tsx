import React, { useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import { CreditCardPosIcon, ChartBarLineIcon, Calendar02Icon, FilterIcon, PlusSignIcon, Download02Icon } from "hugeicons-react";

const Transactions: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

        <main className={`pt-16 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
          <div className="flex items-center justify-between mb-3">
            <Breadcrumbs items={[{ label: "Dashboard", to: "/FarmerDashboard" }, { label: "Transactions" }]} />
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-gray-800 text-sm"><Download02Icon size={18} /> Export CSV</button>
              <a href="/FarmerDashboard/Crops" className="flex items-center gap-2 px-3 py-2 rounded-md bg-lime-600 text-white text-sm"><PlusSignIcon size={18} /> New Listing</a>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Transactions History</h1>
            <p className="text-gray-500 mt-1">Manage your sales, track pending deliveries, and monitor payment statuses all in one place.</p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Total Revenue (This Month)</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-lime-50 text-lime-600"><CreditCardPosIcon size={16} /></span>
              </div>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">$12,450</p>
                <span className="text-xs px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">↑ 12%</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Active Orders</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-600"><ChartBarLineIcon size={16} /></span>
              </div>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">5</p>
                <span className="text-xs px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">+1</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Pending Confirmation</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-50 text-orange-600"><Calendar02Icon size={16} /></span>
              </div>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">2</p>
                <span className="text-xs px-2 py-[2px] rounded-full bg-yellow-100 text-yellow-700">Action needed</span>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 flex-1 min-w-[240px]">
                <FilterIcon size={18} className="text-gray-600" />
                <input type="text" placeholder="Search by buyer name, crop type, or Order ID..." className="bg-transparent outline-0 w-full text-sm" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-white text-gray-800 text-sm"><Calendar02Icon size={18} /> Last 30 Days</button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-white text-gray-800 text-sm">All Statuses</button>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-12 gap-0 text-xs font-semibold text-gray-500 border-b px-4 py-3">
              <div className="col-span-2">ID</div>
              <div className="col-span-3">Buyer / Cooperative</div>
              <div className="col-span-2">Crop Details</div>
              <div className="col-span-1">Quantity</div>
              <div className="col-span-2">Total Price</div>
              <div className="col-span-1">Date</div>
              <div className="col-span-1">Status</div>
            </div>

            {[
              { id: "#4821", buyer: "Whole Foods Market", tag: "Verified Buyer", crop: "Organic Corn", qty: "500 kg", price: "$1,200.00", date: "Oct 24, 2023", status: { label: "Pending Delivery", color: "bg-yellow-100 text-yellow-700" } },
              { id: "#4820", buyer: "Local Co-op Society", tag: "Partner", crop: "Wheat", qty: "2.0 Tons", price: "$450.00", date: "Oct 22, 2023", status: { label: "Completed", color: "bg-emerald-100 text-emerald-700" } },
              { id: "#4819", buyer: "Green Grocer Inc.", tag: "Retailer", crop: "Soybeans", qty: "100 kg", price: "$300.00", date: "Oct 20, 2023", status: { label: "Disputed", color: "bg-red-100 text-red-700" } },
              { id: "#4818", buyer: "Fresh Mart", tag: "Supermarket", crop: "Tomatoes", qty: "850 kg", price: "$1,850.00", date: "Oct 18, 2023", status: { label: "Completed", color: "bg-emerald-100 text-emerald-700" } },
            ].map((r, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-0 items-center px-4 py-3 border-b last:border-none">
                <div className="col-span-2 text-sm text-gray-700">{r.id}</div>
                <div className="col-span-3">
                  <p className="text-sm font-medium text-gray-800">{r.buyer}</p>
                  <p className="text-xs text-gray-500">{r.tag}</p>
                </div>
                <div className="col-span-2 text-sm text-gray-700">{r.crop}</div>
                <div className="col-span-1 text-sm text-gray-700">{r.qty}</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">{r.price}</div>
                <div className="col-span-1 text-sm text-gray-700">{r.date}</div>
                <div className="col-span-1">
                  <span className={`text-xs px-2 py-[2px] rounded-full ${r.status.color}`}>{r.status.label}</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600">
              <p>Showing 1 to 4 of 28 results</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-md border">‹</button>
                <button className="px-3 py-1 rounded-md bg-lime-600 text-white">1</button>
                <button className="px-3 py-1 rounded-md border">2</button>
                <button className="px-3 py-1 rounded-md border">3</button>
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
