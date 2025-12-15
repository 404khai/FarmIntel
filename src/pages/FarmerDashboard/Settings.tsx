import React, { useState, useEffect } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";


const Settings: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  

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

        <main className={`pt-16 px-6 sm:px-8 pb-10 ${isSidebarCollapsed ? "ml-20" : "ml-64"} h-screen overflow-y-auto`}>
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
            <p className="text-gray-500 mt-1">Manage your profile, preferences, and account security.</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-12 lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile</h2>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">First Name</label>
                  <input className="mt-1 w-full border rounded-md px-3 py-2" defaultValue={user?.firstname || ""} />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Last Name</label>
                  <input className="mt-1 w-full border rounded-md px-3 py-2" defaultValue={user?.lastname || ""} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-600">Email</label>
                  <input type="email" className="mt-1 w-full border rounded-md px-3 py-2" defaultValue={user?.email || ""} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-600">Phone</label>
                  <input className="mt-1 w-full border rounded-md px-3 py-2" defaultValue={user?.phone || ""} />
                </div>
                <div className="sm:col-span-2 flex justify-end mt-2">
                  <button type="button" className="px-4 py-2 bg-lime-600 text-white rounded-md">Save Changes</button>
                </div>
              </form>
            </section>

            <section className="col-span-12 lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Dark Mode</p>
                    <p className="text-xs text-gray-500">Reduce glare and save battery.</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-lime-600" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Show AI tips</p>
                    <p className="text-xs text-gray-500">Display contextual AI recommendations.</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-lime-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Language</p>
                    <p className="text-xs text-gray-500">Choose your default language.</p>
                  </div>
                  <select className="border rounded-md px-3 py-2">
                    <option>English</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="col-span-12 lg:col-span-6 bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Security</h2>
              <form className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Current Password</label>
                  <input type="password" className="mt-1 w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">New Password</label>
                  <input type="password" className="mt-1 w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Confirm Password</label>
                  <input type="password" className="mt-1 w-full border rounded-md px-3 py-2" />
                </div>
                <div className="flex justify-end mt-2">
                  <button type="button" className="px-4 py-2 bg-gray-800 text-white rounded-md">Update Password</button>
                </div>
              </form>
            </section>

            <section className="col-span-12 lg:col-span-6 bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">Email Alerts</p>
                  <input type="checkbox" className="w-5 h-5 accent-lime-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">SMS Alerts</p>
                  <input type="checkbox" className="w-5 h-5 accent-lime-600" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">Critical Pest Alerts</p>
                  <input type="checkbox" className="w-5 h-5 accent-lime-600" defaultChecked />
                </div>
              </div>
            </section>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Settings;
