import React from "react";

export function MaintenancePage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center bg-[#0d0805] text-[#fbf9f5] px-6 py-16 text-center select-none">
      {/* Top Brand Name */}
      <div className="w-full max-w-xl mx-auto pt-4">
        <h1 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-[#fbf9f5]">
          Lake Escape
        </h1>
        <p className="text-xs tracking-[0.2em] uppercase text-[#c5a880] mt-2">
          Tehri Lake, Uttarakhand
        </p>
      </div>

      {/* Main Message - purely text, no buttons, no cards */}
      <div className="w-full max-w-xl mx-auto my-auto py-12">
        <div className="w-12 h-px bg-[#8c6747] mx-auto mb-8 opacity-60" />
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#fbf9f5] mb-6">
          Website Under Maintenance
        </h2>

        <p className="text-base sm:text-lg font-light text-[#d4c5b9] leading-relaxed max-w-md mx-auto">
          We are currently undergoing scheduled maintenance and system updates.
        </p>
        
        <p className="text-sm sm:text-base font-light text-[#a69588] leading-relaxed max-w-md mx-auto mt-4">
          Our website will be back online shortly. Thank you for your patience.
        </p>

        <div className="w-12 h-px bg-[#8c6747] mx-auto mt-8 opacity-60" />
      </div>

      {/* Bottom Minimal Copyright */}
      <div className="w-full max-w-xl mx-auto pb-4">
        <p className="text-xs font-light tracking-wider text-[#7a6a5d]">
          © {new Date().getFullYear()} Lake Escape. All rights reserved.
        </p>
      </div>
    </div>
  );
}
