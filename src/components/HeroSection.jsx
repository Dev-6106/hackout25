import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/photo-1520333764090-778d6dc95ec3.jpg')" }}
      ></div>

      {/* Black Overlay Mask */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Main Title */}
        <p className="text-white/60 text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-center drop-shadow-lg">
          GUARDIANS OF THE MANGROVE
        </p>

        {/* Tagline */}
        <p className="text-green-200/70 text-lg md:text-2xl font-medium text-center mt-4 drop-shadow">
          Join the Movement to Protect Our Coastal Forests
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
