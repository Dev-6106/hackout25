"use client";
import { useState, useEffect } from "react";
import { FaLeaf, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import supabase from "../app/supabase-client";

export default function Navbar() {
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

      if (session?.user) {
        fetchUserData(session.user.email);
      }
    };

    getSession();

    // Listen for login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user) {
          fetchUserData(session.user.email);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Fetch username & avatar from "users" table using email
  const fetchUserData = async (email) => {
    const { error,data } = await supabase
      .from("users")
      .select("username, avatar_url")
      .eq("email", email)
      .single();

    // if (error) {
    //   console.error("Error fetching user data:", error.message);
    // } else if (data) {
    //   setUsername(data.username);
    //   setAvatarUrl(data.avatar_url || "/default-avatar.png"); // fallback avatar
    // }
  };

  return (
    <nav className=" bg-[#2B1D1D] text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <FaLeaf className="text-[#00BFA5] text-2xl" />
          <span className="text-xl font-bold tracking-wide">Mangrove Monitor</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-[#00BFA5] transition duration-200">Home</Link>
          <Link href="/dashboard" className="hover:text-[#00BFA5] transition duration-200">Dashboard</Link>
          <Link href="/reports" className="hover:text-[#00BFA5] transition duration-200">Reports</Link>
          <Link href="/about" className="hover:text-[#00BFA5] transition duration-200">About</Link>
          <Link href="/contact" className="hover:text-[#00BFA5] transition duration-200">Contact</Link>
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            // If logged in → Show avatar + username
            <Link
              href="/dashboard"
              className="flex items-center gap-3 cursor-pointer hover:text-[#00BFA5] transition"
            >
              {/* <Image
                src={avatarUrl}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full border border-[#00BFA5]"
              /> */}
              <span className="font-medium">{username || "User"}</span>
            </Link>
          ) : (
            // If logged out → Show Login / Signup buttons
            <>
              <Link
                href="/login"
                className="bg-[#00BFA5] px-4 py-2 rounded-md hover:bg-[#00997a] transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="border border-[#00BFA5] px-4 py-2 rounded-md hover:bg-[#00BFA5] transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#2B1D1D] border-t border-gray-700">
          <div className="flex flex-col items-center gap-5 py-6">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-[#00BFA5]">Home</Link>
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-[#00BFA5]">Dashboard</Link>
            <Link href="/reports" onClick={() => setIsOpen(false)} className="hover:text-[#00BFA5]">Reports</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-[#00BFA5]">About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-[#00BFA5]">Contact</Link>

            {session ? (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 bg-[#00BFA5] px-4 py-2 rounded-md hover:bg-[#00997a] transition"
              >
                <Image
                  src={avatarUrl}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full border border-white"
                />
                <span>{username || "User"}</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#00BFA5] px-4 py-2 rounded-md hover:bg-[#00997a] transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="border border-[#00BFA5] px-4 py-2 rounded-md hover:bg-[#00BFA5] transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
