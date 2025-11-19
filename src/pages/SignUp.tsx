// src/pages/SignUp.tsx
// src/pages/SignUp.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import signupImg from "../assets/signup.jpeg";
import google from "../assets/google.png";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { signupUser } from "../utils/api";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // UI states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await signupUser({ email, password });

      console.log("Signup success", res.data);

      // Redirect to dashboard
      navigate("/CoopDashboard");
    } catch (error: any) {
      console.log(error);
      setErrorMsg(
        error?.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-center w-full min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 rounded-xl p-10 md:h-[450px] font-inter w-full max-w-md"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <img src={logo} alt="logo" className="w-20 h-20" />
          <p className="text-xs font-semibold text-lime-400 px-3 py-2 bg-lime-400/15 rounded-md">
            Create your Account
          </p>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-[60%] rounded-md py-3 bg-[#ffffff] hover:shadow-md transition-all"
        >
          <img src={google} alt="Google" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-800">
            Sign up with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center w-full gap-4 text-[#c7c7c7] my-2">
          <span className="h-px bg-[#8b8b8b] flex-1"></span>
          or
          <span className="h-px bg-[#8b8b8b] flex-1"></span>
        </div>

        {/* Email Field */}
        <div className="relative flex flex-col w-full gap-1">
          <label htmlFor="email" className="text-md font-semibold text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@mail.com"
            className="placeholder-[#b0b0b0] placeholder:text-xs pl-3 pr-3 py-2 bg-[#3a3a3a41] text-white rounded-md outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative flex flex-col w-full gap-1">
          <label htmlFor="password" className="text-md font-semibold text-white">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="input password"
            className="placeholder-[#b0b0b0] placeholder:text-xs pl-3 pr-10 py-2 bg-[#3a3a3a41] text-white rounded-md outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 bottom-2.5 cursor-pointer text-gray-300"
          >
            {showPassword ? <VscEye /> : <VscEyeClosed />}
          </span>
        </div>

        {/* Error message */}
        {errorMsg && (
          <p className="text-red-400 text-sm mt-1">{errorMsg}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex justify-center w-2/5 py-2 mt-2 bg-lime-600 text-white rounded-md hover:scale-105 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-md text-[#8B8E98] mt-2">
          Already have an account?
          <Link to="/Login" className="text-lime-400 ml-1">
            Login
          </Link>
        </p>
      </form>

      {/* Image */}
      <img
        src={signupImg}
        alt="signup"
        className="w-[300px] h-[500px] rounded-4xl hidden md:block"
      />
    </div>
  );
};

export default SignUp;

// import React from "react";
// import { Link } from "react-router-dom";
// //import { VscEyeClosed } from "react-icons/vsc";
// import logo from "../assets/logo.png";
// import signupImg from "../assets/signup.jpeg";
// import google from "../assets/google.png";
// import { VscEyeClosed } from "react-icons/vsc";

// const SignUp: React.FC = () => {
  

//   return (
//     <div className="flex items-center gap-2 justify-center w-full min-h-screen bg-black ">
    
//       <form
        
//         className="flex flex-col items-center justify-center gap-4  rounded-xl p-10 md:h-[450px] font-inter w-full max-w-md"
//       >
//         <div className="flex flex-col items-center justify-center gap-2 text-center">
//           <div className="h-full flex items-center justify-evenly">
//             <img src={logo} alt="VetLink logo" className="w-20 h-20" />
//           </div>
//           <p className="text-xs font-semibold text-lime-400 px-3 py-2 bg-lime-400/15 rounded-md">
//             Create your Account
//           </p>
          
//         </div>

      
//         <button
//           type="button"
//           className="flex items-center justify-center gap-3 w-[60%] rounded-md py-3 bg-[#ffffff] hover:shadow-md transition-all"
//         >
//           <img src={google} alt="Google" className="w-5 h-5" />
//           <span className="text-sm font-medium text-gray-800">
//             Sign up with Google
//           </span>
//         </button>

//         <div className="flex items-center justify-center w-full gap-4 text-[#c7c7c7] my-2">
//           <span className="h-px bg-[#8b8b8b] flex-1"></span>
//           or
//           <span className="h-px bg-[#8b8b8b] flex-1"></span>
//         </div>

//         {/* Email */}
//         <div className="relative flex flex-col w-full gap-1">
//           <label
//             htmlFor="email"
//             className="text-md font-semibold text-[#ffffff]"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             placeholder="name@mail.com"
//             className="placeholder-[#b0b0b0] placeholder:text-xs pl-3 pr-3 py-2 bg-[#3a3a3a41] text-white rounded-md outline-none focus:ring-2 focus:ring-black transition-all duration-300"
//             required
//           />
//         </div>

//         {/* Password */}
// <div className="relative flex flex-col w-full gap-1">
//           <label
//             htmlFor="password"
//             className="text-md font-semibold text-[#ffffff]"
//           >
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             placeholder="input password"
//             className="placeholder-[#b0b0b0] placeholder:text-xs pl-3 pr-3 py-2 bg-[#3a3a3a41] text-white rounded-md outline-none focus:ring-2 focus:ring-black transition-all duration-300"
//             required
//           />
//           <span
            
//             className="absolute right-3 bottom-2.5 cursor-pointer text-gray-600 hover:text-black transition"
//           >
//             <VscEyeClosed className="text-[#efefef]"/> 
//           </span>
//         </div>         

//         {/* Submit */}
//         <Link to="/CoopDashboard"
//           className="flex justify-center w-2/5 py-2 mt-2 p-1 bg-lime-600 text-white rounded-md hover:scale-105 transition-all duration-300"
//         >
//           Sign Up
//         </Link>

      
         

//         {/* Footer */}
//         <p className="text-md text-[#8B8E98] mt-2">
//           Already have an account?
//           <Link to="/Login" className="text-lime-400 ml-1">
//             Login
//           </Link>
//         </p>
//       </form>

//       <img
//         src={signupImg}
//         alt="signup"
//         className="w-[300px] h-[500px] rounded-4xl hidden md:block"
//       />
//     </div>
//   );
// };

// export default SignUp;



