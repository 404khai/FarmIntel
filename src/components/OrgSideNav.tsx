import React from "react";
import { Link } from "react-router-dom";
import { AccountSetting02Icon, BookOpen02Icon, DashboardSquare02Icon, Invoice03Icon, Key01Icon } from "hugeicons-react";
import { LuLogOut } from "react-icons/lu";

interface PetOwnerSideNavProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
}

const OrgSideNav: React.FC<PetOwnerSideNavProps> = ({ isOpen, onClose, collapsed = false }) => {
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
        className={`fixed top-0 left-0 h-full ${collapsed ? "w-20" : "w-64"} bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full pt-24 pb-6 overflow-y-auto">
          {/* --- HOME SECTION --- */}
          {/* --- OVERVIEW SECTION --- */}
            <Section title="Overview" collapsed={collapsed}>
                <NavLink to="/OrgDashboard" icon={<DashboardSquare02Icon />} collapsed={collapsed}>
                    Dashboard
                </NavLink>
            </Section>

            {/* --- DEVELOPER SECTION --- */}
            <Section title="Developer" collapsed={collapsed}>
                <NavLink to="/OrgDashboard/APIKeys" icon={<Key01Icon />} collapsed={collapsed}>
                    API Keys
                </NavLink>
                <NavLink to="/OrgDashboard/Docs" icon={<BookOpen02Icon />} collapsed={collapsed}>
                    Documentation
                </NavLink>
            </Section>



                {/* --- ACCOUNT SECTION --- */}
            <Section title="Account" collapsed={collapsed}>
                <NavLink to="/OrgDashboard/Settings" icon={<AccountSetting02Icon />} collapsed={collapsed}>
                    Settings
                </NavLink>
                <NavLink to="/OrgDashboard/Billing" icon={<Invoice03Icon />} collapsed={collapsed}>
                    Billing & Plans
                </NavLink>
            </Section>

            {/* --- SESSION --- */}
            <Section title="Session" collapsed={collapsed}>
                <NavLink to="/logout" icon={<LuLogOut />} collapsed={collapsed}>
                    Log Out
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
  <div className="mb-6">
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

const NavLink: React.FC<NavLinkProps> = ({ to, icon, children, collapsed = false }) => (
  <Link
    to={to}
    className={`font-sans flex items-center ${collapsed ? "justify-center" : "gap-3"} py-3 px-5 text-gray-600 hover:text-lime-600 hover:bg-lime-400/10 border-l-4 border-transparent hover:border-lime-600 transition-all duration-200`}
  >
    <span className="text-xl">{icon}</span>
    {!collapsed && <span className="text-[14px] font-medium">{children}</span>}
  </Link>
);

export default OrgSideNav;
