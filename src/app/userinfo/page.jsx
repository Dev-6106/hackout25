"use client";
import { useState, useEffect } from "react";
import { User, Phone, MapPin, Trees, Camera, ChevronRight, Loader2, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import supabase from "../supabase-client";

const ProfileSetupPage = () => {
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    // Form data - Added email field
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        phone: "",
        address: "",
        nearest_mangrove: "",
        avatar_url: "",
        auth_id:""
    });

    // Mangrove areas data
    const mangroveAreas = [
        // West Bengal
        { value: "sundarbans-central", label: "Sundarbans Central, West Bengal", state: "West Bengal" },
        { value: "sundarbans-east", label: "Sundarbans East, West Bengal", state: "West Bengal" },
        { value: "sundarbans-west", label: "Sundarbans West, West Bengal", state: "West Bengal" },
        { value: "sagar-island", label: "Sagar Island Mangroves, West Bengal", state: "West Bengal" },

        // Odisha
        { value: "bhitarkanika", label: "Bhitarkanika, Odisha", state: "Odisha" },
        { value: "gahirmatha", label: "Gahirmatha Coast, Odisha", state: "Odisha" },
        { value: "mahanadi-delta", label: "Mahanadi Delta, Odisha", state: "Odisha" },

        // Maharashtra
        { value: "mumbai-mangroves", label: "Mumbai Mangroves, Maharashtra", state: "Maharashtra" },
        { value: "thane-creek", label: "Thane Creek, Maharashtra", state: "Maharashtra" },
        { value: "raigad-coast", label: "Raigad Coast, Maharashtra", state: "Maharashtra" },

        // Gujarat
        { value: "kutch-mangroves", label: "Kutch Mangroves, Gujarat", state: "Gujarat" },
        { value: "gulf-of-khambhat", label: "Gulf of Khambhat, Gujarat", state: "Gujarat" },

        // Andhra Pradesh
        { value: "godavari-delta", label: "Godavari Delta, Andhra Pradesh", state: "Andhra Pradesh" },
        { value: "krishna-estuary", label: "Krishna Estuary, Andhra Pradesh", state: "Andhra Pradesh" },

        // Tamil Nadu
        { value: "pichavaram", label: "Pichavaram, Tamil Nadu", state: "Tamil Nadu" },
        { value: "muthupet", label: "Muthupet, Tamil Nadu", state: "Tamil Nadu" },

        // Andaman & Nicobar
        { value: "andaman-mangroves", label: "Andaman Mangroves", state: "Andaman & Nicobar" },

        // Kerala
        { value: "kerala-backwaters", label: "Kerala Backwater Mangroves", state: "Kerala" },

        // Other
        { value: "other", label: "Other", state: "Other" }
    ];

    // Group mangroves by state
    const groupedMangroves = mangroveAreas.reduce((acc, area) => {
        if (!acc[area.state]) acc[area.state] = [];
        acc[area.state].push(area);
        return acc;
    }, {});

    // Check if user is authenticated and get email
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/auth");
            } else {
                // Store the user's email
                setFormData(prev => ({ ...prev, email: session.user.email }));
            }
        };
        checkAuth();
    }, [router]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle avatar upload
    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingAvatar(true);
        setMessage("");

        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user found");

            // Upload to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}_${Date.now()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
            setMessage("✅ Avatar uploaded successfully!");
        } catch (err) {
            setMessage(`❌ Error uploading avatar: ${err.message}`);
        } finally {
            setUploadingAvatar(false);
        }
    };

    // Validate current step
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
                if (!formData.phone) {
                    setMessage("⚠️ Please enter your phone number");
                    return false;
                }
                if (!/^[0-9]{10}$/.test(formData.phone)) {
                    setMessage("⚠️ Please enter a valid 10-digit phone number");
                    return false;
                }
                break;
            case 3:
                if (!formData.address.trim()) {
                    setMessage("⚠️ Please enter your address");
                    return false;
                }
                if (!formData.nearest_mangrove) {
                    setMessage("⚠️ Please select the nearest mangrove area");
                    return false;
                }
                break;
        }
        setMessage("");
        return true;
    };

    // Handle next step
    const handleNext = () => {
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    // Handle form submission - Updated to include email
    // Handle form submission - Updated to use upsert
    // Handle form submission - Updated to work with RLS
    const handleSubmit = async () => {
        if (!validateStep()) return;

        setLoading(true);
        setMessage("");

        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user found");

            // Upsert user data (insert or update if email already exists)
            const { error } = await supabase
                .from('user')
                .upsert(
                    {
                        id: user.id, // important for RLS
                        email: user.email,
                        username: formData.username,
                        phone: parseInt(formData.phone),
                        address: formData.address,
                        nearest_mangrove: formData.nearest_mangrove,
                        avatar_url: formData.avatar_url || null,
                        auth_id: user.id
                    },
                    { onConflict: 'email' } // Use email as unique key for conflict resolution
                );

            if (error) throw error;

            setMessage("✅ Profile saved successfully!");
            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);
        } catch (err) {
            setMessage(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
 


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#022B3A] via-[#1B5E20] to-[#00BFA5] p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#1B5E20] to-[#00BFA5] text-white p-8">
                    <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
                    <p className="text-green-100">Help us personalize your MangroveGuard experience</p>

                    {/* Progress Bar */}
                    <div className="mt-6 relative">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm">Step {step} of 4</span>
                            <span className="text-sm">{Math.round((step / 4) * 100)}% Complete</span>
                        </div>
                        <div className="w-full bg-green-900 bg-opacity-30 rounded-full h-2">
                            <div
                                className="bg-white rounded-full h-2 transition-all duration-500"
                                style={{ width: `${(step / 4) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                    {/* Step 1: Username & Avatar */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mx-auto">
                                        {formData.avatar_url ? (
                                            <Image
                                                src={formData.avatar_url}
                                                alt="Avatar"
                                                width={128}
                                                height={128}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Camera className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <label className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition">
                                        <Camera className="w-4 h-4" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarUpload}
                                            className="hidden"
                                            disabled={uploadingAvatar}
                                        />
                                    </label>
                                </div>
                                {uploadingAvatar && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        <Loader2 className="inline w-4 h-4 animate-spin mr-1" />
                                        Uploading...
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Choose a Username *
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Enter your username"
                                        className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-700 bg-gray-50 border-2 border-transparent outline-none focus:border-green-500 focus:bg-white transition-all duration-200"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    This will be your unique identifier on MangroveGuard
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Phone */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Phone className="w-10 h-10 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
                                <p className="text-gray-600 mt-2">We'll use this for important alerts</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-600 font-medium">+91</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="9876543210"
                                        maxLength="10"
                                        className="w-full pl-16 pr-4 py-3 rounded-lg text-gray-700 bg-gray-50 border-2 border-transparent outline-none focus:border-green-500 focus:bg-white transition-all duration-200"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    For SMS alerts and emergency contact
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Location */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-10 h-10 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-900">Location Details</h2>
                                <p className="text-gray-600 mt-2">Help us understand your area better</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address *
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter your complete address"
                                        rows="3"
                                        className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-700 bg-gray-50 border-2 border-transparent outline-none focus:border-green-500 focus:bg-white transition-all duration-200 resize-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nearest Mangrove Area *
                                </label>
                                <div className="relative">
                                    <Trees className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <select
                                        name="nearest_mangrove"
                                        value={formData.nearest_mangrove}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-700 bg-gray-50 border-2 border-transparent outline-none focus:border-green-500 focus:bg-white transition-all duration-200 appearance-none"
                                    >
                                        <option value="">Select nearest mangrove area</option>
                                        {Object.entries(groupedMangroves).map(([state, areas]) => (
                                            <optgroup key={state} label={state}>
                                                {areas.map(area => (
                                                    <option key={area.value} value={area.value}>
                                                        {area.label}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    This helps us show relevant reports and alerts
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review & Submit */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-900">Review Your Information</h2>
                                <p className="text-gray-600 mt-2">Please confirm your details before proceeding</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                                {formData.avatar_url && (
                                    <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                                        <Image
                                            src={formData.avatar_url}
                                            alt="Avatar"
                                            width={60}
                                            height={60}
                                            className="rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-sm text-gray-600">Profile Picture</p>
                                            <p className="font-medium">Uploaded</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Email</span>
                                    <span className="font-medium">{formData.email}</span>
                                </div>

                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Username</span>
                                    <span className="font-medium">{formData.username}</span>
                                </div>

                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Phone</span>
                                    <span className="font-medium">+91 {formData.phone}</span>
                                </div>

                                <div className="py-2">
                                    <span className="text-gray-600">Address</span>
                                    <p className="font-medium mt-1">{formData.address}</p>
                                </div>

                                <div className="py-2">
                                    <span className="text-gray-600">Nearest Mangrove</span>
                                    <p className="font-medium mt-1">
                                        {mangroveAreas.find(area => area.value === formData.nearest_mangrove)?.label}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    By completing your profile, you agree to participate in MangroveGuard's
                                    community-driven conservation efforts and allow us to send you important
                                    alerts about mangrove protection in your area.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Error/Success Messages */}
                    {message && (
                        <div className={`mt-4 p-4 rounded-lg text-sm ${message.includes('❌') ? 'bg-red-50 text-red-800' :
                            message.includes('⚠️') ? 'bg-yellow-50 text-yellow-800' :
                                'bg-green-50 text-green-800'
                            }`}>
                            {message}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                            >
                                Back
                            </button>
                        )}

                        {step < 4 ? (
                            <button
                                onClick={handleNext}
                                className="ml-auto bg-gradient-to-r from-[#1B5E20] to-[#00BFA5] hover:from-[#166534] hover:to-[#00A78D] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                            >
                                Next
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="ml-auto bg-gradient-to-r from-[#1B5E20] to-[#00BFA5] hover:from-[#166534] hover:to-[#00A78D] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                                        Creating Profile...
                                    </>
                                ) : (
                                    <>
                                        Complete Setup
                                        <CheckCircle className="ml-2 w-5 h-5" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {/* Skip for now option (only on step 1) */}
                    {step === 1 && (
                        <div className="text-center mt-4">
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                                Skip for now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSetupPage;