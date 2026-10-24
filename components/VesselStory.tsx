"use client";

import Image from "next/image";
import { Sparkles, Wind } from "lucide-react";
import { vesselSpecs } from "@/lib/data";

export function VesselStory() {
  return (
    <section
      id="vessel"
      className="relative w-full bg-[#0d1b22] py-14 sm:py-24 md:py-32 px-6 sm:px-12 overflow-hidden text-white border-b border-white/[0.12]"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#081218] via-[#0d1b22] to-[#081218] opacity-90" />

      <div className="relative z-10 max-w-[1380px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="font-sans text-[12px] font-semibold text-slate-400 uppercase tracking-[-0.01em] block mb-2">
            Architecture & Design
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.035em]">
            The Floating Resort
          </h2>
        </div>

        {/* 3-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6 lg:pr-6 order-2 lg:order-1">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles size={15} className="text-slate-400" />
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[-0.01em]">Stateroom Sanctuary</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-[-0.025em]">
                Crafted without compromise
              </h3>
              <p className="font-sans text-sm font-normal text-slate-300 tracking-[-0.01em] leading-relaxed">
                Every square inch of Lake Escape is engineered as a private floating sanctuary. Hand-carved cedar interiors, acoustic glass dampening water sounds, and private observation decks on every suite.
              </p>
            </div>

            <div className="border-t border-white/[0.12] pt-5 space-y-3">
              <div className="flex items-center justify-between font-sans text-xs font-semibold tracking-[-0.01em] text-slate-400">
                <span>Suites Capacity</span>
                <span className="text-white font-bold">4 Staterooms</span>
              </div>
              <div className="flex items-center justify-between font-sans text-xs font-semibold tracking-[-0.01em] text-slate-400">
                <span>Total Length</span>
                <span className="text-white font-bold">32 Meters</span>
              </div>
              <div className="flex items-center justify-between font-sans text-xs font-semibold tracking-[-0.01em] text-slate-400">
                <span>Observation Decks</span>
                <span className="text-white font-bold">3 Levels</span>
              </div>
            </div>
          </div>

          {/* Center Column: Boat Architectural Image */}
          <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-xl overflow-hidden border border-white/15 shadow-2xl group">
              <Image
                src="/images/rooms/suite-room/Suite Room Interior - 1.JPG"
                alt="Lake Escape Luxury Floating Resort Stateroom"
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081218]/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between">
                <div>
                  <span className="font-sans text-[11px] font-semibold text-slate-300 uppercase block tracking-[-0.01em]">Flagship Experience</span>
                  <span className="font-heading text-base font-bold text-white tracking-[-0.02em]">Lake Escape I</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6 lg:pl-6 order-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-300">
                <Wind size={15} className="text-slate-400" />
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[-0.01em]">Hydro-Anchorage</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-[-0.025em]">
                Silent eco propulsion
              </h3>
              <p className="font-sans text-sm font-normal text-slate-300 tracking-[-0.01em] leading-relaxed">
                Anchored in the calmest sheltered bays of Tehri Lake. Powered by clean solar battery storage and eco-hybrid propulsion, ensuring absolute zero vibration and stillness throughout your stay.
              </p>
            </div>

            <div className="border-t border-white/[0.12] pt-5 space-y-3">
              <div className="flex items-center justify-between font-sans text-xs font-semibold tracking-[-0.01em] text-slate-400">
                <span>Connectivity</span>
                <span className="text-white font-bold">Starlink Maritime</span>
              </div>
              <div className="flex items-center justify-between font-sans text-xs font-semibold tracking-[-0.01em] text-slate-400">
                <span>Private Chef</span>
                <span className="text-white font-bold">On-Board Dedicated</span>
              </div>
              <div className="flex items-center justify-between font-sans text-xs font-semibold tracking-[-0.01em] text-slate-400">
                <span>Water Transfers</span>
                <span className="text-white font-bold">VIP Speedboat Included</span>
              </div>
            </div>

          </div>

        </div>

        {/* Vessel Specs Grid Strip */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 border-t border-white/[0.12] pt-6 sm:pt-8">
          {vesselSpecs.map((spec) => (
            <div key={spec.label} className="p-3 sm:p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <span className="font-sans text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase block mb-1 tracking-[-0.01em]">
                {spec.label}
              </span>
              <p className="font-sans text-[11px] sm:text-xs font-bold text-white tracking-[-0.01em] leading-tight">
                {spec.value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
