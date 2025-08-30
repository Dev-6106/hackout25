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
  const handleUpload = async () => {
    try {
      setUploading(true);
      if (!file) {
        throw new Error("File not provided");
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("users")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);

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
        if (!formData.username.trim()) return setMessage("⚠️ Please enter a username"), false;
        if (formData.username.length < 3) return setMessage("⚠️ Username must be at least 3 characters"), false;
        break;
      case 2:
        if (!/^[0-9]{10}$/.test(formData.phone)) return setMessage("⚠️ Enter a valid 10-digit phone number"), false;
        break;
      case 3:
        if (!formData.address.trim()) return setMessage("⚠️ Enter your address"), false;
        if (!formData.mangrove_zone) return setMessage("⚠️ Select your nearest mangrove"), false;
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
      let avatarUrl = fileUrl;
      if (file && !fileUrl) {
        avatarUrl = await handleUpload();
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("No user found");

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
                  className="w-full px-3 py-2 rounded-lg border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
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
                className="w-full px-3 py-2 rounded-lg border"
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
                className="w-full px-3 py-2 rounded-lg border"
              />

              <label className="block text-sm font-medium mt-4 mb-2">Nearest Mangrove *</label>
              <select
                name="mangrove_zone"
                value={formData.mangrove_zone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border"
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
              <h2 className="text-xl mb-2">Review Your Information</h2>
              <p><b>Email:</b> {formData.email}</p>
              <p><b>Username:</b> {formData.username}</p>
              <p><b>Phone:</b> {formData.phone}</p>
              <p><b>Address:</b> {formData.address}</p>
              <p><b>Mangrove:</b> {getMangroveLabel(formData.mangrove_zone)}</p>
              {file && (
                <img src={URL.createObjectURL(file)} className="w-24 h-24 rounded-full mt-2" />
              )}
            </div>
          )}

          {/* Messages */}
          {message && (
            <div
              className={`mt-4 p-3 rounded ${
                message.includes("❌") ? "bg-red-100 text-red-700"
                : message.includes("⚠️") ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* NAVIGATION */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="px-4 py-2 border rounded">
                Back
              </button>
            )}
            {step < 4 ? (
              <button onClick={handleNext} className="ml-auto bg-green-600 text-white px-6 py-2 rounded">
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="ml-auto bg-green-600 text-white px-6 py-2 rounded">
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Saving...
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