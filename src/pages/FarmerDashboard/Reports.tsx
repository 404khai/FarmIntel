import React, { useEffect, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type User = { firstname?: string; name?: string } | null;

const Reports: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<User>(null);

  const [period, setPeriod] = useState("This Month");
  const [cropFilter, setCropFilter] = useState("All Crops");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const firstName = user?.firstname || user?.name?.split(" ")[0] || "Farmer";

  const monthlySales = [
    { month: "Jan", sales: 2.1 },
    { month: "Feb", sales: 2.6 },
    { month: "Mar", sales: 2.2 },
    { month: "Apr", sales: 3.4 },
    { month: "May", sales: 4.1 },
    { month: "Jun", sales: 3.3 },
  ];

  const reportRows = [
    { name: "May 2024 Sales Summary", date: "May 31, 2024", type: "Financial", status: "Ready" },
    { name: "Pest Incidents – Sector 1", date: "May 29, 2024", type: "Agronomy", status: "Ready" },
    { name: "Yield Forecast Update", date: "May 25, 2024", type: "Forecast", status: "Processing" },
    { name: "Moisture Sensor Export", date: "May 20, 2024", type: "Sensors", status: "Ready" },
    { name: "Market Demand Summary", date: "May 15, 2024", type: "Market", status: "Ready" },
    { name: "Corn Field Inspection", date: "May 10, 2024", type: "Operations", status: "Resolved" },
  ];

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
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Reports Dashboard</h1>
              <p className="text-gray-500 mt-1">Track your cooperative’s performance, pests, and yields.</p>
            </div>
            <div className="flex items-center gap-3">
              <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>Year to Date</option>
              </select>
              <select value={cropFilter} onChange={(e) => setCropFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm">
                <option>All Crops</option>
                <option>Maize</option>
                <option>Wheat</option>
                <option>Soybean</option>
                <option>Rice</option>
                <option>Tomato</option>
              </select>
              <button className="px-4 py-2 rounded-lg bg-lime-600 text-white">Export</button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Total Sales", value: "$24,500", sub: "from last month", trend: "+12.5%", tint: "bg-green-50" },
                { title: "Active Pests", value: "3 Areas", sub: "+1 New detection", trend: "Action", tint: "bg-red-50" },
                { title: "Projected Yield", value: "450 Tons", sub: "vs forecast", trend: "+5%", tint: "bg-blue-50" },
                { title: "Market Match", value: "92%", sub: "demand", trend: "High", tint: "bg-purple-50" },
                { title: "Team", value: firstName, sub: "Lead", trend: "Online", tint: "bg-gray-50" },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl shadow-sm bg-white">
                  <p className="text-sm text-gray-600">{c.title}</p>
                  <div className="mt-1 flex items-end justify-between">
                    <p className="text-2xl font-semibold text-gray-800">{c.value}</p>
                    <span className="text-xs px-2 py-[2px] rounded-full bg-gray-100 text-gray-700">{c.trend}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{c.sub}</p>
                </div>
              ))}
            </section>

            <section className="col-span-12 lg:col-span-8 bg-white p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">Monthly Sales Overview</h2>
                <button className="text-xs text-lime-600">View Report</button>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#16a34a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </section>

            <section className="col-span-12 lg:col-span-4 bg-white p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Pest Incidents</h3>
                <span className="text-xs px-2 py-[2px] rounded-full bg-red-100 text-red-700">3 Active</span>
              </div>
              <div className="mt-3 space-y-3">
                <div className="p-4 rounded-xl bg-red-50">
                  <p className="text-sm font-semibold text-red-700">Fall Armyworm</p>
                  <p className="text-xs text-red-600">Detected in Sector 4 (Corn Field)</p>
                  <p className="text-xs text-red-600 mt-1">Action: Spray scheduled for tomorrow.</p>
                </div>
                <div className="p-4 rounded-xl bg-orange-50">
                  <p className="text-sm font-semibold text-orange-700">Rust Fungus</p>
                  <p className="text-xs text-orange-600">Detected in Sector 2 (Wheat)</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <p className="text-sm font-semibold text-gray-700">Aphids</p>
                  <p className="text-xs text-gray-600">Cleared from Greenhouse A</p>
                </div>
              </div>
            </section>

            <section className="col-span-12 bg-white p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Generated Reports History</h2>
                <button className="text-xs text-lime-600">View All</button>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-gray-600 border-b">
                      <th className="py-3 px-4 text-left">Report Name</th>
                      <th className="py-3 px-4 text-left">Date Generated</th>
                      <th className="py-3 px-4 text-left">Type</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {reportRows.map((r, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800">{r.name}</td>
                        <td className="py-3 px-4 text-gray-700">{r.date}</td>
                        <td className="py-3 px-4 text-gray-700">{r.type}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-[2px] rounded-full ${r.status === "Ready" ? "bg-green-100 text-green-700" : r.status === "Processing" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}`}>{r.status}</span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-xs px-3 py-1 rounded-md bg-gray-100 text-gray-800">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;

