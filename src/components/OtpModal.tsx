// src/components/OtpModal.tsx
import { useState } from "react";
import { verifyOtp, requestOtp } from "../utils/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OtpModal({ email, close }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    setLoading(true);
    const load = toast.loading("Verifying...");

    try {
      await verifyOtp({ email, code: otp });

      toast.dismiss(load);
      toast.success("OTP Verified!");

      close();
      navigate("/FarmerDashboard");
    } catch (err: any) {
      toast.dismiss(load);
      toast.error(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await requestOtp(email);
      toast.success("OTP resent!");
    } catch {
      toast.error("Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h3 className="text-xl font-bold mb-3 text-center">Verify Email</h3>

        <p className="text-sm text-gray-500 text-center mb-4">
          Enter the OTP sent to <strong>{email}</strong>
        </p>

        <input
          type="text"
          placeholder="6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 border rounded mb-3 text-center tracking-widest"
        />

        <button
          disabled={loading}
          onClick={handleVerify}
          className="w-full bg-lime-600 text-white py-2 rounded mb-3 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          disabled={resending}
          onClick={handleResend}
          className="w-full text-lime-600 underline py-2 text-sm disabled:opacity-50"
        >
          {resending ? "Sending..." : "Resend OTP"}
        </button>

        <button
          onClick={close}
          className="w-full text-gray-600 py-2 mt-2 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
