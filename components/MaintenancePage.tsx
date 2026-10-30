import React from "react";

export function MaintenancePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#0D0805] text-[#FBF9F5] px-6 py-12 md:py-20 select-none overflow-hidden">
      {/* Ambient warm radial glow in the background (pure CSS gradient, no images) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(140, 103, 71, 0.28) 0%, rgba(20, 12, 8, 0.6) 60%, rgba(13, 8, 5, 1) 100%)"
        }}
        aria-hidden="true"
      />

      {/* Subtle geometric grid background pattern for texture (pure CSS) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
        aria-hidden="true"
      />

      {/* Top Header / Brand Identifier */}
      <header className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-2 md:pt-4">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#20140D]/80 border border-[#8C6747]/30 backdrop-blur-md mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A880] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A880]" />
          </span>
          <span className="text-[11px] md:text-xs font-medium tracking-[0.22em] text-[#C5A880] uppercase">
            Scheduled Maintenance
          </span>
        </div>

        <h1 className="text-xl md:text-2xl tracking-[0.35em] text-[#FBF9F5] uppercase font-light">
          Lake Escape
        </h1>
        <p className="text-[11px] md:text-xs tracking-[0.25em] text-[#C5A880]/90 uppercase mt-1">
          Floating Luxury • Tehri Lake
        </p>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-2xl mx-auto text-center my-auto py-12 md:py-16">
        <div className="inline-block mb-6">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#8C6747] to-transparent mx-auto mb-6" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#FBF9F5] leading-[1.2] mb-6">
          Refining Our Sanctuary
        </h2>

        <p className="text-base sm:text-lg text-[#D4C5B9] font-light leading-relaxed max-w-xl mx-auto mb-10">
          Our digital sanctuary is momentarily paused while we perform scheduled enhancements and system refinements. We look forward to welcoming you back aboard very shortly.
        </p>

        {/* Status Indicators Grid (Text only, no links, no photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-xl mx-auto mb-10">
          <div className="p-4 rounded-xl bg-[#1A100B]/70 border border-[#8C6747]/20 backdrop-blur-sm">
            <span className="block text-[10px] tracking-[0.18em] text-[#8C6747] uppercase font-medium mb-1">
              Status
            </span>
            <span className="block text-sm font-normal text-[#FBF9F5]">
              System Upgrade
            </span>
            <span className="block text-[11px] text-[#A69588] mt-1">
              Active refinement in progress
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#1A100B]/70 border border-[#8C6747]/20 backdrop-blur-sm">
            <span className="block text-[10px] tracking-[0.18em] text-[#8C6747] uppercase font-medium mb-1">
              Location
            </span>
            <span className="block text-sm font-normal text-[#FBF9F5]">
              Tehri Lake, UK
            </span>
            <span className="block text-[11px] text-[#A69588] mt-1">
              Uttarakhand, India
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#1A100B]/70 border border-[#8C6747]/20 backdrop-blur-sm">
            <span className="block text-[10px] tracking-[0.18em] text-[#8C6747] uppercase font-medium mb-1">
              Resumption
            </span>
            <span className="block text-sm font-normal text-[#FBF9F5]">
              Returning Soon
            </span>
            <span className="block text-[11px] text-[#A69588] mt-1">
              Full access restored shortly
            </span>
          </div>
        </div>

        {/* Reassurance Note */}
        <div className="max-w-lg mx-auto p-4 rounded-lg bg-[#140D09]/50 border border-[#8C6747]/15">
          <p className="text-xs sm:text-sm text-[#A69588] font-light leading-relaxed">
            Existing reservations and confirmed guest bookings remain safe, fully secured, and unaffected during this maintenance period.
          </p>
        </div>
      </main>

      {/* Footer (Text only, no links) */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto text-center pt-8 border-t border-[#8C6747]/15">
        <p className="text-xs tracking-wider text-[#A69588] font-light">
          © {new Date().getFullYear()} Lake Escape. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
