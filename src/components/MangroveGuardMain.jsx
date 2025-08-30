"use client";
import React, { useState, useEffect } from 'react';
import { 
  Shield, Camera, Trophy, Users, TrendingDown, Clock, 
  ChevronRight, MapPin, AlertTriangle, Phone, Smartphone,
  CheckCircle, BarChart3, Globe, TreePine, Waves,
  Activity, Award, ArrowRight, Satellite, Brain,
  MessageSquare, Target, Zap, Navigation
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MapComponent from "./Map";

const MangroveGuardMain = () => {
  const router = useRouter();
  const [activeReportTab, setActiveReportTab] = useState('live');
  const [hoveredFeature, setHoveredFeature] = useState(null);
  
  // Animated statistics
  const [stats, setStats] = useState({
    mangrovesProtected: 0,
    activeGuardians: 0,
    incidentsResolved: 0,
    responseTime: 0
  });

  // Animate stats on mount
  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      const increment = (end - start) / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 16);
    };

    animateValue(0, 15420, 2000, 'mangrovesProtected');
    animateValue(0, 3842, 2000, 'activeGuardians');
    animateValue(0, 967, 2000, 'incidentsResolved');
    animateValue(0, 4.2, 1500, 'responseTime');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        </div>
        
        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <Waves className="w-full h-32 text-blue-100/30 animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <TreePine className="w-4 h-4 mr-2" />
                Protecting 50,000+ hectares of mangroves
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Save Mangroves
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Together</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Join thousands of coastal guardians using AI-powered technology to protect our planet's natural storm barriers. Report, track, and earn rewards for conservation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/sign')}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
                >
                  Start Reporting
                  <Camera className="ml-2 w-5 h-5" />
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-green-500 hover:text-green-600 transition-all duration-200 flex items-center justify-center"
                >
                  View Live Map
                  <MapPin className="ml-2 w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-green-600" />
                  <span>Mobile App</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>SMS Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span>AI Validation</span>
                </div>
              </div>
            </div>

            {/* Right Content - Interactive Map Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Live Activity</h3>
                  <span className="flex items-center text-sm text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse mr-2"></span>
                    23 Active Reports
                  </span>
                </div>
                
                <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden">
                  {/* Map Placeholder */}
                 <MapComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <TreePine className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.mangrovesProtected.toLocaleString()}</div>
              <div className="text-gray-600 mt-1">Hectares Protected</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.activeGuardians.toLocaleString()}</div>
                            <div className="text-gray-600 mt-1">Active Guardians</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.incidentsResolved}</div>
              <div className="text-gray-600 mt-1">Incidents Resolved</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.responseTime}h</div>
              <div className="text-gray-600 mt-1">Avg Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Conservation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets community action to protect our mangroves
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Multi-Channel Reporting */}
            <div 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200"
              onMouseEnter={() => setHoveredFeature(1)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6 transition-all duration-300 ${
                hoveredFeature === 1 ? 'bg-green-600 scale-110' : 'bg-green-100'
              }`}>
                <MessageSquare className={`w-7 h-7 ${hoveredFeature === 1 ? 'text-white' : 'text-green-600'}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Channel Reporting</h3>
              <p className="text-gray-600 mb-4">
                Report incidents via mobile app, SMS, or web platform. Works even in low-connectivity areas.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Mobile App (iOS/Android)</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> SMS to 1800-MANGROVE</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> WhatsApp Integration</li>
              </ul>
            </div>

            {/* Feature 2: AI Validation */}
            <div 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              onMouseEnter={() => setHoveredFeature(2)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6 transition-all duration-300 ${
                hoveredFeature === 2 ? 'bg-blue-600 scale-110' : 'bg-blue-100'
              }`}>
                <Brain className={`w-7 h-7 ${hoveredFeature === 2 ? 'text-white' : 'text-blue-600'}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Validation</h3>
              <p className="text-gray-600 mb-4">
                Advanced AI analyzes photos and satellite data to verify reports and detect anomalies.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-500 mr-2" /> Image Recognition</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-500 mr-2" /> Satellite Verification</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-blue-500 mr-2" /> Anomaly Detection</li>
              </ul>
            </div>

            {/* Feature 3: Gamification */}
            <div 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200"
              onMouseEnter={() => setHoveredFeature(3)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6 transition-all duration-300 ${
                hoveredFeature === 3 ? 'bg-purple-600 scale-110' : 'bg-purple-100'
              }`}>
                <Trophy className={`w-7 h-7 ${hoveredFeature === 3 ? 'text-white' : 'text-purple-600'}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rewards & Recognition</h3>
              <p className="text-gray-600 mb-4">
                Earn points, badges, and rewards for your conservation efforts. Compete with other guardians.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center"><Check className="w-4 h-4 text-purple-500 mr-2" /> Points System</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-purple-500 mr-2" /> Achievement Badges</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-purple-500 mr-2" /> Monthly Rewards</li>
              </ul>
            </div>

            {/* Feature 4: Real-time Dashboard */}
            <div 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
              onMouseEnter={() => setHoveredFeature(4)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6 transition-all duration-300 ${
                hoveredFeature === 4 ? 'bg-orange-600 scale-110' : 'bg-orange-100'
              }`}>
                <BarChart3 className={`w-7 h-7 ${hoveredFeature === 4 ? 'text-white' : 'text-orange-600'}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authority Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Government officials get real-time insights and alerts for quick action and policy decisions.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center"><Check className="w-4 h-4 text-orange-500 mr-2" /> Live Monitoring</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-orange-500 mr-2" /> Analytics & Reports</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-orange-500 mr-2" /> Alert System</li>
              </ul>
            </div>

            {/* Feature 5: Satellite Integration */}
            <div 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200"
              onMouseEnter={() => setHoveredFeature(5)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6 transition-all duration-300 ${
                hoveredFeature === 5 ? 'bg-teal-600 scale-110' : 'bg-teal-100'
              }`}>
                <Satellite className={`w-7 h-7 ${hoveredFeature === 5 ? 'text-white' : 'text-teal-600'}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Satellite Monitoring</h3>
              <p className="text-gray-600 mb-4">
                Continuous satellite surveillance helps track changes and validate community reports.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center"><Check className="w-4 h-4 text-teal-500 mr-2" /> Daily Updates</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-teal-500 mr-2" /> Change Detection</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-teal-500 mr-2" /> Historical Data</li>
              </ul>
            </div>

            {/* Feature 6: Community Network */}
            <div 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200"
              onMouseEnter={() => setHoveredFeature(6)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg mb-6 transition-all duration-300 ${
                hoveredFeature === 6 ? 'bg-indigo-600 scale-110' : 'bg-indigo-100'
              }`}>
                                <Users className={`w-7 h-7 ${hoveredFeature === 6 ? 'text-white' : 'text-indigo-600'}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Network</h3>
              <p className="text-gray-600 mb-4">
                Connect with fellow guardians, share knowledge, and coordinate conservation efforts.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center"><Check className="w-4 h-4 text-indigo-500 mr-2" /> Local Groups</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-indigo-500 mr-2" /> Knowledge Sharing</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-indigo-500 mr-2" /> Event Coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How MangroveGuard Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to become a guardian and protect our mangroves
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-20 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-green-300 to-blue-300"></div>

            {/* Step 1 */}
            <div className="text-center relative">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10">
                <Camera className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mt-6 mb-3">1. Report</h3>
              <p className="text-gray-600">
                Spot an incident? Take a photo and report via app, SMS, or WhatsApp with location details.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10">
                <Brain className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mt-6 mb-3">2. Validate</h3>
              <p className="text-gray-600">
                AI analyzes your report with satellite data to verify and prioritize the incident.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10">
                <Award className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mt-6 mb-3">3. Earn & Impact</h3>
              <p className="text-gray-600">
                Authorities take action while you earn points, badges, and see your conservation impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Activity Dashboard */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real-time Conservation Activity
            </h2>
            <p className="text-xl text-gray-600">
              See what's happening in mangrove areas right now
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 shadow-xl">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-8">
              <button
                onClick={() => setActiveReportTab('live')}
                className={`flex-1 py-3 rounded-md font-medium transition-all ${
                  activeReportTab === 'live' 
                    ? 'bg-white text-gray-900 shadow' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Live Reports
              </button>
              <button
                onClick={() => setActiveReportTab('stats')}
                className={`flex-1 py-3 rounded-md font-medium transition-all ${
                  activeReportTab === 'stats' 
                    ? 'bg-white text-gray-900 shadow' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Impact Stats
              </button>
              <button
                onClick={() => setActiveReportTab('leaderboard')}
                className={`flex-1 py-3 rounded-md font-medium transition-all ${
                  activeReportTab === 'leaderboard' 
                    ? 'bg-white text-gray-900 shadow' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Top Guardians
              </button>
            </div>

            {/* Tab Content */}
            {activeReportTab === 'live' && (
              <div className="space-y-4">
                {[
                  { type: 'cutting', location: 'Sundarbans West', time: '5 min ago', status: 'investigating', severity: 'high' },
                                    { type: 'pollution', location: 'Bhitarkanika', time: '23 min ago', status: 'resolved', severity: 'medium' },
                  { type: 'encroachment', location: 'Mumbai Mangroves', time: '1 hour ago', status: 'pending', severity: 'high' },
                  { type: 'dumping', location: 'Pichavaram', time: '2 hours ago', status: 'investigating', severity: 'low' }
                ].map((report, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-all">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        report.severity === 'high' ? 'bg-red-100' : 
                        report.severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <AlertTriangle className={`w-6 h-6 ${
                          report.severity === 'high' ? 'text-red-600' : 
                          report.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 capitalize">{report.type} Detected</h4>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {report.location} • {report.time}
                        </p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      report.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeReportTab === 'stats' && (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Illegal Cutting</h4>
                    <TrendingDown className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-red-600">-45%</p>
                  <p className="text-sm text-gray-600 mt-2">vs. last month</p>
                  <div className="mt-4 bg-gray-100 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Pollution Reports</h4>
                    <Activity className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-3xl font-bold text-yellow-600">+23%</p>
                  <p className="text-sm text-gray-600 mt-2">vs. last month</p>
                  <div className="mt-4 bg-gray-100 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Response Rate</h4>
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-blue-600">92%</p>
                  <p className="text-sm text-gray-600 mt-2">within 24 hours</p>
                  <div className="mt-4 bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            )}

            {activeReportTab === 'leaderboard' && (
              <div className="space-y-4">
                {[
                  { rank: 1, name: 'Maria Santos', points: 2450, reports: 89, badge: '🥇', trend: 'up' },
                  { rank: 2, name: 'Ravi Kumar', points: 2120, reports: 76, badge: '🥈', trend: 'up' },
                  { rank: 3, name: 'Priya Patel', points: 1890, reports: 65, badge: '🥉', trend: 'down' },
                  { rank: 4, name: 'Ahmed Khan', points: 1650, reports: 54, badge: '🏅', trend: 'up' },
                  { rank: 5, name: 'Lakshmi R.', points: 1420, reports: 48, badge: '🏅', trend: 'same' }
                ].map((guardian) => (
                  <div key={guardian.rank} className="bg-white rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{guardian.badge}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{guardian.name}</h4>
                        <p className="text-sm text-gray-600">{guardian.reports} verified reports</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{guardian.points.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 flex items-center justify-end">
                        points
                        {guardian.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500 ml-1" />}
                        {guardian.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500 ml-1" />}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-10"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Movement to Save Our Mangroves
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Every report matters. Every guardian counts. Together, we can protect our coastal ecosystems for future generations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/auth')}
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Become a Guardian
            </button>
            <button
              onClick={() => router.push('/partner')}
              className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white hover:text-green-600 transition-all duration-200"
            >
              Partner With Us
            </button>
          </div>

          <div className="mt-12 flex justify-center items-center space-x-8 text-white">
                        <div className="text-center">
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-sm text-green-100">Hectares Protected</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">98%</p>
              <p className="text-sm text-green-100">Report Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm text-green-100">Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-lg text-gray-600">
              Working together with NGOs, government bodies, and research institutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {['WWF', 'UN Environment', 'Forest Department', 'Marine Institute'].map((partner, index) => (
              <div key={index} className="bg-white rounded-lg p-6 flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-gray-400 font-semibold">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30"></div>
            
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Get the MangroveGuard App
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Report on the go, track your impact, and connect with fellow guardians. 
                  Available for iOS and Android.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Download for iOS
                  </button>
                  <button className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Download for Android
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl h-64 flex items-center justify-center">
                    <Smartphone className="w-32 h-32 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper component for check marks
const Check = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// Helper component for trending icons
const TrendingUp = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export default MangroveGuardMain;