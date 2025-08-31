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
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  // Upload to Supabase storage
  // Upload to Supabase storage
  const handleUpload = async () => {
    try {
      setUploading(true);
      if (!file) {
        throw new Error("File not provided");
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB");
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // ✅ Use correct bucket name everywhere (must match Supabase dashboard)
      const { error: uploadError } = await supabase.storage
        .from("avatars") // <-- Make sure this bucket exists
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // ✅ Get the public URL from the SAME bucket
      const { data, error: urlError } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      if (urlError) throw urlError;

      setFileUrl(data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      setMessage(`❌ Error uploading file: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
    }
  };


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

  // Mangrove areas
  const mangroveAreas = [
    { value: "sundarbans-central", label: "Sundarbans Central, West Bengal", state: "West Bengal" },
    { value: "godavari-delta", label: "Godavari Delta, Andhra Pradesh", state: "Andhra Pradesh" },
    { value: "pichavaram", label: "Pichavaram, Tamil Nadu", state: "Tamil Nadu" },
    { value: "andaman-mangroves", label: "Andaman Mangroves", state: "Andaman & Nicobar" },
    { value: "other", label: "Other", state: "Other" },
  ];

  const groupedMangroves = mangroveAreas.reduce((acc, area) => {
    if (!acc[area.state]) acc[area.state] = [];
    acc[area.state].push(area);
    return acc;
  }, {});

  // Fetch user session
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        router.push("/auth");
        return;
      }
      const user = session.user;
      setFormData((prev) => ({ ...prev, email: user.email, auth_id: user.id }));
    };
    checkAuth();
  }, [router]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step validation
  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.username.trim()) {
          setMessage("⚠️ Please enter a username");
          return false;
        }
        if (formData.username.length < 3) {
          setMessage("⚠️ Username must be at least 3 characters");
          return false;
        }
        break;
      case 2:
        // Fixed: Remove any non-digit characters before validation
        const cleanPhone = formData.phone.replace(/\D/g, '');
        if (!/^[0-9]{10}$/.test(cleanPhone)) {
          setMessage("⚠️ Enter a valid 10-digit phone number");
          return false;
        }
        // Update formData with cleaned phone number
        setFormData(prev => ({ ...prev, phone: cleanPhone }));
        break;
      case 3:
        if (!formData.address.trim()) {
          setMessage("⚠️ Enter your address");
          return false;
        }
        if (!formData.mangrove_zone) {
          setMessage("⚠️ Select your nearest mangrove");
          return false;
        }
        break;
    }
    setMessage("");
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  // Submit form
  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setMessage("");

    try {
      // Fixed: Better handling of avatar upload
      let avatarUrl = formData.avatar_url || "";

      if (file && !fileUrl) {
        avatarUrl = await handleUpload();
        if (!avatarUrl) {
          // Upload failed, error message already set by handleUpload
          setLoading(false);
          return;
        }
      } else if (fileUrl) {
        avatarUrl = fileUrl;
      }

      // Re-check authentication before submitting
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("No user found. Please log in again.");

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

  const getMangroveLabel = (value) => {
    const area = mangroveAreas.find((a) => a.value === value);
    return area ? area.label : value;
  };

  // Handle file selection with validation
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        setMessage("⚠️ Please select an image file");
        return;
      }
      // Validate file size (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setMessage("⚠️ File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#022B3A] via-[#1B5E20] to-[#00BFA5] p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#00BFA5] text-white p-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-green-100">Help us personalize your experience</p>
        </div>

        {/* FORM CONTENT */}
        <div className="p-8">
          {/* Step 1 - Username & Profile Pic */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username *</label>
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
                <label className="block text-sm font-medium mb-2">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full"
                />
                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded-full border"
                  />
                )}
              </div>
            </div>
          )}

          {/* Step 2 - Phone */}
          {step === 2 && (
            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="9876543210"
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {/* Step 3 - Address & Mangrove */}
          {step === 3 && (
            <div>
              <label className="block text-sm font-medium mb-2">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter your address"
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <label className="block text-sm font-medium mt-4 mb-2">Nearest Mangrove *</label>
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
          )}

          {/* Step 4 - Review */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><span className="font-medium">Email:</span> {formData.email}</p>
                <p><span className="font-medium">Username:</span> {formData.username}</p>
                <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                <p><span className="font-medium">Address:</span> {formData.address}</p>
                <p><span className="font-medium">Mangrove:</span> {getMangroveLabel(formData.mangrove_zone)}</p>
              </div>
              {file && (
                <div className="mt-4">
                  <p className="font-medium mb-2">Profile Picture:</p>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* Progress indicator */}
          <div className="flex justify-center mt-6 mb-4 space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full transition-colors ${i <= step ? 'bg-green-600' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>

          {/* Messages */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg flex items-center ${message.includes("❌") ? "bg-red-100 text-red-700 border border-red-300"
                  : message.includes("⚠️") ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                    : "bg-green-100 text-green-700 border border-green-300"
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
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || uploading}
                className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {loading || uploading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    {uploading ? "Uploading..." : "Saving..."}
                  </span>
                ) : (
                  <span className="flex items-center">
                    Complete Setup <CheckCircle className="ml-2 w-4 h-4" />
                  </span>
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