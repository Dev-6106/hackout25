"use client";
import { useState, useEffect } from "react";
import { FaLeaf, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import supabase from "../app/supabase-client";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    // Check current session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user) fetchUserData(session.user.email);
    };

    getSession();

    // Listen for login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) fetchUserData(session.user.email);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchUserData = async (email) => {
    const { data, error } = await supabase
      .from("users")
      .select("username, avatar_url")
      .eq("email", email)
      .single();

    if (!error && data) {
      setUsername(data.username);
      setAvatarUrl(data.avatar_url || "/default-avatar.png");
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 text-white bg-[#2B1D1D] p-2 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#2B1D1D] text-white shadow-lg z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-6 py-4 border-b border-gray-700">
            <FaLeaf className="text-[#00BFA5] text-2xl" />
            <span className="text-xl font-bold tracking-wide">Mangrove Monitor</span>
          </Link>

          {/* Menu Links */}
          <nav className="flex-1 flex flex-col px-6 py-4 gap-4">
            <Link href="/" className="hover:text-[#00BFA5] transition duration-200">Home</Link>
            <Link href="/dashboard" className="hover:text-[#00BFA5] transition duration-200">Dashboard</Link>
            <Link href="/reports" className="hover:text-[#00BFA5] transition duration-200">Reports</Link>
            <Link href="/about" className="hover:text-[#00BFA5] transition duration-200">About</Link>
            <Link href="/contact" className="hover:text-[#00BFA5] transition duration-200">Contact</Link>
          </nav>

          {/* Auth Section */}
          <div className="px-6 py-4 border-t border-gray-700">
            {session ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-3 cursor-pointer hover:text-[#00BFA5] transition"
              >
                {avatarUrl && (
                  <Image
                    src={avatarUrl}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full border border-[#00BFA5]"
                  />
                )}

                <span className="font-medium">{username || "User"}</span>
              </Link>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="bg-[#00BFA5] px-4 py-2 rounded-md text-center hover:bg-[#00997a] transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="border border-[#00BFA5] px-4 py-2 rounded-md text-center hover:bg-[#00BFA5] transition"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
