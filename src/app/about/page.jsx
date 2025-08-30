"use client";
import React from 'react';
import { 
  FaShieldAlt, 
  FaUsers, 
  FaEye, 
  FaAward, 
  FaLeaf, 
  FaFish, 
  FaBullseye, 
  FaTree, 
  FaMobile, 
  FaSms, 
  FaRobot 
} from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* Hero Section */}
        <div className="relative bg-white rounded-3xl p-12 overflow-hidden shadow-lg">
          <div className="absolute top-4 right-4 opacity-10">
            <FaTree size={120} className="text-green-600" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <FaLeaf className="text-green-600 text-2xl" />
              </div>
              <span className="text-green-600 font-medium">Community Conservation</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Save Mangroves
              <span className="block text-green-600">Together</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Join thousands of coastal guardians using AI-powered technology to protect our planet's natural storm barriers. Report, track, and earn rewards for conservation.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-6">
            <div className="bg-green-100 p-4 rounded-full">
              <FaShieldAlt size={32} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Mangrove forests act as natural barriers against storms and are vital for biodiversity 
                and carbon storage, yet they are increasingly threatened by illegal cutting, land reclamation, 
                and pollution. We're building a participatory monitoring system where coastal communities can 
                report incidents and take active roles in conservation.
              </p>
            </div>
          </div>
        </div>

        {/* Platform Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center gap-3 mb-4">
              <FaMobile className="text-green-600 text-2xl" />
              <h3 className="text-xl font-bold text-gray-900">Mobile App</h3>
            </div>
            <p className="text-gray-600">
              Easy-to-use mobile application for quick incident reporting with GPS location and photo upload.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-4">
              <FaSms className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-bold text-gray-900">SMS Reports</h3>
            </div>
            <p className="text-gray-600">
              Report incidents via SMS when internet connectivity is limited in remote coastal areas.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center gap-3 mb-4">
              <FaRobot className="text-purple-600 text-2xl" />
              <h3 className="text-xl font-bold text-gray-900">AI Validation</h3>
            </div>
            <p className="text-gray-600">
              Advanced AI with satellite data integration ensures report accuracy and prevents false alarms.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Protecting 50,000+ hectares of mangroves</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">2,500+</div>
              <div className="text-green-100">Community Members</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">847</div>
              <div className="text-green-100">Active Reports</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">92%</div>
              <div className="text-green-100">Verification Rate</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">23</div>
              <div className="text-green-100">Live Reports</div>
            </div>
          </div>
        </div>

        {/* Who We Serve */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Who We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
              <FaUsers size={40} className="text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Coastal Communities</h3>
              <p className="text-sm text-gray-600">Local residents protecting their environment</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
              <FaFish size={40} className="text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Fishermen</h3>
              <p className="text-sm text-gray-600">Those who depend on healthy mangrove ecosystems</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
              <FaLeaf size={40} className="text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Conservation NGOs</h3>
              <p className="text-sm text-gray-600">Organizations working to preserve nature</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
              <FaBullseye size={40} className="text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Researchers</h3>
              <p className="text-sm text-gray-600">Scientists studying mangrove ecosystems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
