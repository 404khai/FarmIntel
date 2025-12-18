import React, { useEffect, useMemo, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import tomato from "../../assets/tomato.jpeg";
import corn from "../../assets/corn.jpeg";
import { Search01Icon, SmartPhone02Icon, MoreVerticalIcon } from "hugeicons-react";
import { LuPhone, LuVideo } from "react-icons/lu";

type ChatPreview = {
  id: number;
  name: string;
  avatar?: string | null;
  preview: string;
  time: string;
  unread?: boolean;
  tag?: "Farmers" | "Buyers" | "All";
};

type MessageItem = {
  id: number;
  fromMe: boolean;
  text?: string;
  image?: string;
  time: string;
};

const Avatar: React.FC<{ name?: string; imageUrl?: string | null; size?: number }> = ({ name, imageUrl, size = 40 }) => {
  const initials = (name || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  if (imageUrl)
    return <img src={imageUrl} alt={name} className="rounded-full object-cover" style={{ width: size, height: size }} />;
  return (
    <div className="rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold" style={{ width: size, height: size }}>
      {initials}
    </div>
  );
};

const Messages: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("farmerSidebarCollapsed") === "true";
  });
  
  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const newState = !prev;
      localStorage.setItem("farmerSidebarCollapsed", String(newState));
      return newState;
    });
  };
  const [activeTab, setActiveTab] = useState<"All" | "Farmers" | "Buyers">("All");
  const [selectedChatId, setSelectedChatId] = useState<number>(1);

  const chats: ChatPreview[] = [
    { id: 1, name: "John Doe", preview: "Photo attached", time: "10:30 AM", unread: true, tag: "Farmers" },
    { id: 2, name: "AgroCorp Ltd", preview: "Is the price negotiable?", time: "Yesterday", tag: "Buyers" },
    { id: 3, name: "Sarah Jenkins", preview: "Contract PDF sent.", time: "Tue", unread: true, tag: "Buyers" },
    { id: 4, name: "Marcus Green", preview: "Thanks for the update.", time: "Oct 24", tag: "Farmers" },
  ];

  const filteredChats = useMemo(() => (activeTab === "All" ? chats : chats.filter((c) => c.tag === activeTab)), [activeTab]);

  const thread: MessageItem[] = [
    { id: 1, fromMe: false, text: "Hello! I saw your request for bulk tomatoes. Are these still available for pickup next Tuesday? I can arrange transport.", time: "10:15 AM" },
    { id: 2, fromMe: true, text: "Yes, harvest is Monday morning. We should be ready by Tuesday noon.", time: "10:18 AM" },
    { id: 3, fromMe: false, image: tomato, time: "10:30 AM" },
    { id: 4, fromMe: false, text: "Here is a photo of the current size from this morning.", time: "10:31 AM" },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <FarmerSideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} collapsed={isSidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)} onToggleCollapse={handleToggleCollapse} />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Home", to: "/Home" }, { label: "Dashboard", to: "/FarmerDashboard" }, { label: "Messages" }]} />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
                <div className="mt-3 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                  <Search01Icon size={18} />
                  <input className="bg-transparent outline-0 w-full text-sm" placeholder="Search chats" />
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <button className={`px-3 py-1 rounded-full ${activeTab === "All" ? "bg-lime-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setActiveTab("All")}>All</button>
                  <button className={`px-3 py-1 rounded-full ${activeTab === "Farmers" ? "bg-lime-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setActiveTab("Farmers")}>Farmers</button>
                  <button className={`px-3 py-1 rounded-full ${activeTab === "Buyers" ? "bg-lime-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => setActiveTab("Buyers")}>Buyers</button>
                </div>
              </div>
              <div className="divide-y">
                {filteredChats.map((c) => (
                  <button key={c.id} onClick={() => setSelectedChatId(c.id)} className={`w-full text-left p-4 flex items-center gap-3 hover:bg-gray-50 ${selectedChatId === c.id ? "bg-green-50" : ""}`}>
                    <Avatar name={c.name} size={42} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-800">{c.name}</p>
                        <span className="text-xs text-gray-500">{c.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{c.preview}</p>
                    </div>
                    {c.unread && <span className="w-5 h-5 text-xs bg-green-500 text-white rounded-full flex items-center justify-center">1</span>}
                  </button>
                ))}
              </div>
            </section>

            <section className="col-span-12 lg:col-span-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-4 flex items-center justify-between border-b">
                <div className="flex items-center gap-3">
                  <Avatar name="John Doe" size={44} />
                  <div>
                    <p className="font-semibold text-gray-800">John Doe</p>
                    <p className="text-xs text-gray-500">Maize Farmer • Online</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs bg-yellow-100 text-yellow-700 rounded-full px-2 py-[2px]">Ref: 500kg Maize</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-md bg-gray-100"><LuPhone /></button>
                  <button className="p-2 rounded-md bg-gray-100"><LuVideo /></button>
                  <button className="p-2 rounded-md bg-gray-100"><MoreVerticalIcon /></button>
                </div>
              </div>

              <div className="relative p-4 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
                <div className="mx-auto max-w-2xl space-y-4">
                  <div className="flex justify-center">
                    <span className="text-xs text-gray-500">Today, 10:15 AM</span>
                  </div>
                  {thread.map((m) => (
                    <div key={m.id} className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] rounded-2xl ${m.fromMe ? "bg-green-500 text-white" : "bg-white text-gray-800 border"} p-3 shadow-sm`}>
                        {m.image && <img src={m.image} alt="" className="rounded-xl mb-2" />}
                        {m.text && <p className="text-sm">{m.text}</p>}
                        <span className={`block text-[11px] mt-1 ${m.fromMe ? "text-green-100" : "text-gray-400"}`}>{m.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                  <button className="p-2"><SmartPhone02Icon /></button>
                  <input className="flex-1 bg-transparent outline-0 text-sm" placeholder="Type a message" />
                  <button className="bg-lime-600 text-white px-3 py-2 rounded-full text-sm">Send</button>
                </div>
              </div>
            </section>

            <section className="col-span-12 lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-3">
                  <Avatar name="John Doe" size={52} />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">John Doe</p>
                    <p className="text-sm text-gray-500">Maize Farmer</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xl font-semibold text-gray-800">4.9</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xl font-semibold text-gray-800">145</p>
                    <p className="text-xs text-gray-500">Deals</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xl font-semibold text-gray-800">3yr</p>
                    <p className="text-xs text-gray-500">Member</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2"><span className="text-gray-500">Ibadan, Nigeria</span><span className="text-gray-400">25km away</span></div>
                  <div className="flex items-center gap-2">john.doe@farmintel.co</div>
                  <div className="flex items-center gap-2">+234 800 123 4567</div>
                </div>
                <div className="mt-4 bg-gray-100 rounded-xl h-28 flex items-center justify-center">
                  <button className="px-3 py-1 bg-white rounded-full text-sm shadow">View on Map</button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <p className="text-sm font-semibold text-gray-800 mb-3">Attachments</p>
                <div className="flex items-center gap-3">
                  <img src={tomato} alt="" className="w-20 h-20 rounded-xl object-cover" />
                  <img src={corn} alt="" className="w-20 h-20 rounded-xl object-cover" />
                  <div className="w-20 h-20 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-semibold">+12</div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages;
