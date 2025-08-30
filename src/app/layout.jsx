"use client";

import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          {/* Sidebar */}
          <Navbar/>

          {/* Main content + footer */}
          <div className="flex flex-col flex-1">
            <main className="flex-1 bg-gray-50 p-6 md:ml-64">
              {children}
            </main>

            {/* Footer aligned with main content */}
            <div className="md:ml-64">
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
