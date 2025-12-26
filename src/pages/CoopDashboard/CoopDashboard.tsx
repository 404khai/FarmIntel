import React, { useEffect, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import CoopSideNav from "../../components/CoopSideNav";
import { 
  Calendar02Icon, 
  Download02Icon, 
  FilterIcon, 
  Search01Icon, 
  UserGroupIcon, 
  Money03Icon, 
  Share01Icon,
  MoreHorizontalIcon
} from "hugeicons-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts";
import { motion } from "framer-motion";
import user1 from "../../assets/user1.jpeg";

const CoopDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const chartData = [
    { name: "Mon", value: 30 },
    { name: "Tue", value: 45 },
    { name: "Wed", value: 38 },
    { name: "Thu", value: 82, highlight: true },
    { name: "Fri", value: 55 },
    { name: "Sat", value: 25 },
    { name: "Sun", value: 35 },
  ];

  const transactions = [
    {
      id: "#TRX-8932",
      date: "Oct 24, 2023",
      farmer: { name: "John Doe Farms", avatar: user1 },
      buyer: "Organic Co-op Ltd.",
      crop: "Wheat",
      volume: "500 kg",
      gain: "+$1,250.00"
    },
    {
      id: "#TRX-8933",
      date: "Oct 25, 2023",
      farmer: { name: "Sarah Smith", avatar: user1 },
      buyer: "Green Market",
      crop: "Corn",
      volume: "1.2 Tons",
      gain: "+$2,840.00"
    },
    {
      id: "#TRX-8934",
      date: "Oct 25, 2023",
      farmer: { name: "Albert Liu", avatar: user1 },
      buyer: "FreshDirect",
      crop: "Soybeans",
      volume: "800 kg",
      gain: "+$1,640.00"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <CoopSideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        collapsed={isSidebarCollapsed}
      />

      <div className="flex-1 flex flex-col">
        <DashboardNav
          onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)}
        />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto mt-2`}>
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
              <p className="text-gray-500 font-semibold mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2.5 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                <Calendar02Icon size={18} className="text-gray-400" />
                <span className="text-sm font-bold text-gray-700">Oct 24, 2023 - Oct 31, 2023</span>
              </div>
              <button className="flex items-center gap-2 bg-[#55D22B] text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-green-100 hover:bg-[#4bc124] hover:-translate-y-0.5 transition-all">
                <Download02Icon size={18} />
                Export Report
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#55D22B]">
                  <UserGroupIcon size={24} />
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[11px] font-black flex items-center gap-1">
                  <span className="text-[14px]">↗</span> +12%
                </div>
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Total Active Members</p>
              <h3 className="text-4xl font-black text-gray-900 mt-1">1,245</h3>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-emerald-600">
                  <Money03Icon size={24} />
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[11px] font-black flex items-center gap-1">
                  <span className="text-[14px]">↗</span> +5%
                </div>
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Total Revenue</p>
              <h3 className="text-4xl font-black text-gray-900 mt-1">$524,890</h3>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <Share01Icon size={24} />
                </div>
                <div className="bg-red-50 text-red-500 px-2.5 py-1 rounded-full text-[11px] font-black flex items-center gap-1">
                  <span className="text-[14px]">↘</span> -2%
                </div>
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Pending Matches</p>
              <h3 className="text-4xl font-black text-gray-900 mt-1">34</h3>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Registration Trends Chart */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900">Member Registration Trends</h3>
                <div className="hidden sm:flex items-center gap-1 bg-gray-50 p-1 rounded-xl">
                  {["Daily", "Weekly", "Monthly"].map((tab) => (
                    <button 
                      key={tab} 
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${tab === "Weekly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: "transparent" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#111827] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl">
                              {payload[0].value} New
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.highlight ? "#55D22B" : "#D1FADF"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Top Producing Regions */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
              className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col"
            >
              <h3 className="text-xl font-black text-gray-900 mb-6">Top Producing Regions</h3>
              <div className="flex-1 bg-gray-50 rounded-2xl relative mb-8 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Map Placeholder" 
                  className="w-full h-full object-cover opacity-30 grayscale saturate-0"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="bg-white p-2 rounded-lg shadow-xl border border-gray-100 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#55D22B] animate-pulse" />
                     <span className="text-[10px] font-black uppercase text-gray-600 whitespace-nowrap">Live Data</span>
                   </div>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { name: "Central Valley", val: 45, color: "bg-[#55D22B]" },
                  { name: "Salinas Valley", val: 30, color: "bg-[#55D22B]" },
                  { name: "Other Regions", val: 25, color: "bg-gray-300" },
                ].map((region) => (
                  <div key={region.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-black text-gray-700">
                      <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${region.color}`} />
                         <span>{region.name}</span>
                      </div>
                      <span>{region.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${region.val}%` }} transition={{ duration: 1, delay: 0.8 }}
                        className={`h-full ${region.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Transactions Table */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-xl font-black text-gray-900">Recent Transactions</h3>
              <div className="flex items-center gap-3">
                <div className="relative group min-w-[300px]">
                  <Search01Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#55D22B] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search transactions..."
                    className="pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#55D22B]/30 focus:ring-4 focus:ring-[#55D22B]/5 transition-all w-full"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                  <FilterIcon size={18} />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Farmer</th>
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Buyer</th>
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Crop</th>
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Volume</th>
                    <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Monetary Gain</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.map((trx, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-4.5 text-sm font-black text-gray-900">{trx.id}</td>
                      <td className="px-6 py-4.5 text-sm font-semibold text-gray-500">{trx.date}</td>
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-3">
                          <img src={trx.farmer.avatar} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm" />
                          <span className="text-sm font-black text-gray-900">{trx.farmer.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 text-sm font-bold text-gray-700">{trx.buyer}</td>
                      <td className="px-6 py-4.5">
                        <span className={`px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-tight ${
                          trx.crop === "Wheat" ? "bg-yellow-50 text-yellow-700" : 
                          trx.crop === "Corn" ? "bg-orange-50 text-orange-700" : "bg-emerald-50 text-emerald-700"
                        }`}>
                          {trx.crop}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-sm font-bold text-gray-700">{trx.volume}</td>
                      <td className="px-6 py-4.5 text-sm font-black text-[#55D22B]">{trx.gain}</td>
                      <td className="px-8 py-4.5">
                        <button className="text-gray-300 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg">
                          <MoreHorizontalIcon size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-gray-50/50 flex items-center justify-center">
              <button className="text-[13px] font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">View All Transactions</button>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
};

export default CoopDashboard;
