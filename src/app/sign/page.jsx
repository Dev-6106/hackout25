"use client";
import { useState, useEffect } from "react";
import { Mail, Lock, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import supabase from "../supabase-client";

const AuthPage = () => {
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // For Sign In / Sign Up
  const [resetLoading, setResetLoading] = useState(false); // For Forgot Password
  const [message, setMessage] = useState("");

  /** Check if user is already logged in */
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        // router.push("/"); // Redirect to home if logged in
      }
    };
    checkSession();
  }, [router]);

  /** Google Sign-In */
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/dashboard",
        },
      });
      if (error) throw error;
    } catch (err) {
      setMessage(err.message);
    }
  };

  /** Email Sign Up */
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });

      if (error) throw error;
      setMessage("✅ Check your email to confirm your account!");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /** Email Sign In */
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setMessage("✅ Logged in successfully!");
      router.push("/");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /** Forgot Password */
  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("⚠️ Please enter your email to reset password.");
      return;
    }
    setResetLoading(true);
    setMessage("");

    try {

      setMessage("📩 Check your email for the password reset link!");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 font-sans p-4">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-8 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "translate-x-full opacity-100 z-50"
              : "translate-x-0 opacity-0 z-10"
          }`}
        >
          <form
            onSubmit={handleSignUp}
            className="flex flex-col items-center w-full max-w-sm"
          >
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
              Create Account
            </h1>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center space-x-3 w-full justify-center border-2 border-gray-200 py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm mb-6"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={24}
                height={24}
              />
              <span className="text-gray-700 font-medium">
                Sign up with Google
              </span>
            </button>

            <span className="text-sm text-gray-500 mb-6">
              or use your email for registration
            </span>

            {/* Name */}
            <div className="relative w-full mb-4">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-700 bg-gray-100 border-2 border-transparent outline-none focus:border-purple-400 focus:bg-white transition-all duration-200"
                required
              />
            </div>

            {/* Email */}
            <div className="relative w-full mb-4">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-700 bg-gray-100 border-2 border-transparent outline-none focus:border-purple-400 focus:bg-white transition-all duration-200"
                required
              />
            </div>

            {/* Password */}
            <div className="relative w-full mb-6">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-700 bg-gray-100 border-2 border-transparent outline-none focus:border-purple-400 focus:bg-white transition-all duration-200"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-12 py-3 rounded-lg uppercase font-semibold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>

            {message && (
              <p className="text-sm text-center mt-4 text-gray-600">{message}</p>
            )}
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-8 transition-all duration-700 ease-in-out ${
            isSignUp
              ? "translate-x-full opacity-0 z-10"
              : "translate-x-0 opacity-100 z-50"
          }`}
        >
          <form
            onSubmit={handleSignIn}
            className="flex flex-col items-center w-full max-w-sm"
          >
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Sign In</h1>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center space-x-3 w-full justify-center border-2 border-gray-200 py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm mb-6"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={24}
                height={24}
              />
              <span className="text-gray-700 font-medium">
                Sign in with Google
              </span>
            </button>

            <span className="text-sm text-gray-500 mb-6">
              or use your email password
            </span>

            {/* Email */}
            <div className="relative w-full mb-4">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-700 bg-gray-100 border-2 border-transparent outline-none focus:border-purple-400 focus:bg-white transition-all duration-200"
                required
              />
            </div>

            {/* Password */}
            <div className="relative w-full mb-2">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-700 bg-gray-100 border-2 border-transparent outline-none focus:border-purple-400 focus:bg-white transition-all duration-200"
                required
              />
            </div>

            {/* Forgot Password */}
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={resetLoading}
              className="text-sm text-purple-600 hover:underline cursor-pointer mb-4"
            >
              {resetLoading ? "Sending..." : "Forgot Password?"}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-12 py-3 rounded-lg uppercase font-semibold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {message && (
              <p className="text-sm text-center mt-4 text-gray-600">{message}</p>
            )}
          </form>
        </div>

        {/* Toggle Panel */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white flex transition-all duration-700 ease-in-out ${
            isSignUp
              ? "-translate-x-full rounded-r-[30rem] rounded-l-none"
              : "translate-x-0 rounded-l-[30rem] rounded-r-none"
          }`}
        >
          <div className="w-full h-full flex flex-col items-center justify-center px-8 text-center">
            {isSignUp ? (
              <div className="space-y-4">
                <h1 className="text-4xl font-bold">Welcome Back!</h1>
                <p className="text-lg opacity-90 leading-relaxed">
                  Enter your personal details to use all site features
                </p>
                <button
                  onClick={() => setIsSignUp(false)}
                  className="border-2 border-white hover:bg-white hover:text-purple-600 text-white px-10 py-3 rounded-lg uppercase font-semibold tracking-wide mt-6 transition-all duration-200"
                >
                  Sign In
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h1 className="text-4xl font-bold">Hello, Friend!</h1>
                <p className="text-lg opacity-90 leading-relaxed">
                  Register with your personal details to use all site features
                </p>
                <button
                  onClick={() => setIsSignUp(true)}
                  className="border-2 border-white hover:bg-white hover:text-purple-600 text-white px-10 py-3 rounded-lg uppercase font-semibold tracking-wide mt-6 transition-all duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
