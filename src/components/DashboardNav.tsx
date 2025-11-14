import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuHouse, LuLogOut, LuUser } from "react-icons/lu";
import { RxCaretDown } from "react-icons/rx";
import avatar from "../assets/avatar.jpeg";
import logo from "../assets/logo.png";
import orgLogo from "../assets/orgLogo.jpeg";
import orgLogo2 from "../assets/orgLogo2.jpeg";
import orgLogo3 from "../assets/orgLogo3.jpeg";
import { Notification02Icon, Search01Icon, UnfoldMoreIcon } from "hugeicons-react";

interface DashboardNavProps {
  onToggleSidebar: () => void;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ onToggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const cooperatives = [
    { id: 1, name: "Green Planet", image: orgLogo },
    { id: 2, name: "Plant Powered", image: orgLogo2 },
    { id: 2, name: "Garden Society", image: orgLogo3 },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setIsNotifOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotifOpen((prev) => !prev);
    setIsDropdownOpen(false);
  };



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
    <nav className="absolute w-full h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-0 md:pr-8 top-0 z-50">
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
          className="text-2xl font-bold text-lime-500 tracking-tight flex items-center"
        >
          <img src={logo} alt="" className="w-20 h-20"/>
          Farm<span className="text-gray-700">Intel</span>
        </Link>
      </div>

      <div className="bg-[#3a3a3a10] rounded-md px-4 py-2 flex gap-2 items-center w-1/3 max-w-md">
        <Search01Icon size={20} className=" text-black" />
        <input type="text" placeholder="Search" className="outline-0 w-[90%]"/>
      </div>

      <div
        className="relative inline-block"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* MAIN BUTTON */}
        <div className="bg-[#3a3a3a10] rounded-md px-4 py-1 flex gap-3 items-center max-w-md cursor-pointer">
          {/* Overlapping images */}
          <div className="relative flex">
            <img
              src={orgLogo}
              alt=""
              className="w-8 h-8 rounded-full border-2 border-[#3a3a3a10]"
            />
            <img
              src={orgLogo2}
              alt=""
              className="w-8 h-8 rounded-full border-2 border-[#3a3a3a10] -ml-4 z-10"
            />
            <img
              src={orgLogo3}
              alt=""
              className="w-8 h-8 rounded-full border-2 border-[#3a3a3a10] -ml-4 z-10"
            />
          </div>

          <p className="font-medium text-sm text-gray-700">
            Manage Co-operatives
          </p>
          <UnfoldMoreIcon fontSize="small" className="text-gray-600" />
        </div>

        {/* DROPDOWN */}
        {isOpen && (
          <div
            className={`absolute left-0 mt-2 w-72 bg-white shadow-lg rounded-lg border border-gray-100 z-50 transition-all duration-200 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >

            <ul className="max-h-60 overflow-y-auto">
              {cooperatives.map((coop) => (
                <li
                  key={coop.id}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <img
                    src={coop.image}
                    alt={coop.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700 font-medium text-sm">
                    {coop.name}
                  </span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Create new button */}
            <button className="w-full text-center text-sm font-semibold text-lime-600 py-3 hover:bg-lime-50 transition">
              + Create New Cooperative
            </button>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5 relative">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={toggleNotifications}
            className="relative p-2 rounded-md bg-[#3a3a3a10] hover:bg-gray-200 transition"
          >
            <Notification02Icon size={22} />
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
          
            <img
              src={avatar}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border-gray-200"
            />
          

          <p className="hidden sm:block font-medium text-gray-700">
            Hi, Noah
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
