"use client";
import { useState } from "react";
import supabase from "../supabase-client";
import Link from "next/link";
import { FaLeaf } from "react-icons/fa";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`, // Where user sets new password
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({
          type: "success",
          text: "Password reset email sent! Please check your inbox.",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2A1F1F] px-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-6">
        <FaLeaf className="text-[#00BFA5] text-3xl" />
        <span className="text-2xl font-bold text-white">Mangrove Monitor</span>
      </Link>

      {/* Reset Password Card */}
      <div className="w-full max-w-md bg-[#3B2F2F] shadow-lg rounded-2xl p-8 border border-[#00BFA5]/30">
        <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
        <p className="text-gray-300 mb-6">
          Enter your registered email address and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-[#2A1F1F] text-white border border-gray-600 focus:border-[#00BFA5] focus:ring focus:ring-[#00BFA5]/40 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00BFA5] text-white font-semibold py-3 rounded-lg hover:bg-[#00997a] transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Success/Error Messages */}
        {message.text && (
          <p
            className={`mt-4 text-center ${
              message.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Back to Login */}
        <p className="mt-6 text-center text-gray-300">
          Remember your password?{" "}
          <Link href="/login" className="text-[#00BFA5] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
