import React, { useEffect, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import BackToDashboardPill from "../../components/BackToDashboardPill";
import Breadcrumbs from "../../components/Breadcrumbs";
import avatar from "../../assets/avatar.jpeg";
import corn from "../../assets/corn.jpeg";
import tomato from "../../assets/tomato.jpeg";
import rice from "../../assets/rice.jpeg";
import { getFirstName } from "../../utils/user";

const Profile: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const name = getFirstName(user);
  const farmName = "Green Valley Acres";

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 flex flex-col">
        <DashboardNav onToggleMobileSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className={`pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 min-h-screen overflow-y-auto`}>
          <div className="mb-4">
            <BackToDashboardPill to="/FarmerDashboard" />
          </div>
          <section className="bg-white rounded-2xl shadow-sm p-5 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">{name}</h1>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">Owner at <span className="font-medium text-gray-800">{farmName}</span></p>
                  <p className="text-xs text-gray-500">Salem District, Zone 4 • ID: #FI-8829 • Member since 2019</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-md border">Message</button>
                <button className="px-4 py-2 bg-lime-600 text-white rounded-md">Contact Info</button>
              </div>
            </div>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600">Total Acreage</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">45 ac</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600">Soil Type</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">Loamy</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600">Irrigation</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">Drip</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600">Seasons</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">12</p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Top 3 Highest Selling Crops</h2>
                  <button className="text-sm text-lime-600">View Report</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: "Wheat (Durum)", season: "Winter", total: "14.5 Tons", revenue: "$12.4k", img: rice },
                    { name: "Sweet Corn", season: "Summer", total: "8.2 Tons", revenue: "$8.9k", img: corn },
                    { name: "Soybeans", season: "Autumn", total: "6.8 Tons", revenue: "$7.1k", img: tomato },
                  ].map((c, i) => (
                    <div key={i} className="rounded-xl border bg-white p-4">
                      <img src={c.img} alt={c.name} className="w-full h-28 object-cover rounded-lg mb-3" />
                      <p className="font-medium text-gray-800">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.season} Season</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <p className="text-[11px] text-gray-500">TOTAL SOLD</p>
                          <p className="text-sm font-semibold text-gray-800">{c.total}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500">REVENUE</p>
                          <p className="text-sm font-semibold text-emerald-700">{c.revenue}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Buyer Feedback</h2>
                  <button className="text-sm text-lime-600">View All Reviews</button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Peterson", org: "Organic Foods Ltd.", text: "The quality of the sweet corn we received was exceptional. Very sweet and fresh.", product: "Sweet Corn (2 Tons)", time: "2 days ago" },
                    { name: "Michael K.", org: "Local Co-op Manager", text: "Durum wheat harvest was clean and high yield. Product speaks for itself.", product: "Wheat (5 Tons)", time: "1 week ago" },
                    { name: "Anita Lopez", org: "Restaurant Owner", text: "Soybeans are perfect for tofu production. Consistent size and quality.", product: "Soybeans (500 kg)", time: "2 weeks ago" },
                  ].map((r, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-800">{r.name} <span className="text-xs text-gray-500">• {r.org}</span></p>
                      <p className="text-sm text-gray-700 mt-1">“{r.text}”</p>
                      <p className="text-xs text-gray-500 mt-1">Verified Purchase: {r.product} • {r.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Reputation</h3>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-2xl font-semibold text-gray-800">4.8</p>
                  <div className="flex text-yellow-400">{"★★★★★"}</div>
                </div>
                <p className="text-xs text-gray-500">124 reviews</p>
                <div className="mt-3 space-y-1">
                  {[5,4,3,2,1].map((n) => (
                    <div key={n} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-4">{n}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded">
                        <div className={`h-2 rounded bg-emerald-500`} style={{ width: `${n*15}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">Current Crop</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">In Progress</span>
                </div>
                <p className="text-sm text-gray-700">Tomatoes (Roma)</p>
                <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-1">Flowering (65%)</p>
                  <div className="w-full h-2 bg-gray-100 rounded">
                    <div className="h-2 bg-lime-600 rounded" style={{ width: "65%" }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Est. Harvest: Oct 15th</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Location</h3>
                <div className="w-full h-40 bg-gray-200 rounded mb-2" />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">Salem District, Tamil Nadu</p>
                  <button className="text-sm text-lime-600">Get Directions</button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Certifications</h3>
                <div className="space-y-2">
                  {[
                    "Certified Organic",
                    "Fair Trade Partner",
                    "Co-op Top Seller 2023",
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <p className="text-sm text-gray-700">{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
