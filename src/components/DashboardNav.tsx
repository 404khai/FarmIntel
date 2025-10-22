import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuHouse, LuLogOut, LuUser, LuBell } from "react-icons/lu";
import { RxCaretDown } from "react-icons/rx";

interface DashboardNavProps {
  onToggleSidebar: () => void;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // ✅ Load user info from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setIsNotifOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotifOpen((prev) => !prev);
    setIsDropdownOpen(false);
  };

  // ✅ Get user's initials (if no profile image)
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`
      : parts[0][0];
  };

  // ✅ Combine firstname + lastname
  const fullName = user
  ? `${user.firstname || ""} ${user.lastname || ""}`.trim() || user.name || "Jane Doe"
  : "Jane Doe";

  const initials = fullName
    ? getInitials(fullName).toUpperCase()
    : "JD";

  const imageUrl = user?.imageUrl;


  // ✅ Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setIsDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setIsNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="absolute w-full h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 md:hidden"
        >
          <HiOutlineMenuAlt2 size={26} />
        </button>
        <Link
          to="/home"
          className="text-2xl font-bold text-[#f57d38] tracking-tight"
        >
          Vet<span className="text-gray-700">Link</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5 relative">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={toggleNotifications}
            className="relative p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
          >
            <LuBell size={22} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 animate-fade-in">
              <div className="p-3 border-b font-semibold text-gray-700">
                Notifications
              </div>
              <div className="max-h-60 overflow-y-auto">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="p-3 border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <p className="text-sm text-gray-700">
                      Appointment confirmed with client #{i + 1}.
                    </p>
                    <p className="text-xs text-gray-400">5m ago</p>
                  </div>
                ))}
              </div>
              <Link
                to="/notifications"
                className="block text-center py-2 text-[#f57d38] hover:bg-emerald-50 rounded-b-lg font-medium"
              >
                View all
              </Link>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div
          ref={dropdownRef}
          onClick={toggleDropdown}
          className="relative flex items-center gap-2 cursor-pointer"
        >
          {/* ✅ Profile Image OR Initials */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#f57d3849] text-[#f57d38] flex items-center justify-center font-semibold">
              {initials}
            </div>
          )}

          <p className="hidden sm:block font-medium text-gray-700">
          Hi, {user ? user.name?.split(" ")[0] : "Jane"}
        </p>

          <RxCaretDown size={18} />

          {isDropdownOpen && (
            <div className="absolute right-0 mt-50 w-48 bg-white rounded-lg shadow-lg z-50 animate-fade-in">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                <LuUser size={16} /> My Profile
              </Link>
              <Link
                to="/home"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                <LuHouse size={16} /> Back to Home
              </Link>
              <button
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500"
                onClick={handleLogout}
              >
                <LuLogOut size={16} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
