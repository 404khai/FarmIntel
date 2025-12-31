import React, { useEffect, useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import BackToDashboardPill from "../../components/BackToDashboardPill";
import avatar from "../../assets/avatar.jpeg";
import { getFullName } from "../../utils/user";

const BuyerProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const name = getFullName(user);

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 flex flex-col">
        <DashboardNav />

        <main className="pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 min-h-screen overflow-y-auto">
          <div className="mb-4">
            <BackToDashboardPill to="/BuyerDashboard" />
          </div>
          <section className="bg-white rounded-2xl shadow-sm p-5 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={user?.profile_pic_url || avatar} alt={name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">{name}</h1>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">Buyer • {user?.email}</p>
                  <p className="text-xs text-gray-500">
                    {user?.city ? `${user.city}, ` : ""} 
                    {user?.state ? `${user.state}` : ""} • 
                    Member since {user?.created_at ? new Date(user.created_at).getFullYear() : "2024"}
                  </p>
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
              <p className="text-sm text-gray-600">Active RFQs</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">3</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600">Spend YTD</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">$42,300</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600">Preferred Regions</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">3</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-sm text-gray-600">Verified Sellers</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">8</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BuyerProfile;
