import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AccountSetting02Icon, AnalysisTextLinkIcon, DashboardSquare02Icon, HelpCircleIcon, Invoice03Icon, UserGroupIcon } from "hugeicons-react";

interface PetOwnerSideNavProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
}

const CoopSideNav: React.FC<PetOwnerSideNavProps> = ({ isOpen, onClose, collapsed = false }) => {
  const [searchParams] = useSearchParams();
  const coopId = searchParams.get("id");

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
        <div className="flex flex-col h-full pt-24 pb-6 overflow-y-auto">
          <Section title="Overview" collapsed={collapsed}>
            <NavLink to="/CoopDashboard" icon={<DashboardSquare02Icon />} collapsed={collapsed} coopId={coopId}>
              Dashboard
            </NavLink>
          </Section>

          <Section title="Coop Management" collapsed={collapsed}>
            <NavLink to="/CoopDashboard/Members" icon={<UserGroupIcon />} collapsed={collapsed} coopId={coopId}>
              Members
            </NavLink>
          </Section>

          <Section title="Insights" collapsed={collapsed}>
            <NavLink to="/CoopDashboard/Analytics" icon={<AnalysisTextLinkIcon />} collapsed={collapsed} coopId={coopId}>
              Analytics
            </NavLink>
            <NavLink to="/CoopDashboard/Transactions" icon={<Invoice03Icon />} collapsed={collapsed} coopId={coopId}>
              Transactions
            </NavLink>
          </Section>

          <Section title="Account" collapsed={collapsed}>
            <NavLink to="/CoopDashboard/Profile" icon={<AccountSetting02Icon />} collapsed={collapsed} coopId={coopId}>
              Settings
            </NavLink>
          </Section>

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

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  collapsed?: boolean;
  coopId?: string | null;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, children, collapsed = false, coopId }) => {
  const fullPath = coopId ? `${to}?id=${coopId}` : to;
  return (
    <Link
      to={fullPath}
      className={`font-sans flex items-center ${collapsed ? "justify-center" : "gap-3"} py-3 px-5 text-gray-600 hover:text-lime-600 hover:bg-lime-400/10 border-l-4 border-transparent hover:border-lime-600 transition-all duration-200`}
    >
      <span className="text-xl">{icon}</span>
      {!collapsed && <span className="text-[14px] font-medium">{children}</span>}
    </Link>
  );
};

export default CoopSideNav;
