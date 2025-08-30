"use client";
import React, { useState } from 'react';
import { 
  FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaClock, FaUsers, FaLeaf, FaExclamationTriangle 
} from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">

        {/* Header */}
        <div className="text-center">
          <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
            <FaPhone size={40} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions about our platform? Want to partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaEnvelope size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">support@mangrovemonitor.com</p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaPhone size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                {/* Address */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaMapMarkerAlt size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">Coastal Research Center, Mumbai, India</p>
                  </div>
                </div>
                {/* Office Hours */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaClock size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Office Hours</p>
                    <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                <FaExclamationTriangle />
                Emergency Hotline
              </h3>
              <p className="text-red-700 mb-3">
                For urgent environmental threats requiring immediate attention:
              </p>
              <div className="bg-red-500 border border-red-400 rounded-lg p-4">
                <p className="text-white font-bold text-lg">🚨 Emergency: +91 98765 00000</p>
                <p className="text-red-100 text-sm mt-1">Available 24/7 for critical incidents</p>
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Regional Offices</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span className="text-gray-700">Mumbai, Maharashtra</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span className="text-gray-700">Goa, Goa</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span className="text-gray-700">Kochi, Kerala</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-900 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-900 font-medium mb-2">Email</label>
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
              <div>
                <label className="block text-gray-900 font-medium mb-2">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select a subject...</option>
                  <option value="general">General Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="support">Technical Support</option>
                  <option value="research">Research Collaboration</option>
                  <option value="media">Media Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-900 font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Partners Section */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Partners</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <FaUsers className="text-green-600 text-3xl mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">Government Forestry Departments</h3>
              <p className="text-sm text-gray-600 mt-2">Policy enforcement and regulatory support</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <FaLeaf className="text-blue-600 text-3xl mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">Conservation Organizations</h3>
              <p className="text-sm text-gray-600 mt-2">Research and conservation expertise</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <FaGlobe className="text-green-600 text-3xl mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">Technology Partners</h3>
              <p className="text-sm text-gray-600 mt-2">AI and satellite data integration</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
