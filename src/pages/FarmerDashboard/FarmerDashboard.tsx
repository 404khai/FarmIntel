import React, { useState, useEffect } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import {
  LuSprout,
  LuBot, 
  LuNetwork,
  LuTriangleAlert,
  LuChartBar,
  
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

const FarmerDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const firstName = user?.firstname || user?.name?.split(" ")[0] || "Farmer";

  // Hero stats data
  const heroStats = [
    {
      title: "Active Crops",
      value: "24",
      subtitle: "Currently monitored",
      icon: <LuSprout className="text-green-600 text-xl" />,
      tint: "bg-green-50",
    },
    {
      title: "Pest Alerts",
      value: "3",
      subtitle: "Immediate action needed",
      icon: <LuTriangleAlert className="text-red-600 text-xl" />,
      tint: "bg-red-50",
    },
    {
      title: "AI Recommendation",
      value: "Soil nutrients low",
      subtitle: "Apply organic fertilizer",
      icon: <LuBot className="text-purple-600 text-xl" />,
      tint: "bg-purple-50",
    },
    {
      title: "Predicted Yield",
      value: "5.6 tons/ha",
      subtitle: "↑ 12% from last season",
      icon: <LuChartBar className="text-yellow-600 text-xl" />,
      tint: "bg-yellow-50",
    },
    {
      title: "Farms Connected",
      value: "8",
      subtitle: "Data linked successfully",
      icon: <LuNetwork className="text-blue-600 text-xl" />,
      tint: "bg-blue-50",
    },
  ];

  // Mock Chart Data
  const trendingCrops = [
    { name: "Maize", quantity: 420 },
    { name: "Rice", quantity: 360 },
    { name: "Soybean", quantity: 280 },
    { name: "Cassava", quantity: 210 },
    { name: "Tomato", quantity: 190 },
  ];

  const yieldOverview = [
    { month: "Jan", current: 4.2, previous: 3.6 },
    { month: "Feb", current: 4.5, previous: 3.8 },
    { month: "Mar", current: 4.8, previous: 4.0 },
    { month: "Apr", current: 5.0, previous: 4.1 },
    { month: "May", current: 5.4, previous: 4.5 },
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

        <main className={`pt-16 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} h-screen overflow-y-auto`}>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome back, {firstName} 🌾
            </h1>
            <p className="text-gray-500 mt-1">
              Your AI-powered overview for smarter farming decisions.
            </p>
          </div>

          {/* 🧠 12-Column Responsive Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* HERO STATS */}
            <section className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {heroStats.map((stat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-[5px] rounded-lg shadow-sm ${stat.tint}`}>
                      {stat.icon}
                    </div>
                    <span className="text-lg font-semibold text-gray-800">
                      {stat.value}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">
                      {stat.title}
                    </p>
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* TRENDING CROPS (Bar Chart) */}
            <section className="col-span-12 lg:col-span-6 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                🌾 Trending Crops
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={trendingCrops}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantity" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </section>

            {/* SOIL HEALTH (Radial Progress Gauge) */}
            <section className="col-span-12 sm:col-span-6 lg:col-span-3 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                🌱 Soil Health
              </h2>
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-500"
                    strokeWidth="3"
                    strokeDasharray="87, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-green-600">
                  87%
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Healthy soil</p>
            </section>

            {/* MARKET PRICE SPARKLINE */}
            <section className="col-span-12 sm:col-span-6 lg:col-span-3 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                📈 Market Price (₦/ton)
              </h2>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart
                  data={[
                    { t: 1, price: 120 },
                    { t: 2, price: 132 },
                    { t: 3, price: 125 },
                    { t: 4, price: 138 },
                    { t: 5, price: 145 },
                  ]}
                >
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 mt-2">
                Maize price trend (past week)
              </p>
            </section>

            {/* WEATHER (Glassmorphic Panel) */}
            <section className="col-span-12 sm:col-span-6 lg:col-span-3 backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl shadow-sm p-5 flex flex-col justify-between">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                ☁️ Weather
              </h2>
              <div className="space-y-3">
                {weatherData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 flex items-center gap-1">
                      {item.icon} {item.label}
                    </span>
                    <span className="font-medium text-gray-800">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* YIELD OVERVIEW (Line Chart) */}
            <section className="col-span-12 lg:col-span-6 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                🌾 Yield Overview
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={yieldOverview}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#16a34a"
                    strokeWidth={2}
                    name="Current"
                  />
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="#a3a3a3"
                    strokeWidth={2}
                    name="Previous"
                  />
                </LineChart>
              </ResponsiveContainer>
            </section>

            {/* AI FEED */}
            <section className="col-span-12 lg:col-span-6 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                🤖 AI Recommendations
              </h2>
              <div className="space-y-3 overflow-y-auto max-h-64 pr-2">
                {aiFeed.map((tip, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow transition"
                  >
                    <h3 className="font-medium text-gray-800 text-sm">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">{tip.desc}</p>
                    <span className="text-[11px] text-gray-400 mt-1 block">
                      {tip.time}
                    </span>
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
