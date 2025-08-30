"use client";
import { useState, useEffect } from "react";
import { FaLeaf, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import supabase from "../app/supabase-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);      // Mobile menu
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/public/3135715.png"); // ✅ Default backup image
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown for user menu
  const router = useRouter();

  // 🔹 Check session + subscribe to auth changes
  useEffect(() => {
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

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user) {
          fetchUserData(session.user.email);
        } else {
          setUsername("");
          setAvatarUrl("/public/3135715.png");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔹 Fetch username & avatar from `users` table
  const fetchUserData = async (email) => {
    const { data, error } = await supabase
      .from("users")
      .select("username, avatar_url")
      .eq("email", email)
      .single();

    if (!error && data) {
      setUsername(data.username);
      // if avatar URL is missing, fall back
      setAvatarUrl(data.avatar_url || "/3135715.png");
    }
  };

  // 🔹 Logout logic
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUsername("");
    setAvatarUrl("/public/3135715.png");
    router.push("/sign");
  };

  return (
    <nav className="bg-[#2B1D1D] text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <FaLeaf className="text-[#00BFA5] text-2xl" />
          <span className="text-xl font-bold tracking-wide">Mangrove Monitor</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-[#00BFA5]">Home</Link>
          <Link href="/dashboard" className="hover:text-[#00BFA5]">Dashboard</Link>
          <Link href="/reports" className="hover:text-[#00BFA5]">Reports</Link>
          <Link href="/about" className="hover:text-[#00BFA5]">About</Link>
          <Link href="/contact" className="hover:text-[#00BFA5]">Contact</Link>
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4 relative">
          {session ? (
            // 🔹 If logged in → Show avatar + username with dropdown
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={avatarUrl || "/public/3135715.png"}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full border border-[#00BFA5]"
                  onError={() => setAvatarUrl("/public/3135715.png")} // ✅ fallback
                />
                <span className="font-medium">{username || "User"}</span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // If logged out → Show Login / Signup
            <>
              <Link
                href="/sign"
                className="bg-[#00BFA5] px-4 py-2 rounded-md hover:bg-[#00997a] transition"
              >
                Login
              </Link>
              <Link
                href="/sign"
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
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 bg-[#00BFA5] px-4 py-2 rounded-md hover:bg-[#00997a]"
                >
                  <Image
                    src={avatarUrl || "/public/3135715.png"}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full border border-white"
                    onError={() => setAvatarUrl("/public/3135715.png")} // ✅ fallback
                  />
                  <span>{username || "User"}</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#00BFA5] px-4 py-2 rounded-md hover:bg-[#00997a] transition"
                >
                  Login
                </Link>
                <Link
                  href="/sign"
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