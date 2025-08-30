"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../supabase-client";

const CheckEmailPage = () => {
  const [checking, setChecking] = useState(false);
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let interval;

    const checkVerification = async () => {
      setChecking(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        // If email confirmed, redirect
        if (session.user.email_confirmed_at) {
          setVerified(true);
          clearInterval(interval);
          router.push("/"); // ✅ redirect to homepage
        }
      }
      setChecking(false);
    };

    // Poll every 3s to check if they verified
    interval = setInterval(checkVerification, 3000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 font-sans p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center animate-fadeIn">
        <Mail className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-bounce" />

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          {verified ? "Email Verified 🎉" : "Check Your Email"}
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          {verified
            ? "Your email has been verified! Redirecting you to the homepage..."
            : "We've sent you a confirmation email. Please verify your account to continue."}
        </p>

        {!verified && (
          <Link
            href="/sign"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Return to Login
          </Link>
        )}

        {checking && !verified && (
          <p className="mt-4 text-sm text-gray-500 animate-pulse">
            Checking verification status...
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckEmailPage;