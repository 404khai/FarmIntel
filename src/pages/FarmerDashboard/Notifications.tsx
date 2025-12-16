import React, { useEffect, useMemo, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import { Search01Icon } from "hugeicons-react";
import { LuBug, LuTriangleAlert, LuLeaf, LuStore, LuCpu, LuClock } from "react-icons/lu";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "Pest Detection" | "Plant Disease" | "Market" | "System";
  actions?: { label: string; variant?: "primary" | "secondary" }[];
};

const Notifications: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const firstName = user?.firstname || user?.name?.split(" ")[0] || "Farmer";

  const today: NotificationItem[] = [
    {
      id: "n_1",
      title: "Fall Armyworm Detected - Plot B",
      description:
        "AI analysis confirms 85% probability of infestation. Immediate action is recommended to prevent spread.",
      time: "10 mins ago",
      type: "Pest Detection",
      actions: [
        { label: "Take Action", variant: "primary" },
        { label: "View Details", variant: "secondary" },
      ],
    },
    {
      id: "n_2",
      title: "Early Blight Risk Warning",
      description:
        "Humidity levels indicate high risk for tomato crops in the northern sector. Preventative fungicide application advised.",
      time: "2 hours ago",
      type: "Plant Disease",
      actions: [{ label: "See Recommendations", variant: "secondary" }],
    },
    {
      id: "n_3",
      title: "New Buyer Interest: Maize",
      description:
        "Co-op Buyer #402 is requesting 500kg of Maize. Offer price is 15% above market average.",
      time: "4 hours ago",
      type: "Market",
      actions: [{ label: "View Offer", variant: "primary" }],
    },
  ];

  const yesterday: NotificationItem[] = [
    {
      id: "n_4",
      title: "System Maintenance Scheduled",
      description:
        "The FarminTel platform will undergo scheduled maintenance on Saturday from 2:00 AM to 4:00 AM.",
      time: "Yesterday, 9:00 AM",
      type: "System",
    },
    {
      id: "n_5",
      title: "Message from Cooperative Admin",
      description:
        "Reminder: The monthly general meeting is scheduled for next Tuesday at the Community Center.",
      time: "Yesterday, 11:30 AM",
      type: "System",
      actions: [{ label: "Reply", variant: "secondary" }],
    },
    {
      id: "n_6",
      title: "Market Trend Update",
      description:
        "Soybean prices have increased by 5% in the local region over the last 48 hours.",
      time: "Yesterday, 8:15 AM",
      type: "Market",
    },
  ];

  const allItems = useMemo(() => [...today, ...yesterday], [today, yesterday]);

  const filtered = useMemo(() => {
    return allItems.filter((n) => {
      const matchTab = activeTab === "All" ? true : n.type === activeTab;
      const matchQuery = query
        ? (n.title + " " + n.description).toLowerCase().includes(query.toLowerCase())
        : true;
      return matchTab && matchQuery;
    });
  }, [allItems, activeTab, query]);

  const iconFor = (type: NotificationItem["type"]) => {
    if (type === "Pest Detection") return <LuBug className="text-red-600 text-2xl" />;
    if (type === "Plant Disease") return <LuLeaf className="text-yellow-600 text-2xl" />;
    if (type === "Market") return <LuStore className="text-emerald-600 text-2xl" />;
    return <LuCpu className="text-blue-600 text-2xl" />;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <FarmerSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} collapsed={isSidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)} onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)} />

        <main className={`pt-16 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Notifications</h1>
            <button className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-md">Mark all as read</button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <button className={`px-3 py-1 rounded-full ${activeTab === "All" ? "bg-lime-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setActiveTab("All")}>All</button>
            <button className={`px-3 py-1 rounded-full ${activeTab === "Pest Detection" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setActiveTab("Pest Detection")}>Pest Detection</button>
            <button className={`px-3 py-1 rounded-full ${activeTab === "Plant Disease" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setActiveTab("Plant Disease")}>Plant Disease</button>
            <button className={`px-3 py-1 rounded-full ${activeTab === "Market" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setActiveTab("Market")}>Market</button>
            <button className={`px-3 py-1 rounded-full ${activeTab === "System" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setActiveTab("System")}>System</button>
            <div className="ml-auto flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <Search01Icon size={18} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} className="bg-transparent outline-0 w-56 text-sm" placeholder="Search alerts" />
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-sm font-semibold text-gray-500 mb-3">Today</h2>
              <div className="space-y-4">
                {today
                  .filter((t) => filtered.some((f) => f.id === t.id))
                  .map((n) => (
                    <div key={n.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-gray-50">{iconFor(n.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-800">{n.title}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <LuClock />
                            <span>{n.time}</span>
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{n.description}</p>
                        {n.actions && (
                          <div className="mt-3 flex items-center gap-2">
                            {n.actions.map((a) => (
                              <button key={a.label} className={`text-sm px-3 py-1 rounded-md ${a.variant === "primary" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"}`}>{a.label}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold text-gray-500 mb-3">Yesterday</h2>
              <div className="space-y-4">
                {yesterday
                  .filter((t) => filtered.some((f) => f.id === t.id))
                  .map((n) => (
                    <div key={n.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-gray-50">{iconFor(n.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-800">{n.title}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <LuClock />
                            <span>{n.time}</span>
                            <span className="inline-block w-2 h-2 rounded-full bg-gray-300" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{n.description}</p>
                        {n.actions && (
                          <div className="mt-3 flex items-center gap-2">
                            {n.actions.map((a) => (
                              <button key={a.label} className={`text-sm px-3 py-1 rounded-md ${a.variant === "primary" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"}`}>{a.label}</button>
                            ))}
                          </div>
                        )}
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

export default Notifications;
