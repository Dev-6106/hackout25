"use client";
import { useState, useEffect } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import supabase from "../supabase-client";

const ProfileSetupPage = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    address: "",
    mangrove_zone: "",
    auth_id: "",
    avatar_url: "",
  });

  const [profilePic, setProfilePic] = useState(null); // temporary file before upload
  const [previewUrl, setPreviewUrl] = useState(null); // for preview

  // Mangrove areas data
  const mangroveAreas = [
    { value: "sundarbans-central", label: "Sundarbans Central, West Bengal", state: "West Bengal" },
    { value: "godavari-delta", label: "Godavari Delta, Andhra Pradesh", state: "Andhra Pradesh" },
    { value: "pichavaram", label: "Pichavaram, Tamil Nadu", state: "Tamil Nadu" },
    { value: "andaman-mangroves", label: "Andaman Mangroves", state: "Andaman & Nicobar" },
    { value: "other", label: "Other", state: "Other" },
  ];

  // Group mangroves by state
  const groupedMangroves = mangroveAreas.reduce((acc, area) => {
    if (!acc[area.state]) acc[area.state] = [];
    acc[area.state].push(area);
    return acc;
  }, {});

  // Fetch user session
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || !session) {
        router.push("/auth");
        return;
      }
      const user = session.user;
      setFormData((prev) => ({ ...prev, email: user.email, auth_id: user.id }));
    };
    checkAuth();
  }, [router]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Validation
  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.username.trim())
          return setMessage("⚠️ Please enter a username"), false;
        if (formData.username.length < 3)
          return setMessage("⚠️ Username must be at least 3 characters"), false;
        break;
      case 2:
        if (!/^[0-9]{10}$/.test(formData.phone))
          return setMessage("⚠️ Enter a valid 10-digit phone number"), false;
        break;
      case 3:
        if (!formData.address.trim())
          return setMessage("⚠️ Enter your address"), false;
        if (!formData.mangrove_zone)
          return setMessage("⚠️ Select your nearest mangrove"), false;
        break;
    }
    setMessage("");
    return true;
  };

  // Next button
  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  // Submit form
  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("No user found");

      let avatarUrl = formData.avatar_url;

      // If new profile picture selected
      if (profilePic) {
        const uploadData = new FormData();
        uploadData.append("file", profilePic);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const data = await res.json();
        if (data.url) {
          avatarUrl = data.url; // Cloudinary final URL
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Save to Supabase
      const { error } = await supabase.from("users").upsert(
        {
          id: user.id,
          email: user.email,
          username: formData.username,
          phone: formData.phone,
          address: formData.address,
          mangrove_zone: formData.mangrove_zone,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) throw error;

      setMessage("✅ Profile saved successfully!");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Get mangrove label for review
  const getMangroveLabel = (value) => {
    const area = mangroveAreas.find((a) => a.value === value);
    return area ? area.label : value;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#022B3A] via-[#1B5E20] to-[#00BFA5] p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#00BFA5] text-white p-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-green-100">Help us personalize your experience</p>
        </div>

        {/* PROGRESS INDICATOR */}
        <div className="px-8 pt-6">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${i <= step
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-400"
                    }`}
                >
                  {i}
                </div>
                {i < 4 && (
                  <div
                    className={`w-16 h-1 ${i < step ? "bg-green-600" : "bg-gray-200"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="p-8 pt-0">
          {/* Step 1 - Username & Profile Pic */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Phone */}
          {step === 2 && (
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="9876543210"
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500 mt-1">Enter 10-digit mobile number</p>
            </div>
          )}

          {/* Step 3 - Address & Mangrove */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter your complete address"
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Nearest Mangrove Area *
                </label>
                <select
                  name="mangrove_zone"
                  value={formData.mangrove_zone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select nearest mangrove</option>
                  {Object.entries(groupedMangroves).map(([state, areas]) => (
                    <optgroup key={state} label={state}>
                      {areas.map((area) => (
                        <option key={area.value} value={area.value}>
                          {area.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 4 - Review */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>
                  <span className="font-medium">Email:</span> {formData.email}
                </p>
                <p>
                  <span className="font-medium">Username:</span> {formData.username}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {formData.phone}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {formData.address}
                </p>
                <p>
                  <span className="font-medium">Mangrove Area:</span> {getMangroveLabel(formData.mangrove_zone)}
                </p>
                {previewUrl && (
                  <div className="mt-3">
                    <span className="font-medium">Profile Picture:</span>
                    <img
                      src={previewUrl}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full mt-2 border-2 border-gray-300"
                    />
                  </div>
                )}
                <div className="mt-3">
                  <span className="font-medium">Profile Picture:</span>
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-full mt-2 border-2 border-gray-300"
                  />
                </div>
                ) 
              </div>
            </div>
          )}

          {/* Messages */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg flex items-center ${message.includes("❌")
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : message.includes("⚠️")
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    : "bg-green-100 text-green-700 border border-green-200"
                }`}
            >
              {message}
            </div>
          )}

          {/* NAVIGATION */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`ml-auto px-6 py-2 rounded-lg transition-colors flex items-center ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <CheckCircle className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;