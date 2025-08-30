"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#3B2F2F] text-white py-10 mt-10 shadow-lgbottom-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#FFD580]">Mangrove Monitor</h2>
          <p className="text-gray-300 mt-3 leading-relaxed">
            Protecting coastal ecosystems through real-time monitoring and community participation.
          </p>
          <div className="flex gap-4 mt-5">
            <a
              href="#"
              className="bg-[#FFD580] text-[#3B2F2F] p-2 rounded-full hover:bg-[#00BFA5] hover:text-white transition"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="bg-[#FFD580] text-[#3B2F2F] p-2 rounded-full hover:bg-[#00BFA5] hover:text-white transition"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="bg-[#FFD580] text-[#3B2F2F] p-2 rounded-full hover:bg-[#00BFA5] hover:text-white transition"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              className="bg-[#FFD580] text-[#3B2F2F] p-2 rounded-full hover:bg-[#00BFA5] hover:text-white transition"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-[#FFD580]">Quick Links</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="#"
                className="hover:text-[#00BFA5] transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#00BFA5] transition duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#00BFA5] transition duration-200"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#00BFA5] transition duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-[#FFD580]">Contact Us</h3>
          <p className="mt-4 text-gray-300">
            🌊 Coastal Research Center, India  
            📞 +91 98765 43210  
            📧 support@mangrovemonitor.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#FFD580] mt-8 pt-5 text-center text-gray-400">
        © {new Date().getFullYear()} Mangrove Monitor. All Rights Reserved.
      </div>
    </footer>
  );
}
