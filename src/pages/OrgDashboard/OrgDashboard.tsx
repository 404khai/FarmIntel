import React, { useEffect, useState } from "react";
import OrgDashboardNav from "../../components/OrgDashboardNav";
import { LuClock, LuTrendingUp, LuCircleCheck, LuRefreshCw, LuPlus, LuBookOpen } from "react-icons/lu";
import OrgSideNav from "../../components/OrgSideNav";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

const OrgDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const firstName = user?.firstname || user?.name?.split(" ")[0] || "Developer";

  const quota = { used: 85400, total: 100000, resetInDays: 12 };
  const successRate = { value: 99.9, delta: +0.1 };
  const latency = { valueMs: 45, deltaMs: -5 };
  const plan = { name: "Enterprise", status: "Active" };

  const volumeData = [
    { label: "14d", requests: 2200 },
    { label: "13d", requests: 3600 },
    { label: "12d", requests: 3000 },
    { label: "11d", requests: 4600 },
    { label: "10d", requests: 3400 },
    { label: "9d", requests: 5200 },
    { label: "8d", requests: 4200 },
    { label: "7d", requests: 4800 },
    { label: "6d", requests: 4300 },
    { label: "5d", requests: 5100 },
    { label: "4d", requests: 4500 },
    { label: "3d", requests: 5600 },
    { label: "2d", requests: 4900 },
    { label: "Today", requests: 6200 },
  ];

  const activities = [
    { status: "200 OK", method: "POST", endpoint: "/v1/crops/search", time: "2 mins ago" },
    { status: "200 OK", method: "GET", endpoint: "/v1/market/prices", time: "8 mins ago" },
    { status: "401", method: "POST", endpoint: "/v1/webhooks/register", time: "1 hr ago" },
    { status: "200 OK", method: "DELETE", endpoint: "/v1/keys/k_2", time: "3 hrs ago" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OrgSideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <OrgDashboardNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 md:ml-64 h-screen overflow-y-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Welcome back, AgriCorp Solutions</h1>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-gray-600">System Operational</span>
              </div>
            </div>
            <button className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 text-sm">Support</button>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">API Requests</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-700"><LuRefreshCw /></span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-gray-800">{quota.used.toLocaleString()} <span className="text-gray-500">/ {Math.round(quota.total/1000)}k</span></p>
                <div className="mt-2 h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-lime-500 rounded-full" style={{ width: `${(quota.used/quota.total)*100}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{Math.round((quota.used/quota.total)*100)}% of monthly quota used • Resets in {quota.resetInDays} days</p>
                <button className="mt-3 w-full px-3 py-2 text-sm rounded-md bg-gray-100 text-gray-800">View Usage Details</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Success Rate</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-700"><LuCircleCheck /></span>
              </div>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-2xl font-bold text-gray-800">{successRate.value}%</p>
                <span className="text-xs px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">↑ {successRate.delta}%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Last 30 days avg</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Avg Latency</p>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-700"><LuClock /></span>
              </div>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-2xl font-bold text-gray-800">{latency.valueMs}ms</p>
                <span className="text-xs px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">↓ {Math.abs(latency.deltaMs)}ms</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Global average</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-sm text-gray-600">Current Plan</p>
              <p className="mt-2 text-2xl font-bold text-gray-800">{plan.name}</p>
              <span className="mt-2 inline-block text-xs px-2 py-[2px] rounded-full bg-lime-600 text-white">{plan.status}</span>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 mt-6">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Request Volume</h3>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">Daily</button>
                  <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">Weekly</button>
                  <button className="px-2 py-1 text-xs bg-black text-white rounded-md">Today</button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="requests" radius={[8, 8, 0, 0]}>
                      {volumeData.map((d, idx) => (
                        <Cell key={`c-${idx}`} fill={idx === volumeData.length - 1 ? "#22c55e" : "rgba(163, 230, 53, 0.6)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                <button className="text-xs text-lime-600">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-gray-600 border-b">
                      <th className="py-2 px-3 text-left">Status</th>
                      <th className="py-2 px-3 text-left">Method</th>
                      <th className="py-2 px-3 text-left">Endpoint</th>
                      <th className="py-2 px-3 text-left">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {activities.map((r, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="py-2 px-3">
                          <span className={`inline-flex items-center gap-2 text-xs px-2 py-[2px] rounded-full ${r.status.startsWith("200") ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                            <span className={`w-2 h-2 rounded-full ${r.status.startsWith("200") ? "bg-emerald-500" : "bg-red-500"}`} />
                            {r.status}
                          </span>
                        </td>
                        <td className="py-2 px-3">{r.method}</td>
                        <td className="py-2 px-3">{r.endpoint}</td>
                        <td className="py-2 px-3 text-gray-500">{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-gray-50">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-100 text-blue-600"><LuPlus /></span>
                  <span className="text-sm font-medium text-gray-800">Generate New Key</span>
                </button>
                <a href="/OrgDashboard/Docs" className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-gray-50">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-violet-100 text-violet-600"><LuBookOpen /></span>
                  <span className="text-sm font-medium text-gray-800">Read Documentation</span>
                </a>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default OrgDashboard;
