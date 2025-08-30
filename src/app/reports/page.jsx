// 'use client';

// export default function ReportPage() {
//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-no-repeat"
      
//     >
//       {/* Overlay to make text readable */}
//       <div className="bg-green-900/40 min-h-screen px-6 py-10 pt-24">
//         {/* Page Heading */}
//         <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-50 text-center drop-shadow-lg">
//           Submit a Report
//         </h1>
//         <p className="text-green-100 mb-10 text-center text-lg md:text-xl max-w-2xl mx-auto drop-shadow">
//           Use this form to quickly submit a report. (This is a demo form, no backend connected yet.)
//         </p>

//         {/* Report Form */}
//         <form className="bg-green-50 shadow-lg rounded-2xl p-8 max-w-lg mx-auto border border-green-200">
//           <h2 className="text-2xl font-semibold mb-6 text-green-800 text-center">Report Form</h2>

//           {/* Title */}
//           <div className="mb-4">
//             <label className="block text-green-700 font-medium mb-2">Report Title</label>
//             <input
//               type="text"
//               placeholder="Enter report title"
//               className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-100"
//             />
//           </div>

//           {/* Category */}
//           <div className="mb-4">
//             <label className="block text-green-700 font-medium mb-2">Category</label>
//             <select className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-100">
//               <option>Bug</option>
//               <option>Feedback</option>
//               <option>System Issue</option>
//               <option>Other</option>
//             </select>
//           </div>

//           {/* Description */}
//           <div className="mb-4">
//             <label className="block text-green-700 font-medium mb-2">Description</label>
//             <textarea
//               rows="4"
//               placeholder="Describe the issue or feedback..."
//               className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-100"
//             ></textarea>
//           </div>

//           {/* File Upload */}
//           <div className="mb-6">
//             <label className="block text-green-700 font-medium mb-2">Attach Screenshot (optional)</label>
//             <input
//               type="file"
//               className="w-full border border-green-300 rounded-lg px-3 py-2 bg-green-100 cursor-pointer"
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="button"
//             onClick={() => alert("Report submitted (demo only)!")}
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition shadow-md"
//           >
//             Submit Report
//           </button>
//         </form>

//         {/* Motivation Section */}
//         <div className="mt-12 text-center text-green-50">
//           <p className="mb-2 font-medium">Empower your community and help protect mangroves!</p>
//           <p>Track illegal activities, submit reports, and contribute to conservation.</p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState, useRef } from 'react';
import { 
  FaCamera, 
  FaMapMarkerAlt, 
  FaUpload, 
  FaShieldAlt, 
  FaAward, 
  FaExclamationTriangle, 
  FaChevronRight 
} from 'react-icons/fa';

export default function ReportsPage() {
  const [formData, setFormData] = useState({
    incidentType: '',
    location: '',
    description: '',
    name: '',
    email: '',
    phone: '',
    urgency: 'medium'
  });

  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Report submitted successfully! Our team will review it shortly.');
    setFormData({
      incidentType: '',
      location: '',
      description: '',
      name: '',
      email: '',
      phone: '',
      urgency: 'medium'
    });
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Header */}
        <div className="text-center">
          <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
            <FaCamera size={40} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Start Reporting</h1>
          <p className="text-gray-600 text-lg">
            Help protect our mangrove forests by reporting suspicious activities or environmental threats.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-gray-900">847</div>
            <div className="text-gray-600 text-sm">Total Reports</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-gray-600 text-sm">Verified Reports</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">48hrs</div>
            <div className="text-gray-600 text-sm">Avg Response Time</div>
          </div>
        </div>

        {/* Report Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-6">

          {/* Incident Type */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3">Type of Incident *</label>
            <select
              name="incidentType"
              value={formData.incidentType}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
              required
            >
              <option value="">Select incident type...</option>
              <option value="illegal-cutting">🪓 Illegal Mangrove Cutting</option>
              <option value="dumping">🗑️ Waste Dumping</option>
              <option value="land-reclamation">🏗️ Unauthorized Land Reclamation</option>
              <option value="pollution">☠️ Water/Soil Pollution</option>
              <option value="wildlife-disturbance">🐦 Wildlife Disturbance</option>
              <option value="fires">🔥 Uncontrolled Fires</option>
              <option value="other">❓ Other</option>
            </select>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3">Urgency Level *</label>
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 rounded-lg border-2 border-transparent hover:border-green-200 transition-colors">
                <input
                  type="radio"
                  name="urgency"
                  value="low"
                  checked={formData.urgency === 'low'}
                  onChange={handleInputChange}
                  className="text-green-600"
                />
                <span className="text-green-600 font-medium">🟢 Low</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 rounded-lg border-2 border-transparent hover:border-yellow-200 transition-colors">
                <input
                  type="radio"
                  name="urgency"
                  value="medium"
                  checked={formData.urgency === 'medium'}
                  onChange={handleInputChange}
                  className="text-yellow-600"
                />
                <span className="text-yellow-600 font-medium">🟡 Medium</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 rounded-lg border-2 border-transparent hover:border-red-200 transition-colors">
                <input
                  type="radio"
                  name="urgency"
                  value="high"
                  checked={formData.urgency === 'high'}
                  onChange={handleInputChange}
                  className="text-red-600"
                />
                <span className="text-red-600 font-medium">🔴 High</span>
              </label>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3">Location *</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-4 text-green-500" size={20} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location, coordinates, or nearby landmarks"
                className="w-full pl-12 p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">💡 Tip: Enable GPS for automatic location detection</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what you observed"
              rows="5"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-gray-900 font-semibold mb-3">Upload Evidence</label>
            <div
              className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center bg-white hover:bg-green-50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <FaUpload size={48} className="text-green-400 mx-auto mb-4" />
              <p className="text-green-600 font-medium">Click to upload photos or drag and drop</p>
              <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG files up to 10MB each</p>
            </div>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg"
            />
            {files.length > 0 && (
              <p className="text-sm text-gray-700 mt-2">{files.length} file(s) selected</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                required
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number (Optional)"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
          >
            <FaShieldAlt size={24} />
            Submit Report
            <FaChevronRight size={20} />
          </button>
        </form>

        {/* Gamification Section */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <FaAward className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Earn Rewards for Reporting!</h3>
              <p className="text-gray-700">
                Each verified report earns you conservation points. Climb the leaderboard and unlock exclusive 
                badges while helping protect our precious mangrove ecosystems.
              </p>
              <div className="flex gap-4 mt-3">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  +100 points per report
                </span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Unlock badges
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Reporting Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">✅ What to Report</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Illegal mangrove cutting or removal</li>
                <li>• Unauthorized construction in mangrove areas</li>
                <li>• Pollution or waste dumping</li>
                <li>• Wildlife disturbance or poaching</li>
                <li>• Uncontrolled fires near mangroves</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">📋 Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Include clear, well-lit photos</li>
                <li>• Provide accurate location details</li>
                <li>• Report incidents as soon as possible</li>
                <li>• Include date and time of observation</li>
                <li>• Stay safe - don't confront violators</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <FaExclamationTriangle className="text-red-600 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-red-800 mb-2">Emergency Situations</h3>
              <p className="text-red-700 mb-3">
                For immediate threats requiring urgent attention, call our emergency hotline:
              </p>
              <div className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg inline-block">
                🚨 Emergency: +91 98765 00000
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
