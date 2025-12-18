import React, { useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import BackToDashboardPill from "../../components/BackToDashboardPill";
import Breadcrumbs from "../../components/Breadcrumbs";
import { CreditCardPosIcon, Invoice03Icon, ChartBarLineIcon, Wallet01Icon } from "hugeicons-react";

const Billing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"Monthly" | "Yearly">("Monthly");

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 flex flex-col">
        <DashboardNav />

        <main className="pt-20 px-4 sm:px-6 md:px-8 pb-10 ml-0 min-h-screen overflow-y-auto">
          <div className="mb-4">
            <BackToDashboardPill to="/FarmerDashboard" />
          </div>
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Home", to: "/Home" }, { label: "Dashboard", to: "/FarmerDashboard" }, { label: "Billing" }]} />
          </div>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Billing & Subscription</h1>
            <p className="text-gray-500 mt-1">Manage your farm’s subscription tier to connect with more buyers and increase yield.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-lime-50 text-lime-700">
                    <CreditCardPosIcon />
                    <span className="text-sm font-medium">Billing Plans</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <ChartBarLineIcon />
                    <span className="text-sm">Usage History</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <Wallet01Icon />
                    <span className="text-sm">Payment Methods</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50">
                    <Invoice03Icon />
                    <span className="text-sm">Invoices</span>
                  </button>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9 space-y-6">
              <section className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Current Plan: Free Tier</p>
                    <p className="text-xs text-gray-500">You are currently on the Free plan. Your cycle renews automatically on Nov 1, 2023.</p>
                  </div>
                  <button className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm">Payment Details</button>
                </div>
              </section>

              <section className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex items-center justify-center gap-3">
                  <button
                    className={`px-4 py-2 rounded-full text-sm ${billingCycle === "Monthly" ? "bg-lime-600 text-white" : "bg-gray-100 text-gray-800"}`}
                    onClick={() => setBillingCycle("Monthly")}
                  >
                    Monthly Billing
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full text-sm ${billingCycle === "Yearly" ? "bg-lime-600 text-white" : "bg-gray-100 text-gray-800"}`}
                    onClick={() => setBillingCycle("Yearly")}
                  >
                    Yearly Billing <span className="ml-2 text-xs text-green-700">Save 20%</span>
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Free */}
                  <div className="rounded-2xl border bg-white p-5">
                    <h3 className="text-xl font-semibold text-gray-800">Free</h3>
                    <p className="text-3xl font-bold mt-2">₦0 <span className="text-base font-normal">/month</span></p>
                    <p className="text-xs text-gray-500 mt-1">Perfect for small farms just starting out.</p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      <li>Access to daily market prices</li>
                      <li>Community forum access</li>
                      <li>1 listing per month</li>
                    </ul>
                    <button className="mt-4 w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800">Current Plan</button>
                  </div>

                  {/* Grower */}
                  <div className="rounded-2xl border-2 border-lime-500 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-800">Grower</h3>
                      <span className="px-2 py-[2px] rounded-full bg-lime-100 text-lime-700 text-xs">Most Popular</span>
                    </div>
                    <p className="text-3xl font-bold mt-2">₦2,500 <span className="text-base font-normal">/month</span></p>
                    <p className="text-xs text-gray-500 mt-1">For growing farms ready to sell more.</p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      <li>Everything in Free</li>
                      <li>Direct buyer matching</li>
                      <li>SMS price alerts (Weekly)</li>
                      <li>Unlimited listings</li>
                    </ul>
                    <button className="mt-4 w-full px-4 py-2 rounded-lg bg-lime-600 text-white">Upgrade to Grower</button>
                  </div>

                  {/* Co-op Pro */}
                  <div className="rounded-2xl border bg-white p-5">
                    <h3 className="text-xl font-semibold text-gray-800">Co-op Pro</h3>
                    <p className="text-3xl font-bold mt-2">₦8,000 <span className="text-base font-normal">/month</span></p>
                    <p className="text-xs text-gray-500 mt-1">Advanced tools for large scale operations.</p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      <li>Everything in Grower</li>
                      <li>Advanced yield analytics</li>
                      <li>Dedicated account manager</li>
                      <li>Priority support (24/7)</li>
                    </ul>
                    <button className="mt-4 w-full px-4 py-2 rounded-lg bg-gray-900 text-white">Upgrade to Pro</button>
                  </div>
                </div>
              </section>

              <section className="bg-white p-5 rounded-2xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                  <div>
                    <p className="font-medium">Can I cancel my subscription at any time?</p>
                    <p className="text-gray-600 mt-1">Yes, you can cancel your subscription at any time. Your plan will remain active until the end of the billing period.</p>
                  </div>
                  <div>
                    <p className="font-medium">How do I pay for the subscription?</p>
                    <p className="text-gray-600 mt-1">We accept all major Nigerian debit cards (Mastercard, Visa, Verve) and direct bank transfers.</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Billing;
