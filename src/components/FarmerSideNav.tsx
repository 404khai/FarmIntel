import React from "react";
import { Link } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuCalendarRange,
  LuDog,
  LuSettings,
  LuCreditCard,
  LuMessageSquare,
  LuCircleHelp,
} from "react-icons/lu";

interface PetOwnerSideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const FarmerSideNav: React.FC<PetOwnerSideNavProps> = ({ isOpen, onClose }) => {
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
          <Section title="Dashboard">
            <NavLink to="/FarmerDashboard" icon={<LuLayoutDashboard />}>
              Dashboard
            </NavLink>
          </Section>

          {/* --- APPOINTMENTS SECTION --- */}
          <Section title="Appointments">
            <NavLink to="/PetOwnerDashboard/PetOwnerAppointments" icon={<LuCalendarRange />}>
              Appointments
            </NavLink>
            <NavLink to="/PetOwnerDashboard/PetOwnerPetsPage" icon={<LuDog />}>
              Pets
            </NavLink>
          </Section>

          {/* --- ACCOUNT SECTION --- */}
          <Section title="Account">
            <NavLink to="/vet/profile" icon={<LuSettings />}>
              Settings
            </NavLink>
            <NavLink to="/vet/payments" icon={<LuCreditCard />}>
              Payments
            </NavLink>
            <NavLink to="/vet/reviews" icon={<LuMessageSquare />}>
              Reviews
            </NavLink>
          </Section>

          {/* --- SUPPORT SECTION --- */}
          <Section title="Support">
            <NavLink to="/vet/support" icon={<LuCircleHelp />}>
              Help Center
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
    <p className="pl-5 text-lime-600 font-semibold text-sm uppercase tracking-wide mb-2">
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
    className="flex items-center gap-3 py-3 px-5 text-gray-600 hover:text-lime-600 hover:bg-lime-400/10 border-l-4 border-transparent hover:border-lime-600 transition-all duration-200"
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[15px] font-medium">{children}</span>
  </Link>
);

export default FarmerSideNav;
