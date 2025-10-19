// src/components/PartnersSlider.jsx
import React from "react";
import "./PartnersSlider.css"; // You need to create this CSS file

const PARTNER_LOGOS = [
  "Group-4unief_logo.svg",
  "Group-3NRC_logo.svg",
  "Group-7DWB_logo.svg",
  "waau-1waau_logo.svg",
  "all_hands_logo.svg",
  "Group-9kiddo_logo.svg",
  "Group-10artesans.svg",
  "ualifeline.png",
];

const PartnersSlider = () => {
  // We duplicate the logos list to ensure seamless, infinite scrolling
  const extendedLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    // The container with 'overflow-x-auto' allows mouse/touch scrolling
    // 'whitespace-nowrap' prevents the logos from wrapping to the next line
    <div
      className="relative w-full overflow-x-auto bg-white py-8 shadow-inner rounded-xl group"
      style={{
        // Enable scroll snapping for better mobile experience (optional)
        scrollSnapType: "x mandatory",
        // Hide scrollbar on Chrome/Safari/Edge/Opera
        msOverflowStyle: "none" /* IE and Edge */,
        scrollbarWidth: "none" /* Firefox */,
      }}
    >
      {/* Simple CSS to hide scrollbar in modern browsers */}
      <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

      {/* The Track element is responsible for the automatic animation */}
      <div
        className="slider-track flex space-x-8"
        // Set a fixed width that is twice the minimum size to contain both sets of logos
        style={{ width: `${extendedLogos.length * 160}px` }}
      >
        {extendedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-42 h-60 flex items-center justify-center p-2"
            style={{ scrollSnapAlign: "start" }} // Snap point for scrolling
          >
            <img
              src={`/assets/${logo}`} // Use correct path
              alt={`Partner ${index + 1}`}
              className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersSlider;
