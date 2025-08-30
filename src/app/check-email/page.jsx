"use client";
import { Mail } from "lucide-react";

const CheckEmailPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 font-sans p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">
        <Mail className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Check Your Email
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          We've sent you a confirmation email. Please verify your account to continue.
        </p>
        <a
          href="/"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default CheckEmailPage;
