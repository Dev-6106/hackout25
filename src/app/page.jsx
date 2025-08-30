import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

const page = () => {
  const checkImage = async (url) => {
  try {
    const res = await fetch("/api/check-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: url }),
    });

    const data = await res.json();
    console.log("AI Detection Result:", data.result);
    return data.result;
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
      <HeroSection/> 
    </div>
  );
};

export default page;