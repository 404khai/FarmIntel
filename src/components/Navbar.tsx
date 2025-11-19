import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
 
const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-6 z-20">
        <div className="gap-2 flex items-center text-white text-2xl font-semibold tracking-wide">
          <img
            src={logo} // replace with your image path
            alt="Farm background"
            className="w-15 h-15"
          />
          <h2 className="font-mono">FarmIntel</h2>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-white">
          
          <a href="#home" className="font-mono hover:text-green-400 transition">Home</a>
          <a href="#marketplace" className="font-mono hover:text-green-400 transition">Marketplace</a>
          <a href="#blog" className=" font-mono hover:text-green-400 transition">Blog</a>
          <a href="#community" className="font-mono hover:text-green-400 transition">Community</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/SignUp" className="text-white hover:text-green-400 transition font-mono">Sign Up</Link>
          <Link to="/Login" className="bg-lime-400 text-black font-mono font-medium hover:bg-lime-300 px-5 py-2 rounded-full">
            Login
          </Link>
        </div>
      </nav>
  )
}

export default Navbar

// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi";
// import { RxCaretDown } from "react-icons/rx";
// import { LuLogOut, LuUser, LuLayoutDashboard } from "react-icons/lu";
// import logo from "../assets/logo.png";
// import Button from "./Button";


// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   // ✅ Load user on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   // ✅ Handle outside clicks for sidebar & dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ✅ Logout
//   // const handleLogout = () => {
//   //   logout();
//   //   setUser(null);
//   //   navigate("/home");
//   // };

//   // ✅ Initials for avatar
//   const getInitials = (name: string) => {
//     const parts = name.trim().split(" ");
//     return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0][0];
//   };

//   const fullName = user
//     ? `${user.firstname || ""} ${user.lastname || ""}`.trim() || user.name || "Jane Doe"
//     : "Jane Doe";
//   const initials = getInitials(fullName).toUpperCase();

//   return (
//     <div className="w-full h-20 bg-[#f7f3ed] flex justify-around items-center sticky top-0 z-40 px-4">
//       {/* Logo */}
//       <div className="w-[12%] h-full flex items-center justify-evenly">
//         <img src={logo} alt="VetLink Logo" className="w-20 h-20" />
//         <p className="text-2xl font-semibold">VetLink</p>
//       </div>

//       {/* Links (hidden on mobile) */}
//       <div className="w-[40%] h-full hidden md:flex justify-center gap-20 items-center text-md">
//         <Link to="">Pet Store</Link>
//         <Link to="">Care Tips</Link>
//         <Link to="">Pet Shelter</Link>
//       </div>

//       {/* ✅ Right Section */}
//       <div className="w-fit h-full hidden md:flex items-center justify-evenly relative">
//         {!user ? (
//           <Link to="/Login">
//             <Button width="150px" height="38px" title="Sign In" />
//           </Link>
//         ) : (
//           <div
//             ref={dropdownRef}
//             className="relative flex items-center gap-2 cursor-pointer"
//             onClick={() => setIsDropdownOpen((prev) => !prev)}
//           >
//             {/* Avatar */}
//             <div className="w-9 h-9 rounded-full bg-[#f57d3849] text-[#f57d38] flex items-center justify-center font-semibold">
//               {initials}
//             </div>
//             <p className="font-medium text-gray-700">
//               Hi, {user.firstname || user.name?.split(" ")[0] || "User"}
//             </p>
//             <RxCaretDown size={18} />

//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 animate-fade-in">
//                 <Link
//                   to="/profile"
//                   className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
//                 >
//                   <LuUser size={16} /> My Profile
//                 </Link>
//                 <Link
//                   to={
//                     user.role === "vet"
//                       ? "/VetDashboard"
//                       : "/PetOwnerDashboard"
//                   }
//                   className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
//                 >
//                   <LuLayoutDashboard size={16} /> Dashboard
//                 </Link>
//                 <button
//                   className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500"
//                   onClick={handleLogout}
//                 >
//                   <LuLogOut size={16} /> Log Out
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Hamburger Menu (mobile) */}
//       <div className="flex md:hidden items-center justify-center">
//         {isOpen ? (
//           <FiX
//             className="text-3xl cursor-pointer"
//             onClick={() => setIsOpen(false)}
//           />
//         ) : (
//           <FiMenu
//             className="text-3xl cursor-pointer"
//             onClick={() => setIsOpen(true)}
//           />
//         )}
//       </div>

//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-[#f7f3ed] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col items-center justify-center h-full gap-8 text-lg">
//           <Link to="" onClick={() => setIsOpen(false)} className="hover:underline">
//             Pet Store
//           </Link>
//           <Link to="" onClick={() => setIsOpen(false)} className="hover:underline">
//             Care Tips
//           </Link>
//           <Link to="" onClick={() => setIsOpen(false)} className="hover:underline">
//             Pet Shelter
//           </Link>

//           {!user ? (
//             <Link to="/Login" onClick={() => setIsOpen(false)}>
//               <Button width="150px" height="38px" title="Sign In" />
//             </Link>
//           ) : (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setIsOpen(false);
//               }}
//               className="text-red-500 hover:underline"
//             >
//               Log Out
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Overlay */}
//       {isOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />}
//     </div>
//   );
// };

// export default Navbar;
