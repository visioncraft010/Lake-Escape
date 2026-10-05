"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Calendar, Users, Star, ArrowRight, ShieldCheck, Ship, Sparkles } from "lucide-react";

export function Hero() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("2026-10-15");
  const [checkOut, setCheckOut] = useState("2026-10-17");
  const [guests, setGuests] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
      room: "lake-view-suite"
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <section className="relative pt-20 pb-4 sm:pt-24 sm:pb-6 px-[10px]">
      
      {/* Main Full-Width Hero Card (10px padding from boundaries) */}
      <div className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#2C1A10]/10 bg-[#1A0F0A] flex flex-col justify-between p-5 sm:p-10 lg:p-14">
        
        {/* Landscape Video for Desktop/Tablet */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/views/lake-view.JPG"
          className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-85"
        >
          <source src="/media/hero-desktop-compressed.mp4" type="video/mp4" />
          <source src="/media/showreel.mp4" type="video/mp4" />
        </video>

        {/* Vertical Video for Mobile */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/views/lake-view.JPG"
          className="block sm:hidden absolute inset-0 w-full h-full object-cover opacity-85"
        >
          <source src="/media/hero-mobile-compressed.mp4" type="video/mp4" />
          <source src="/media/showreel.mp4" type="video/mp4" />
        </video>

        {/* Balanced Dark Overlay for crystal clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/35 pointer-events-none" />

        {/* Top Tag & Header Text */}
        <div className="relative z-10 max-w-3xl pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-[#F5EFEB] mb-3 sm:mb-4 border border-white/20">
            <Sparkles size={12} className="text-[#E6DCCE]" />
            <span>A Floating Sanctuary by the Himalayas</span>
          </div>

          <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] tracking-tight mb-3 drop-shadow-md">
            Stay close to<br />the water.
          </h1>

          {/* Rating and guest reviews subline */}
          <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm font-sans mt-2 mb-4">
            <div className="flex text-[#E6DCCE]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-[#E6DCCE] text-[#E6DCCE]" />
              ))}
            </div>
            <span className="font-semibold text-white">4.9</span>
            <span className="text-white/60">·</span>
            <span className="text-white/80">150+ verified guest reviews</span>
          </div>

          <p className="text-white/85 text-xs sm:text-sm max-w-lg leading-relaxed mb-4 hidden sm:block">
            Four architect-designed floating staterooms, secluded mountain coves, wood-fired deck dining, and silent solar cruising on Tehri Lake.
          </p>

          {/* Fast Quick Links */}
          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              href="/boat-experience"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-[11px] font-medium backdrop-blur-sm border border-white/25 transition-all"
            >
              <Ship size={12} />
              <span>Hire My Boat · ₹80k Buyout (12 Max)</span>
            </Link>
            <Link
              href="/rooms"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-[11px] font-medium backdrop-blur-sm border border-white/15 transition-all"
            >
              <span>4 Staterooms from ₹18,999</span>
            </Link>
          </div>
        </div>

        {/* Floating Reservation Bar Docked on Hero (TIDELUNE Inspired) */}
        <div className="relative z-10 w-full max-w-4xl mt-6 sm:mt-8">
          
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl sm:rounded-full p-2.5 sm:p-2 shadow-2xl border border-black/10 grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#2C1A10]/10 items-center"
          >
            {/* Arrival Date */}
            <div className="px-3.5 py-2 sm:py-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                Arrival
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#1A0F0A] outline-none cursor-pointer mt-0.5"
              />
            </div>

            {/* Departure Date */}
            <div className="px-3.5 py-2 sm:py-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                Departure
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#1A0F0A] outline-none cursor-pointer mt-0.5"
              />
            </div>

            {/* Guests Stepper */}
            <div className="px-3.5 py-2 sm:py-1 flex items-center justify-between">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                  Guests
                </label>
                <div className="text-xs sm:text-sm font-semibold text-[#1A0F0A] mt-0.5">
                  {guests} {guests === 1 ? "guest" : "guests"}
                </div>
              </div>
              <div className="flex items-center gap-1 bg-[#F5EFEB] rounded-full p-1 border border-[#2C1A10]/10">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-[#1A0F0A] hover:bg-white transition cursor-pointer"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(10, g + 1))}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-[#1A0F0A] hover:bg-white transition cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Submit Button (High Contrast White Text on Dark Espresso) */}
            <div className="px-2 py-1 flex items-center justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-6 rounded-full bg-[#1A0F0A] hover:bg-[#2C1A10] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Check availability</span>
                <ArrowRight size={14} className="text-white" />
              </button>
            </div>
          </form>

          {/* Subtext under booking bar */}
          <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-white/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-[#E6DCCE]" />
              <span>Flexible cancellation up to 7 days before arrival</span>
            </span>
            <span className="hidden sm:inline text-white/70">
              Complimentary speedboat transfers included
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
