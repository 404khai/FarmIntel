import React, { useState, useEffect } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import { AccountSetting02Icon, Notification02Icon, Plant02Icon, Invoice03Icon } from "hugeicons-react";


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

        <main className={`pt-16 px-4 sm:px-6 md:px-8 pb-10 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} h-screen overflow-y-auto`}>
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Home", to: "/Home" }, { label: "Settings" }]} />
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Account Settings</h1>
            <p className="text-gray-500 mt-1">Manage your profile information, farm details, and platform preferences.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-lime-50 text-lime-700">
                    <AccountSetting02Icon />
                    <span className="text-sm font-medium">Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <Plant02Icon />
                    <span className="text-sm">Farm Details</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <Notification02Icon />
                    <span className="text-sm">Notifications</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <span className="text-sm">Security</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <Invoice03Icon />
                    <span className="text-sm">Billing & Plan</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50">
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9 space-y-6">
              <section className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Public Profile</h2>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Visible to Coop Members</span>
                </div>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-sm text-gray-600">Display Name</label>
                    <input className="mt-1 w-full border rounded-md px-3 py-2" defaultValue={user?.firstname || ""} />
                    <p className="text-xs text-gray-400 mt-1">This is how you will appear to other farmers and buyers.</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <input className="mt-1 w-full border rounded-md px-3 py-2" defaultValue={user?.name || ""} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email Address</label>
                    <input type="email" className="mt-1 w-full border rounded-md px-3 py-2" defaultValue={user?.email || ""} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone Number</label>
                    <input className="mt-1 w-full border rounded-md px-3 py-2" defaultValue={user?.phone || ""} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Role</label>
                    <select className="mt-1 w-full border rounded-md px-3 py-2">
                      <option>Farmer</option>
                      <option>Coop Admin</option>
                      <option>Buyer</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-gray-600">Bio / Farm Description</label>
                    <textarea rows={4} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="Tell others about your farm" />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-end gap-3">
                    <button type="button" className="px-4 py-2 rounded-md border">Cancel</button>
                    <button type="button" className="px-4 py-2 bg-lime-600 text-white rounded-md">Save Changes</button>
                  </div>
                </form>
              </section>

              <section className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">General Preferences</h2>
                <div className="divide-y">
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Language</p>
                      <p className="text-xs text-gray-500">Select your preferred language for the interface.</p>
                    </div>
                    <select className="border rounded-md px-3 py-2">
                      <option>English (US)</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Time Zone</p>
                      <p className="text-xs text-gray-500">Ensure your notification timestamps are accurate.</p>
                    </div>
                    <select className="border rounded-md px-3 py-2">
                      <option>(GMT+01:00) West Africa</option>
                      <option>(GMT-06:00) Central</option>
                    </select>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Measurement Units</p>
                      <p className="text-xs text-gray-500">Choose units for crop yield and land area.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 rounded-md border bg-gray-50">Metric</button>
                      <button className="px-3 py-1 rounded-md border">Imperial</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-red-50 p-6 rounded-2xl border border-red-200">
                <h2 className="text-lg font-semibold text-red-700 mb-2">Danger Zone</h2>
                <p className="text-xs text-red-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-700">Delete Account</p>
                    <p className="text-xs text-red-600">Permanently remove your account and all associated data.</p>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md">Delete Account</button>
                </div>
              </section>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Settings;
