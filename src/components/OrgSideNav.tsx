import React from "react";
import { Link } from "react-router-dom";
import { AccountSetting02Icon, AiIdeaIcon, Bug02Icon, DashboardSquare02Icon, DocumentAttachmentIcon, HelpCircleIcon, Invoice03Icon, Megaphone02Icon, Plant02Icon } from "hugeicons-react";

interface PetOwnerSideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrgSideNav: React.FC<PetOwnerSideNavProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* --- Overlay for Mobile --- */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-[999] md:hidden"
        />
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full pt-24 pb-6 overflow-y-auto">
          {/* --- HOME SECTION --- */}
          {/* --- OVERVIEW SECTION --- */}
            <Section title="Overview">
                <NavLink to="/OrgDashboard" icon={<DashboardSquare02Icon />}>
                    Dashboard
                </NavLink>
            </Section>

            {/* --- FARM MANAGEMENT SECTION --- */}
            <Section title="Farm Management">
                <NavLink to="/OrgDashboard/Farms" icon={<Plant02Icon />}>
                    My Farms
                </NavLink>
                <NavLink to="/OrgDashboard/PestDetection" icon={<Bug02Icon />}>
                    Pest Detection
                </NavLink>
                
            </Section>

            {/* --- INSIGHTS & INTELLIGENCE SECTION --- */}
            <Section title="Insights">
                <NavLink to="/FarmerDashboard/Recommendations" icon={<Megaphone02Icon />}>
                    AI Recommendations
                </NavLink>
                <NavLink to="/FarmerDashboard/MarketInsights" icon={<AiIdeaIcon />}>
                    Market Insights
                </NavLink>
                <NavLink to="/FarmerDashboard/Reports" icon={<DocumentAttachmentIcon />}>
                    Reports
                </NavLink>
                </Section>

                {/* --- ACCOUNT SECTION --- */}
                <Section title="Account">
                <NavLink to="/FarmerDashboard/Profile" icon={<AccountSetting02Icon />}>
                    Settings
                </NavLink>
                <NavLink to="/FarmerDashboard/Reports" icon={<Invoice03Icon />}>
                Billing
              </NavLink>
            </Section>

            {/* --- SUPPORT SECTION --- */}
            <Section title="Support">
                <NavLink to="/FarmerDashboard/Help" icon={<HelpCircleIcon />}>
                    Help & Resources
                </NavLink>
            </Section>

        </div>
      </aside>
    </>
  );
};

// --- Reusable section wrapper ---
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-6">
    <p className="font-mono pl-5 text-lime-600 font-semibold text-xs uppercase tracking-wide mb-2">
      {title}
    </p>
    {children}
  </div>
);

// --- Reusable NavLink component ---
interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, children }) => (
  <Link
    to={to}
    className="font-sans flex items-center gap-3 py-3 px-5 text-gray-600 hover:text-lime-600 hover:bg-lime-400/10 border-l-4 border-transparent hover:border-lime-600 transition-all duration-200"
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[14px] font-medium">{children}</span>
  </Link>
);

export default OrgSideNav;
