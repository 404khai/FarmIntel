import React, { useState, useEffect } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import {
  LuSprout,
  LuBot, 
  LuNetwork,
  LuTriangleAlert,
  LuChartBar,
  LuThermometer,
  LuDroplets,
  LuCloudRain,
} from "react-icons/lu";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
} from "recharts";
import user1 from "../../assets/user1.jpeg";
import user2 from "../../assets/user2.jpeg";

const FarmerDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  type User = { firstname?: string; name?: string } | null;
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const firstName = user?.firstname || user?.name?.split(" ")[0] || "Farmer";

  const heroStats = [
    { title: "Alerts", value: "5", subtitle: "3 pests, 2 diseases", icon: <LuTriangleAlert className="text-red-600 text-xl" />, tint: "bg-red-50" },
    { title: "Soil Moisture", value: "62%", subtitle: "Sector 1 & 2", icon: <LuDroplets className="text-blue-600 text-xl" />, tint: "bg-blue-50" },
    { title: "Temperature", value: "24°C", subtitle: "Max 28°C today", icon: <LuThermometer className="text-orange-600 text-xl" />, tint: "bg-orange-50" },
    { title: "Expected Rainfall", value: "18mm", subtitle: "Heavy rain exp.", icon: <LuCloudRain className="text-cyan-600 text-xl" />, tint: "bg-cyan-50" },
    { title: "Est. Revenue", value: "$12.5k", subtitle: "This month", icon: <LuChartBar className="text-green-600 text-xl" />, tint: "bg-green-50" },
  ];

  const salesData = [
    { month: "Jan", value: 2.4 },
    { month: "Feb", value: 3.1 },
    { month: "Mar", value: 2.2 },
    { month: "Apr", value: 3.9 },
    { month: "May", value: 3.4 },
  ];

  const aiFeed = [
    {
      title: "Soil Moisture Alert",
      desc: "Moisture dropping in Zone 3 — consider irrigation.",
      time: "2h ago",
    },
    {
      title: "Fertilizer Suggestion",
      desc: "Nitrogen deficiency detected. Use urea mix 2kg/ha.",
      time: "6h ago",
    },
    {
      title: "Weather Advisory",
      desc: "Rain expected tomorrow. Avoid pesticide spraying.",
      time: "1d ago",
    },
    {
      title: "Yield Boost Tip",
      desc: "Increase spacing between rows to 25cm for maize.",
      time: "2d ago",
    },
    {
      title: "Market Insight",
      desc: "Cassava prices expected to rise 8% next week.",
      time: "3d ago",
    },
  ];

  const weatherData = [
    { label: "Rainfall", value: "32mm", icon: "🌦" },
    { label: "Humidity", value: "64%", icon: "💧" },
    { label: "Temperature", value: "28°C", icon: "🌞" },
    { label: "Sunshine", value: "7.2h", icon: "☀️" },
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

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} h-screen overflow-y-auto`}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">Good Morning, {firstName}</h1>
              <p className="text-gray-500 mt-1">Here’s what’s happening on your farm today.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800">Export Report</button>
              <button className="px-4 py-2 rounded-lg bg-lime-600 text-white">Log Harvest</button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {heroStats.map((s, i) => (
                <div key={i} className="p-5 rounded-2xl shadow-sm bg-white">
                  <div className="flex items-center justify-between">
                    <div className={`p-[6px] rounded-lg ${s.tint}`}>{s.icon}</div>
                    <span className="text-xl font-semibold text-gray-800">{s.value}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-gray-700">{s.title}</p>
                  <p className="text-xs text-gray-500">{s.subtitle}</p>
                </div>
              ))}
            </section>

            <section className="col-span-12 lg:col-span-8 bg-white p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">Monthly Sales Overview</h2>
                <div className="text-sm text-gray-500">Last 5 months</div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 right-6 z-10 px-3 py-1 bg-lime-600 text-white rounded-full text-sm">$8.9k</div>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="col-span-12 lg:col-span-4 bg-white p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">3 New</span>
              </div>
              <div className="mt-3 space-y-4">
                <div className="flex items-start gap-3">
                  <img src={user2} alt="Sarah" className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Sarah Wilson</p>
                    <p className="text-xs text-gray-500">10 mins ago</p>
                    <p className="text-sm text-gray-600 mt-1">Hi John, is the sweet corn shipment ready for pickup tomorrow morning?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <img src={user1} alt="David" className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">David Green</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                    <p className="text-sm text-gray-600 mt-1">We accepted your offer for 200 tons of Wheat. Can we discuss logistics?</p>
                  </div>
                </div>
                <button className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm">View All Conversations</button>
              </div>
            </section>

            <section className="col-span-12 sm:col-span-6 lg:col-span-3 bg-green-50 p-5 rounded-2xl">
              <h3 className="text-sm font-semibold text-gray-800">Weather</h3>
              <p className="text-xs text-gray-600 mt-1">Rain expected in 2 hours. Cover sensitive seedlings in Sector 2.</p>
              <div className="mt-3 text-2xl font-semibold text-gray-800">24°C</div>
            </section>

            <section className="col-span-12 sm:col-span-6 lg:col-span-5 bg-white p-5 rounded-2xl shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800">AI Smart Insight</h3>
              <p className="mt-2 text-green-700 font-semibold">High Nitrogen Deficiency Risk</p>
              <p className="text-sm text-gray-600 mt-1">Analysis of Sector 3 soil sensors indicates low nitrogen levels. Yield could drop by 15%.</p>
            </section>

            <section className="col-span-12 lg:col-span-4 bg-white p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Alert Detection</h3>
                <button className="text-xs text-lime-600">View Reports</button>
              </div>
              <div className="mt-3 p-4 rounded-xl bg-red-50 text-red-700">
                <p className="font-semibold">Fall Armyworm</p>
                <p className="text-xs">Detected in Corn Fields (Sec 1). 3 reports nearby.</p>
                <span className="inline-block mt-2 text-xs px-2 py-[2px] rounded-full bg-red-100">Critical</span>
              </div>
            </section>

            <section className="col-span-12 bg-white p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Market Demand</h2>
                <button className="text-xs text-lime-600">View All</button>
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { item: "Sweet Corn", price: "$450/ton", status: "Negotiate" },
                  { item: "Wheat", price: "$390/ton", status: "Open" },
                  { item: "Soybean", price: "$520/ton", status: "Match" },
                  { item: "Rice", price: "$480/ton", status: "Open" },
                ].map((m, idx) => (
                  <div key={idx} className="border rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-800">{m.item}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-gray-700">{m.price}</span>
                      <span className={`text-xs px-2 py-[2px] rounded-full ${m.status === "Negotiate" ? "bg-yellow-100 text-yellow-700" : m.status === "Match" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>{m.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
