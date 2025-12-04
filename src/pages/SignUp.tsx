// src/pages/SignUp.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import signupImg from "../assets/signup.jpeg";
import google from "../assets/google.png";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { registerUser } from "../utils/auth";
import toast from "react-hot-toast";
import OtpModal from "../components/OtpModal";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerUser({ email, password });
      toast.success(res.data.message);

      // Show OTP modal
      setEmailForOtp(email);
      setShowOtpModal(true);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Signup failed. Try again.";
      toast.error(msg);
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
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <img src={logo} alt="logo" className="w-20 h-20" />
          <p className="text-xs font-semibold text-lime-400 px-3 py-2 bg-lime-400/15 rounded-md">
            Create your Account
          </p>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-[60%] rounded-md py-3 bg-white hover:shadow-md transition-all"
        >
          <img src={google} alt="Google" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-800">
            Sign up with Google
          </span>
        </button>

        <div className="flex items-center justify-center w-full gap-4 text-gray-400 my-2">
          <span className="h-px bg-gray-600 flex-1"></span> or
          <span className="h-px bg-gray-600 flex-1"></span>
        </div>

        {/* Email */}
        <div className="relative flex flex-col w-full gap-1">
          <label className="text-md font-semibold text-white">Email</label>
          <input
            type="email"
            placeholder="name@mail.com"
            className="placeholder-gray-400 text-white pl-3 py-2 bg-gray-700/40 rounded-md outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="relative flex flex-col w-full gap-1">
          <label className="text-md font-semibold text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="input password"
            className="placeholder-gray-400 text-white pl-3 pr-10 py-2 bg-gray-700/40 rounded-md outline-none"
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

        <button
          type="submit"
          disabled={loading}
          className="flex justify-center w-2/5 py-2 mt-2 bg-lime-600 text-white rounded-md hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-md text-gray-400 mt-2">
          Already have an account?
          <Link to="/Login" className="text-lime-400 ml-1">
            Login
          </Link>
        </p>
      </form>

      <img
        src={signupImg}
        alt="signup"
        className="w-[300px] h-[500px] rounded-4xl hidden md:block"
      />

      {showOtpModal && (
        <OtpModal email={emailForOtp} close={() => setShowOtpModal(false)} />
      )}
    </div>
  );
};

export default SignUp;
