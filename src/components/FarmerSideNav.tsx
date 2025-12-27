import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AccountSetting02Icon, Message01Icon, Bug02Icon, DashboardSquare02Icon, UserGroupIcon, HelpCircleIcon, Invoice03Icon, Plant02Icon, Store04Icon, CreditCardPosIcon } from "hugeicons-react";

interface PetOwnerSideNavProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
}

const FarmerSideNav: React.FC<PetOwnerSideNavProps> = ({ isOpen, onClose, collapsed = false }) => {
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
        className={`fixed top-0 left-0 h-full ${collapsed ? "w-20" : "w-64"} bg-white shadow-lg transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className={`flex flex-col h-full pt-24 pb-6 ${collapsed ? "overflow-y-visible" : "overflow-y-auto"}`}>
          {/* --- HOME SECTION --- */}
          {/* --- OVERVIEW SECTION --- */}
            <Section title="Overview" collapsed={collapsed}>
                <NavLink to="/FarmerDashboard" icon={<DashboardSquare02Icon />} collapsed={collapsed}>
                    Dashboard
                </NavLink>
            </Section>

            {/* --- FARM MANAGEMENT SECTION --- */}
            <Section title="Farm Management" collapsed={collapsed}>
                <NavLink to="/FarmerDashboard/Crops" icon={<Plant02Icon />} collapsed={collapsed}>
                    My Crops
                </NavLink>
                <NavLink to="/FarmerDashboard/Detection" icon={<Bug02Icon />} collapsed={collapsed}>
                    Pest Detection
                </NavLink>
                
            </Section>

            {/* --- INSIGHTS & INTELLIGENCE SECTION --- */}
            <Section title="Social" collapsed={collapsed}>
                {/* <NavLink to="/FarmerDashboard/Recommendations" icon={<Megaphone02Icon />}>
                    AI Recommendations
                </NavLink> */}
                <NavLink to="/FarmerDashboard/Messages" icon={<Message01Icon />} collapsed={collapsed}>
                    Messages
                </NavLink>
                {/* <NavLink to="/FarmerDashboard/Reports" icon={<DocumentAttachmentIcon />} collapsed={collapsed}>
                    Reports
                </NavLink> */}
                <NavLink to="/FarmerDashboard/Cooperatives" icon={<UserGroupIcon />} collapsed={collapsed}>
                    Cooperatives
                </NavLink>
            </Section>

            <Section title="Orders" collapsed={collapsed}>
                <NavLink to="/FarmerDashboard/Orders" icon={<Store04Icon />} collapsed={collapsed}>
                    Orders
                </NavLink>
                <NavLink to="/FarmerDashboard/Transactions" icon={<Invoice03Icon />} collapsed={collapsed}>
                    Transactions
                </NavLink>
            </Section>

                {/* --- ACCOUNT SECTION --- */}
            <Section title="Account" collapsed={collapsed}>
                <NavLink to="/FarmerDashboard/Settings" icon={<AccountSetting02Icon />} collapsed={collapsed}>
                    Settings
                </NavLink>
                <NavLink to="/FarmerDashboard/Billing" icon={<CreditCardPosIcon />} collapsed={collapsed}>
                Billing
              </NavLink>
            </Section>

            {/* --- SUPPORT SECTION --- */}
            <Section title="Support" collapsed={collapsed}>
                <NavLink to="/FarmerDashboard/Help" icon={<HelpCircleIcon />} collapsed={collapsed}>
                    Help & Resources
                </NavLink>
            </Section>

        </div>
      </aside>
    </>
  );
};

// --- Reusable section wrapper ---
const Section: React.FC<{ title: string; children: React.ReactNode; collapsed?: boolean }> = ({
  title,
  children,
  collapsed = false,
}) => (
  <div className="mb-4">
    {!collapsed && (
      <p className="font-mono pl-5 text-lime-600 font-semibold text-xs uppercase tracking-wide mb-2">
        {title}
      </p>
    )}
    {children}
  </div>
);

// --- Reusable NavLink component ---
interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  collapsed?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, children, collapsed = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const base = `font-sans flex items-center ${collapsed ? "justify-center" : "gap-3"} py-3 px-5 border-l-4 transition-all duration-200`;
  const inactive = `text-gray-600 hover:text-lime-600 hover:bg-lime-400/10 border-transparent hover:border-lime-600`;
  const active = `text-lime-600 bg-lime-400/10 border-lime-600`;

  return (
    <Link to={to} className={`${base} ${isActive ? active : inactive} group relative`} aria-current={isActive ? "page" : undefined}>
      <span className="text-xl">{icon}</span>
      {!collapsed && <span className="text-[14px] font-medium">{children}</span>}
      
      {collapsed && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-900 text-white text-[12px] font-semibold rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-1 transition-all duration-200 pointer-events-none whitespace-nowrap z-[9999] shadow-2xl">
          {children}
          {/* Tooltip Arrow */}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      )}
    </Link>
  );
};

export default FarmerSideNav;
