import React, { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import FarmerSideNav from "../components/FarmerSideNav";
import {
  LuCloudRain,
  LuSprout,
  LuThermometer,
  LuDroplets,
  LuChartBarStacked,
  LuTractor,
  LuLeaf,
  LuTriangleAlert,
} from "react-icons/lu";
import CoopSideNav from "../components/CoopSideNav";

const CoopDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const firstName = user?.firstname || user?.name?.split(" ")[0] || "Farmer";

  // 🌾 Example FarmIntel dashboard stats
  const stats = [
    {
      title: "Soil Health Index",
      value: "87%",
      icon: <LuLeaf className="text-green-600 text-2xl" />,
      subtitle: "Optimal condition",
      color: "bg-green-50",
    },
    {
      title: "Moisture Level",
      value: "62%",
      icon: <LuDroplets className="text-blue-600 text-2xl" />,
      subtitle: "Moderate hydration",
      color: "bg-blue-50",
    },
    {
      title: "Avg Temperature",
      value: "27°C",
      icon: <LuThermometer className="text-orange-600 text-2xl" />,
      subtitle: "Stable range",
      color: "bg-orange-50",
    },
    {
      title: "Predicted Yield",
      value: "5.4 tons/ha",
      icon: <LuChartBarStacked className="text-purple-600 text-2xl" />,
      subtitle: "AI forecast",
      color: "bg-purple-50",
    },
    {
      title: "Rainfall (Next 7 days)",
      value: "38mm",
      icon: <LuCloudRain className="text-cyan-600 text-2xl" />,
      subtitle: "Expected showers",
      color: "bg-cyan-50",
    },
    {
      title: "Active Machines",
      value: "6",
      icon: <LuTractor className="text-yellow-600 text-2xl" />,
      subtitle: "Operational",
      color: "bg-yellow-50",
    },
    {
      title: "Crops Under Watch",
      value: "12",
      icon: <LuSprout className="text-emerald-600 text-2xl" />,
      subtitle: "Growth stage",
      color: "bg-emerald-50",
    },
    {
      title: "Alerts",
      value: "2",
      icon: <LuTriangleAlert className="text-red-600 text-2xl" />,
      subtitle: "Irrigation needed",
      color: "bg-red-50",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CoopSideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-20 px-6 sm:px-8 pb-10 ml-60">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">
              Hi, {firstName} 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Here’s a smart overview of your farm’s performance.
            </p>
          </div>

          {/* 🌿 Responsive Widget Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col justify-between p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 ${stat.color}`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-white shadow-sm">
                    {stat.icon}
                  </div>
                  <span className="text-xl font-semibold text-gray-800">
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

          {/* You can later add ML charts, yield forecast graphs, etc. below */}
        </main>
      </div>
    </div>
  );
};

export default CoopDashboard;
