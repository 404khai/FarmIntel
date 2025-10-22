// src/pages/SignUp.tsx
import React from "react";
import { Link } from "react-router-dom";
import { VscEyeClosed } from "react-icons/vsc";
import logo from "../assets/logo.png";
import loginImg from "../assets/login.jpeg";
import google from "../assets/google.png";

const Login: React.FC = () => {
  

  return (
    <div className="flex items-center gap-2 justify-center w-full min-h-screen bg-black ">
    
      <form
        
        className="flex flex-col items-center justify-center gap-4  rounded-xl p-10 md:h-[450px] font-inter w-full max-w-md"
      >
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="h-full flex items-center justify-evenly">
            <img src={logo} alt="VetLink logo" className="w-20 h-20" />
          </div>
          <p className="text-xs font-semibold text-lime-400 p-1 bg-lime-400/15 rounded-md">
            Log into your Account
          </p>
          
        </div>

      
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-[60%] rounded-md py-3 bg-[#ffffff] hover:shadow-md transition-all"
        >
          <img src={google} alt="Google" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-800">
            Sign in with Google
          </span>
        </button>

        <div className="flex items-center justify-center w-full gap-4 text-[#c7c7c7] my-2">
          <span className="h-px bg-[#8b8b8b] flex-1"></span>
          or
          <span className="h-px bg-[#8b8b8b] flex-1"></span>
        </div>

        {/* Email */}
        <div className="relative flex flex-col w-full gap-1">
          <label
            htmlFor="email"
            className="text-md font-semibold text-[#ffffff]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@mail.com"
            className="placeholder-[#b0b0b0] placeholder:text-xs pl-3 pr-3 py-2 bg-[#3a3a3a41] text-white rounded-md outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            required
          />
        </div>

        {/* Password */}
        <div className="relative flex flex-col w-full gap-1">
          <label
            htmlFor="password"
            className="text-md font-semibold text-[#ffffff]"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="input password"
            className="placeholder-[#b0b0b0] placeholder:text-xs pl-3 pr-3 py-2 bg-[#3a3a3a41] text-white rounded-md outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            required
          />
          <span
            
            className="absolute right-3 bottom-2.5 cursor-pointer text-gray-600 hover:text-black transition"
          >
            <VscEyeClosed className="text-[#efefef]"/> 
          </span>
        </div>

        {/* Submit */}
        <Link to="/FarmerDashboard"
          type="submit"
          className="w-2/5 py-2 mt-2 p-1 bg-lime-600 text-white rounded-md hover:scale-105 transition-all duration-300"
        >
          Log In
        </Link>

      
         

        {/* Footer */}
        <p className="text-md text-[#8B8E98] mt-2">
          Don't have an account?
          <Link to="/Signup" className="text-lime-400 ml-1">
            Sign Up
          </Link>
        </p>
      </form>

      <img
        src={loginImg}
        alt="signup"
        className="w-[300px] h-[500px] rounded-4xl hidden md:block"
      />
    </div>
  );
};

export default Login;




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { VscEye, VscEyeClosed } from "react-icons/vsc";
// import logo from '../assets/logo.png'
// import signupImg from "../assets/signup.jpg"; // adjust path as needed
// import google from "../assets/google.png"; // adjust path as needed

// const SignUp: React.FC = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="flex items-center justify-center w-full min-h-screen bg-white px-4">
//       {/* Image (hidden on small screens) */}
//       <img
//         src={signupImg}
//         alt="login"
//         className="w-[400px] hidden md:block"
//       />

//       {/* Form container */}
//       <form className="flex flex-col items-center justify-center gap-4 bg-white rounded-xl p-10 md:h-[400px] font-inter w-full max-w-md">
//         {/* Title */}
//         <div className="flex flex-col items-center justify-center gap-2 text-center">
//           <div className='h-full flex items-center justify-evenly'>
//             <img src={logo} alt="" className='w-20 h-20'/>
//             <p className='text-2xl font-semibold'>VetLink</p>
//           </div>
//           <p className="text-xl font-semibold text-[#212121]">Create your Account</p>
        
//         </div>

//         {/* Email field */}
//         <div className="relative flex flex-col w-full gap-1">
//           <label htmlFor="email" className="text-xs font-semibold text-[#8B8E98]">
//             Email
//           </label>
//           <svg
//             fill="none"
//             viewBox="0 0 24 24"
//             height="20"
//             width="20"
//             xmlns="http://www.w3.org/2000/svg"
//             className="absolute left-3 bottom-2.5 text-gray-400"
//           >
//             <path
//               strokeLinejoin="round"
//               strokeLinecap="round"
//               strokeWidth="1.5"
//               stroke="#141B34"
//               d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
//             ></path>
//             <path
//               strokeLinejoin="round"
//               strokeWidth="1.5"
//               stroke="#141B34"
//               d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
//             ></path>
//           </svg>
//           <input
//             id="email"
//             type="email"
//             placeholder="name@mail.com"
//             className="pl-10 pr-3 py-2 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-black transition-all duration-300"
//             required
//           />
//         </div>

//         {/* Password field */}
//         <div className="relative flex flex-col w-full gap-1">
//           <label htmlFor="password" className="text-xs font-semibold text-[#8B8E98]">
//             Password
//           </label>
//           <svg
//             fill="none"
//             viewBox="0 0 24 24"
//             height="20"
//             width="20"
//             xmlns="http://www.w3.org/2000/svg"
//             className="absolute left-3 bottom-2.5 text-gray-400"
//           >
//             <path
//               strokeLinecap="round"
//               strokeWidth="1.5"
//               stroke="#141B34"
//               d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
//             ></path>
//             <path
//               strokeLinejoin="round"
//               strokeLinecap="round"
//               strokeWidth="1.5"
//               stroke="#141B34"
//               d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
//             ></path>
//           </svg>
//           <input
//             id="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             className="pl-10 pr-10 py-2 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-black transition-all duration-300"
//             required
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 bottom-2.5 cursor-pointer text-gray-600 hover:text-black transition"
//           >
//             {showPassword ? <VscEyeClosed /> : <VscEye />}
//           </span>
//         </div>

//         {/* Login button */}
//         <Link to="/VetDashboard" className="w-full flex justify-center">
//           <button
//             type="submit"
//             className="w-2/5 py-2 mt-2 bg-black text-white rounded-md hover:scale-105 transition-all duration-300"
//           >
//             Sign Up
//           </button>
//         </Link>

//         {/* Forgot password */}
//         {/* <p className="text-xs text-[#8B8E98] mt-2">
//           Forgot Password?{" "}
//           <Link to="/PasswordResetModal" className="text-red-500 underline ml-1">
//             Reset Password
//           </Link>
//         </p> */}

//         {/* OR Separator */}
//         <div className="flex items-center justify-center w-full gap-4 text-gray-400 my-2">
//           <span className="h-px bg-gray-200 flex-1"></span>
//           or
//           <span className="h-px bg-gray-200 flex-1"></span>
//         </div>

//         {/* Google sign-in */}
//         <button
//           type="button"
//           className="flex items-center justify-center gap-3 w-[60%] border border-gray-200 rounded-md py-3 bg-white hover:shadow-md transition-all"
//         >
//           <img src={google} alt="Google" className="w-5 h-5" />
//           <span className="text-sm font-medium text-gray-800">
//             Sign up with Google
//           </span>
//         </button>

//         <p className="text-md text-[#8B8E98] mt-2">
//           Already have an account?{" "}
//           <Link to="/Login" className="text-[#f57d38] ml-1">
//             Login
//           </Link>
//         </p>
//       </form>

      
//     </div>
//   );
// };

// export default SignUp;
