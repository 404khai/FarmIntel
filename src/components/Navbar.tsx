import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.jpeg";
import { getStoredUser, getFirstName, getAvatarUrl } from "../utils/user";
import { logoutUser } from "../utils/auth";
import { RxCaretDown } from "react-icons/rx";
import { LuUser, LuLogOut, LuLayoutDashboard } from "react-icons/lu";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/Login");
  };

  const firstName = getFirstName(user);
  const userAvatar = getAvatarUrl(user) || avatar;

  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-6 z-20">
        <div className="gap-2 flex items-center text-white text-2xl font-semibold tracking-wide">
          <img
            src={logo} 
            alt="Farm background"
            className="w-15 h-15"
          />
          <h2 className="font-mono">FarmIntel</h2>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-white">
          
          <a href="#home" className="font-mono hover:text-lime-400 transition">Home</a>
          <a href="#marketplace" className="font-mono hover:text-lime-400 transition">Cooperatives</a>
          <a href="#pricing" className=" font-mono hover:text-lime-400 transition">Pricing</a>
          <a href="#orgs" className="font-mono hover:text-lime-400 transition">For Organizations</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/SignUp" className="text-white hover:text-lime-400 transition font-mono">Sign Up</Link>
              <Link to="/Login" className="bg-lime-400 text-black font-mono font-medium hover:bg-lime-300 px-5 py-2 rounded-full">
                Login
              </Link>
            </>
          ) : (
            <div
              ref={dropdownRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative flex items-center gap-2 cursor-pointer bg-black/20 p-2 rounded-full pr-4 transition hover:bg-black/30"
            >
              <img
                src={userAvatar}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-white/50"
              />
              <p className="hidden sm:block font-medium text-white font-mono text-sm">
                Hi, {firstName}
              </p>
              <RxCaretDown size={18} className="text-white" />

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 animate-fade-in py-1">
                   <Link
                    to="/FarmerDashboard"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm font-mono"
                  >
                    <LuLayoutDashboard size={16} /> Dashboard
                  </Link>
                  <Link
                    to="/FarmerDashboard/Profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm font-mono"
                  >
                    <LuUser size={16} /> My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500 text-sm font-mono"
                  >
                    <LuLogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
  )
}

export default Navbar
