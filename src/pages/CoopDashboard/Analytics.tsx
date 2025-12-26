import React, { useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import CoopSideNav from "../../components/CoopSideNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Calendar02Icon, Download02Icon, UserGroupIcon, CreditCardPosIcon, Agreement02Icon } from "hugeicons-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const Analytics: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const registrationData = [
    { day: "Mon", value: 24 },
    { day: "Tue", value: 48 },
    { day: "Wed", value: 36 },
    { day: "Thu", value: 82 },
    { day: "Fri", value: 40 },
    { day: "Sat", value: 28 },
    { day: "Sun", value: 32 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CoopSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} collapsed={isSidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)} onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)} />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
          <div className="flex items-center justify-between mb-4">
            <Breadcrumbs items={[{ label: "Dashboard", to: "/CoopDashboard" }, { label: "Analytics" }]} />
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border text-gray-800 text-sm"><Calendar02Icon size={18} /> Oct 24, 2023 - Oct 31, 2023</button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-lime-600 text-white text-sm"><Download02Icon size={18} /> Export Report</button>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back, Admin. Here’s what’s happening today.</p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Total Active Members</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-lime-50 text-lime-600"><UserGroupIcon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">1,245</p>
                <p className="text-xs mt-1"><span className="px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">+12%</span> <span className="text-gray-500">from last month</span></p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Total Revenue</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600"><CreditCardPosIcon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">$524,890</p>
                <p className="text-xs mt-1"><span className="px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">+5%</span></p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Pending Matches</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-50 text-orange-600"><Agreement02Icon size={16} /></span>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-800">34</p>
                <p className="text-xs mt-1"><span className="px-2 py-[2px] rounded-full bg-red-100 text-red-700">-2%</span></p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">Member Registration Trends</h3>
                <div className="flex items-center gap-2 text-xs">
                  <button className="px-2 py-1 rounded bg-gray-100">Daily</button>
                  <button className="px-2 py-1 rounded bg-black text-white">Weekly</button>
                  <button className="px-2 py-1 rounded bg-gray-100">Monthly</button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={registrationData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#16a34a" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-800">Top Producing Regions</h3>
              <div className="mt-3 h-40 rounded-xl bg-gray-100" />
              <div className="mt-4 space-y-3">
                {[
                  { label: "Central Valley", pct: 45 },
                  { label: "Salinas Valley", pct: 30 },
                  { label: "Other Regions", pct: 25 },
                ].map((r, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span>{r.label}</span>
                      <span>{r.pct}%</span>
                    </div>
                    <div className="mt-1 w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-lime-600 rounded-full" style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
              <div className="flex items-center gap-2">
                <input placeholder="Search transactions..." className="bg-gray-100 rounded-md px-3 py-2 text-sm" />
                <button className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 text-sm">Filter</button>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-0 text-xs font-semibold text-gray-500 border-t border-b px-4 py-3">
              <div className="col-span-3">Transaction ID</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Farmer</div>
              <div className="col-span-2">Buyer</div>
              <div className="col-span-1">Crop</div>
              <div className="col-span-1">Volume</div>
              <div className="col-span-1">Monetary Gain</div>
            </div>
            {[
              { id: "#TRX-8932", date: "Oct 24, 2023", farmer: "John Doe Farms", buyer: "Organic Co-op Ltd.", crop: "Wheat", volume: "500 kg", gain: "+$1,250.00" },
              { id: "#TRX-8929", date: "Oct 23, 2023", farmer: "Green Acres", buyer: "FreshFoods", crop: "Corn", volume: "200 kg", gain: "+$560.00" },
            ].map((t, i) => (
              <div key={i} className="grid grid-cols-12 gap-0 text-sm text-gray-700 px-4 py-3 border-b last:border-none">
                <div className="col-span-3 font-medium text-gray-800">{t.id}</div>
                <div className="col-span-2">{t.date}</div>
                <div className="col-span-2">{t.farmer}</div>
                <div className="col-span-2">{t.buyer}</div>
                <div className="col-span-1"><span className="px-2 py-[2px] rounded-full bg-yellow-100 text-yellow-700 text-xs">{t.crop}</span></div>
                <div className="col-span-1">{t.volume}</div>
                <div className="col-span-1 text-emerald-700">{t.gain}</div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Analytics;