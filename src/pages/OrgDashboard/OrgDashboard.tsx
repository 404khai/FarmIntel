import React, { useEffect, useState } from "react";
import OrgDashboardNav from "../../components/OrgDashboardNav";
import { LuClock, LuTrendingUp, LuCircleCheck, LuBadgePercent } from "react-icons/lu";
import OrgSideNav from "../../components/OrgSideNav";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const OrgDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const firstName = user?.firstname || user?.name?.split(" ")[0] || "Developer";

  const kpis = [
    {
      title: "API Requests",
      value: "124,580",
      icon: <LuTrendingUp className="text-indigo-600 text-2xl" />,
      subtitle: "Past 30 days",
      color: "bg-indigo-50",
    },
    {
      title: "Success Rate",
      value: "99.2%",
      icon: <LuCircleCheck className="text-emerald-600 text-2xl" />,
      subtitle: "2,430 errors",
      color: "bg-emerald-50",
    },
    {
      title: "Avg Latency",
      value: "184 ms",
      icon: <LuClock className="text-orange-600 text-2xl" />,
      subtitle: "P95: 420 ms",
      color: "bg-orange-50",
    },
    {
      title: "Current Plan",
      value: "Pro",
      icon: <LuBadgePercent className="text-purple-600 text-2xl" />,
      subtitle: "Renews Jan 28",
      color: "bg-purple-50",
    },
  ];

  const volumeData = [
    { day: "Mon", requests: 4200 },
    { day: "Tue", requests: 5100 },
    { day: "Wed", requests: 4800 },
    { day: "Thu", requests: 5300 },
    { day: "Fri", requests: 6100 },
    { day: "Sat", requests: 3500 },
    { day: "Sun", requests: 2900 },
  ];

  const activities = [
    { id: "evt_8f21", action: "Key created", detail: "Read-only key for staging", time: "2h ago" },
    { id: "evt_8f22", action: "Plan upgraded", detail: "Pro → Business", time: "1d ago" },
    { id: "evt_8f23", action: "Webhook delivered", detail: "/v1/events: 245ms", time: "2d ago" },
    { id: "evt_8f24", action: "Docs viewed", detail: "Authentication & rate limits", time: "3d ago" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OrgSideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <OrgDashboardNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-16 px-4 sm:px-6 md:px-8 pb-10 ml-0 md:ml-64 h-screen overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">Hi, {firstName} 👋</h1>
            <p className="text-gray-500 mt-1">Your API and organization overview.</p>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((k, i) => (
              <div key={i} className={`flex flex-col justify-between p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 bg-white`}>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl shadow-sm ${k.color}`}>{k.icon}</div>
                  <span className="text-xl font-semibold text-gray-800">{k.value}</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">{k.title}</p>
                  <p className="text-xs text-gray-500">{k.subtitle}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Request Volume</h3>
                <div className="text-xs text-gray-500">Last 7 days</div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="requests" fill="#84cc16" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                  <button className="text-xs text-lime-600">View all</button>
                </div>
                <div className="divide-y">
                {activities.map((a) => (
                    <div key={a.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{a.action}</p>
                        <p className="text-xs text-gray-500">{a.detail}</p>
                      </div>
                      <span className="text-xs text-gray-400">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-3 py-2 text-sm bg-lime-600 text-white rounded-md">Create API Key</button>
                  <button className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md">View Documentation</button>
                  <button className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md">Manage Webhooks</button>
                  <button className="px-3 py-2 text-sm bg-black text-white rounded-md">Upgrade Plan</button>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default OrgDashboard;
