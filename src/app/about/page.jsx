
"use client";
import React from 'react';
import { FaShieldAlt, FaUsers, FaEye, FaAward, FaLeaf, FaFish, FaBullseye, FaTree } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B1D1D] via-[#3B2F2F] to-[#2B1D1D] pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#00BFA5]/10 via-[#FFD580]/10 to-[#00BFA5]/10 rounded-3xl p-12 overflow-hidden border border-[#00BFA5]/20">
          <div className="absolute top-4 right-4 opacity-20">
            <FaTree size={120} className="text-[#00BFA5]" />
          </div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-white mb-6">
              Community Mangrove Watch
            </h1>
            <p className="text-xl text-[#FFD580] leading-relaxed max-w-3xl">
              Empowering coastal communities to protect and monitor mangrove forests through
              participatory conservation, real-time reporting, and AI-assisted validation.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-[#3B2F2F] rounded-2xl p-8 shadow-lg border border-[#00BFA5]/30">
          <div className="flex items-start gap-6">
            <div className="bg-[#00BFA5]/20 p-4 rounded-full border border-[#00BFA5]">
              <FaShieldAlt size={32} className="text-[#00BFA5]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Mangrove forests serve as natural barriers against storms and are vital for biodiversity
                and carbon storage. Yet they face increasing threats from illegal cutting, land reclamation,
                and pollution. We're building a participatory monitoring system that enables communities
                to become guardians of these critical ecosystems.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works & Key Features (Combined and arranged side-by-side) */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* How It Works Section - Now on the left */}
          <div className="bg-[#3B2F2F] rounded-2xl p-8 shadow-lg border border-[#FFD580]/30">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-1 gap-8"> {/* Changed to 1 column for vertical stacking on smaller screens */}
              <div className="text-center">
                <div className="bg-[#00BFA5] p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Report Incidents</h3>
                <p className="text-gray-300">
                  Spot illegal activities or environmental threats? Report them instantly with photos and location data.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#FFD580] p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#2B1D1D]">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AI Verification</h3>
                <p className="text-gray-300">
                  Our AI system validates reports using satellite imagery and machine learning algorithms.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#00BFA5] p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Take Action</h3>
                <p className="text-gray-300">
                  Verified reports are sent to authorities for immediate action while you earn conservation points.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features Section - Now on the right */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8"> {/* Changed to 2 columns for a more compact look */}
              <div className="bg-gradient-to-br from-[#00BFA5] to-[#00997a] rounded-2xl p-8 text-white shadow-lg">
                <FaLeaf size={40} className="mb-6" />
                <h3 className="text-xl font-bold mb-4">Geotagged Reporting</h3>
                <p className="text-[#00BFA5]/90">
                  Submit incidents with precise location data and photographic evidence
                  for accurate monitoring and rapid response.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#FFD580] to-[#FFC107] rounded-2xl p-8 text-[#2B1D1D] shadow-lg">
                <FaEye size={40} className="mb-6" />
                <h3 className="text-xl font-bold mb-4">AI Validation</h3>
                <p className="text-[#2B1D1D]/80">
                  Advanced AI algorithms verify reports using satellite data and
                  image analysis to ensure accuracy and prevent false alarms.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#00BFA5] to-[#26A69A] rounded-2xl p-8 text-white shadow-lg md:col-span-2"> {/* Made this span 2 columns for better balance if 2 columns are used */}
                <FaAward size={40} className="mb-6" />
                <h3 className="text-xl font-bold mb-4">Gamified Engagement</h3>
                <p className="text-[#00BFA5]/90">
                  Earn points, climb leaderboards, and unlock rewards for active
                  participation in mangrove conservation efforts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats and Who We Serve (Combined and arranged below the previous section) */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Impact Stats */}
          <div className="bg-gradient-to-r from-[#00BFA5] to-[#26A69A] rounded-2xl p-8 text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">Making a Real Impact</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2 text-[#FFD580]">2,500+</div>
                <div className="text-white/90">Community Members</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2 text-[#FFD580]">850</div>
                <div className="text-white/90">Reports Submitted</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2 text-[#FFD580]">12,000</div>
                <div className="text-white/90">Acres Protected</div>
              </div>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="bg-[#3B2F2F] rounded-2xl p-8 shadow-lg border border-[#00BFA5]/30">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Who We Serve</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6"> {/* Changed to 2 columns for a more compact look */}
              <div className="text-center p-6 bg-[#00BFA5]/10 rounded-xl border border-[#00BFA5]/30">
                <FaUsers size={40} className="text-[#00BFA5] mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Coastal Communities</h3>
                <p className="text-sm text-gray-300">Local residents protecting their environment</p>
              </div>
              <div className="text-center p-6 bg-[#FFD580]/10 rounded-xl border border-[#FFD580]/30">
                <FaFish size={40} className="text-[#FFD580] mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Fishermen</h3>
                <p className="text-sm text-gray-300">Those who depend on healthy mangrove ecosystems</p>
              </div>
              <div className="text-center p-6 bg-[#00BFA5]/10 rounded-xl border border-[#00BFA5]/30">
                <FaLeaf size={40} className="text-[#00BFA5] mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Conservation NGOs</h3>
                <p className="text-sm text-gray-300">Organizations working to preserve nature</p>
              </div>
              <div className="text-center p-6 bg-[#FFD580]/10 rounded-xl border border-[#FFD580]/30">
                <FaBullseye size={40} className="text-[#FFD580] mx-auto mb-4" />
                <h3 className="font-bold text-white mb-2">Researchers</h3>
                <p className="text-sm text-gray-300">Scientists studying mangrove ecosystems</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-r from-[#FFD580]/20 to-[#00BFA5]/20 rounded-2xl p-8 border border-[#FFD580]/30">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              A world where every coastal community is empowered to protect their mangrove forests,
              where technology serves conservation, and where collective action creates lasting
              environmental change. Together, we're building a sustainable future for our oceans
              and the communities that depend on them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}