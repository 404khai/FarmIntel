import React, { useState } from "react";
import OrgDashboardNav from "../../components/OrgDashboardNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import { CreditCardPosIcon, Invoice03Icon, ChartBarLineIcon, Wallet01Icon } from "hugeicons-react";
import { LuCheck } from "react-icons/lu";

const Billing: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const usage = 85400; // requests
  const limit = 100000; // requests
  const percent = Math.min(100, Math.round((usage / limit) * 100));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <OrgDashboardNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="pt-16 px-4 sm:px-6 md:px-8 pb-24 ml-0 min-h-screen overflow-y-auto">
          <div className="mb-4">
            <a href="/OrgDashboard" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">Back to Dashboard</a>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Breadcrumbs items={[{ label: "Dashboard", to: "/OrgDashboard" }, { label: "Settings", to: "/OrgDashboard/Settings" }, { label: "Billing & Payments" }]} />
            <button className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md">Export Data</button>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Billing & Payments</h1>
            <p className="text-gray-500 mt-1">Manage your cooperative’s subscription plan, monitor API usage, and handle invoices securely.</p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-lime-50 text-lime-600">
                    <CreditCardPosIcon size={16} />
                  </span>
                  Current Plan
                </div>
                <span className="text-xs px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700">ACTIVE</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Enterprise API</h3>
              <p className="text-sm text-gray-700 mt-1">$499.00 <span className="text-gray-500">/ month</span></p>
              <p className="text-xs text-gray-500 mt-3">Renews on Oct 1, 2023</p>
              <button className="mt-4 w-full px-4 py-2 rounded-lg bg-lime-100 text-lime-700">Change Plan</button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-50 text-indigo-600">
                    <ChartBarLineIcon size={16} />
                  </span>
                  API Usage

                </div>
                <span className="text-xs text-gray-500">Resets in 12 days</span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-800">85.4k</p>
                <p className="text-sm text-gray-500">/ 100k requests</p>
              </div>
              <div className="mt-3">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-lime-600 rounded-full" style={{ width: `${percent}%` }} />
                </div>
                <p className="mt-2 text-xs text-gray-600">Est. Overage: $0.00</p>
              </div>
              <button className="mt-4 w-full px-4 py-2 rounded-lg bg-gray-900 text-white">View Usage Analytics</button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-50 text-orange-600">
                    <Invoice03Icon size={16} />
                  </span>
                  Next Invoice
                </div>
                <span className="text-xs px-2 py-[2px] rounded-full bg-gray-100 text-gray-700">Upcoming</span>
              </div>
              <p className="text-3xl font-semibold text-gray-800">$499.00</p>
              <p className="text-xs text-gray-500 mt-2">Due Date: Oct 1, 2023</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-700">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700"><LuCheck size={14} /></span>
                Auto-pay enabled
              </div>
              <button className="mt-4 w-full px-4 py-2 rounded-lg bg-lime-600 text-white">Pay Now</button>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">Payment Methods</h2>
                <button className="text-sm text-lime-700">Add New</button>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-gray-100" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Visa ending in 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/24</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-[2px] rounded-full bg-gray-100 text-gray-700">Default</span>
                    <button className="text-xl leading-none text-gray-400">⋯</button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-gray-100" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Mastercard ending in 8899</p>
                      <p className="text-xs text-gray-500">Expires 09/25</p>
                    </div>
                  </div>
                  <button className="text-xl leading-none text-gray-400">⋯</button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">Billing Information</h2>
                <button className="text-sm text-lime-700">Edit</button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <p className="font-medium text-gray-800">GreenAcres Co-op Ltd.</p>
                <p className="text-sm text-gray-700 mt-1">Tax ID: US-987654321</p>
                <div className="mt-3 text-sm text-gray-700">
                  <p>1234 Farming Innovation Way</p>
                  <p>Suite 200</p>
                  <p>San Francisco, CA 94107</p>
                  <p>United States</p>
                </div>
                <div className="mt-3 text-sm text-gray-700 flex items-center gap-2">
                  <span className="inline-block w-5 h-5 rounded-md bg-gray-100" />
                  billing@greenacres.coop
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">Invoice History</h2>
              <button className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md">Last 6 Months ▾</button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-12 gap-0 text-xs font-semibold text-gray-500 border-b px-4 py-3">
                <div className="col-span-3">INVOICE ID</div>
                <div className="col-span-2">BILLING DATE</div>
                <div className="col-span-2">AMOUNT</div>
                <div className="col-span-2">PLAN</div>
                <div className="col-span-2">STATUS</div>
                <div className="col-span-1 text-right">DOWNLOAD</div>
              </div>
              {[
                { id: "INV-1043", date: "Oct 01, 2023", amount: "$499.00", plan: "Enterprise", status: "Paid" },
                { id: "INV-1042", date: "Sep 01, 2023", amount: "$499.00", plan: "Enterprise", status: "Paid" },
                { id: "INV-1041", date: "Aug 01, 2023", amount: "$499.00", plan: "Enterprise", status: "Paid" },
              ].map((row) => (
                <div key={row.id} className="grid grid-cols-12 gap-0 text-sm text-gray-700 px-4 py-3 border-b last:border-none">
                  <div className="col-span-3 font-medium text-gray-800">{row.id}</div>
                  <div className="col-span-2">{row.date}</div>
                  <div className="col-span-2">{row.amount}</div>
                  <div className="col-span-2">{row.plan}</div>
                  <div className="col-span-2">
                    <span className="px-2 py-[2px] rounded-full bg-emerald-100 text-emerald-700 text-xs">{row.status}</span>
                  </div>
                  <div className="col-span-1 text-right">
                    <a href="#" className="text-lime-700 text-sm">Download</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Billing;
