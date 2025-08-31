"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Menu, X } from "lucide-react";
import supabase from "../app/supabase-client";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Helper function to fetch public image URL from Supabase Storage
  const getPublicImageUrl = (path) => {
    if (!path) return null;
    const { data } = supabase.storage
      .from("avatars") 
      .getPublicUrl(path);
    return data?.publicUrl || null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // ✅ Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          setLoading(false);
          return;
        }

        setUser(session.user);
        console.log(session.user)

        // ✅ Fetch user profile including avatar path
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("username, avatar_url, mangrove_zone")
          .eq("id", session.user.id)
          .single();

        if (!profileError && profile) {
          console.log(profile)
          setUserProfile(profile);
          // ✅ Convert stored avatar path to public URL
          if (profile.avatar_url) {
            const publicUrl = getPublicImageUrl(profile.avatar_url);
            setAvatarUrl(publicUrl);
          }
          return {"username":profile.id, "url":profile.avatar_url}
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    // ✅ Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setUser(session.user);

        const { data: profile } = await supabase
          .from("users")
          .select("username, avatar_url, mangrove_zone")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setUserProfile(profile);
          if (profile.avatar_url) {
            const publicUrl = getPublicImageUrl(profile.avatar_url);
            setAvatarUrl(publicUrl);
          }
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setUserProfile(null);
        setAvatarUrl(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Reports", href: "/reports" },
    { label: "About", href: "/about" },
    { label: "Contacts", href: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#022B3A] to-[#1B5E20] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-xl font-bold cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              🌿 MangroveGaurd
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className="hover:text-green-300 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
            ) : user && userProfile ? (
              <div className="flex items-center space-x-3">
                {/* ✅ Avatar Image */}
                {avatarUrl ? (
                  <img
                    src={userProfile.avatar_url}
                    alt={userProfile.username || "User avatar"}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${
                        userProfile.username || "User"
                      }&background=00BFA5&color=fff`;
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                )}

                {/* Username */}
                <span className="text-sm font-medium">
                  {userProfile.username || user.email?.split("@")[0]}
                </span>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/auth")}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile User Section */}
              <div className="border-t border-white/20 pt-2 mt-2">
                {user && userProfile ? (
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-3 mb-2">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={userProfile.username || "User avatar"}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${
                              userProfile.username || "User"
                            }&background=00BFA5&color=fff`;
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                          <User className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">
                          {userProfile.username || user.email?.split("@")[0]}
                        </p>
                        <p className="text-xs text-green-300">
                          {userProfile.mangrove_zone || "No zone selected"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600/20 hover:bg-red-600/30 px-3 py-2 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      router.push("/auth");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg transition-colors"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
