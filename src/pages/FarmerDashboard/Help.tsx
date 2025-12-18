import React, { useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import FarmerSideNav from "../../components/FarmerSideNav";
import Breadcrumbs from "../../components/Breadcrumbs";
import corn from "../../assets/corn.jpeg";

const Help: React.FC = () => {
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

  const topics = [
    { title: "Getting Started", desc: "Account setup, profile, onboarding" },
    { title: "Managing Crops", desc: "Inventory, statuses, updates" },
    { title: "Orders & Transactions", desc: "Orders, invoices, payouts" },
    { title: "AI & Detection", desc: "Disease, pests, recommendations" },
    { title: "Account & Billing", desc: "Settings, plans, subscriptions" },
  ];

  const faqs = [
    { q: "How do I list a new crop?", a: "Go to My Crops, click Add New Crop, fill details and publish." },
    { q: "How do payments work?", a: "Invoices are generated per order. Payouts follow your billing settings." },
    { q: "Can I use AI detection on images?", a: "Upload clear images in Detection. The system analyzes and suggests actions." },
    { q: "How do I change my plan?", a: "Open Billing and choose a plan. Changes apply to the next cycle." },
  ];

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
          onToggleCollapse={handleToggleCollapse}
        />

        <main className={`pt-16 px-4 sm:px-6 md:px-8 pb-16 ml-0 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"} min-h-screen overflow-y-auto`}>
          <div className="mb-4">
            <Breadcrumbs items={[{ label: "Home", to: "/Home" }, { label: "Dashboard", to: "/FarmerDashboard" }, { label: "Help & Resources" }]} />
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Help & Resources</h1>
              <p className="text-gray-500 mt-2">Browse topics, read FAQs, and contact support when you need assistance managing your farm operations.</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topics.map((t, i) => (
                  <button key={i} className="text-left p-5 rounded-xl border hover:border-lime-600 hover:bg-lime-50 transition">
                    <p className="text-sm font-semibold text-gray-800">{t.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-center">
              <img src={corn} alt="Crop" className="rounded-xl w-full h-56 object-cover" />
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">Frequently Asked Questions</h2>
              <div className="mt-4 divide-y">
                {faqs.map((f, idx) => (
                  <details key={idx} className="group py-3">
                    <summary className="cursor-pointer flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800">{f.q}</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <p className="mt-2 text-sm text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">Need More Help?</h2>
              <p className="text-sm text-gray-600 mt-1">Our team is here to assist with setup, troubleshooting, and best practices.</p>
              <div className="mt-4 space-y-3">
                <a href="mailto:support@farmintel.co" className="block p-4 rounded-xl border hover:bg-gray-50 text-sm text-gray-800">Email Support</a>
                <a href="tel:+2348001234567" className="block p-4 rounded-xl border hover:bg-gray-50 text-sm text-gray-800">Call +234 800 123 4567</a>
                <a href="#" className="block p-4 rounded-xl border hover:bg-gray-50 text-sm text-lime-700">Start Live Chat</a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Help;

