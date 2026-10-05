"use client";

import Image from "next/image";
import Link from "next/link";
import { Ship, ShieldCheck, Zap, Compass, ArrowRight, CheckCircle2, Wind, Eye } from "lucide-react";

const specs = [
  { label: "Vessel Type", value: "Luxury Floating Catamaran" },
  { label: "Overall Length", value: "85 Feet (26 Metres)" },
  { label: "Beam / Width", value: "28 Feet (8.5 Metres)" },
  { label: "Cruising Waterway", value: "Tehri Lake, Uttarakhand" },
  { label: "Guest Capacity", value: "4 Private Staterooms (Up to 12 Guests)" },
  { label: "Decks", value: "2 (Lounge Deck & 360° Rooftop Deck)" },
  { label: "Propulsion & Grid", value: "Hybrid Silent Solar Grid & Eco-Drive" },
  { label: "Communications", value: "High-Speed Starlink Maritime Satellite" },
  { label: "Speedboat Transfers", value: "Twin High-Speed Launch Included" }
];

export default function VesselPage() {
  return (
    <main className="bg-[#FBF9F5] text-[#1A0F0A] min-h-screen pt-24 pb-20 px-[10px]">
      <div className="max-w-[1360px] mx-auto space-y-16">

        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EFEB] text-[10px] font-bold uppercase tracking-wider text-[#8C6747] mb-3 border border-[#2C1A10]/10">
            <Ship size={12} />
            <span>Vessel Architecture & Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-[#1A0F0A] leading-[1.08] mb-4">
            A floating sanctuary<br />
            <span className="text-[#8C6747]">in Tehri Lake.</span>
          </h1>

          <p className="text-xs sm:text-base text-[#1A0F0A]/80 max-w-xl mx-auto leading-relaxed font-normal">
            Lake Escape is an 85-foot bespoke floating retreat engineered for the pristine waters of Tehri Lake. Designed for silent zero-emission anchoring, structural stability, and panoramic Himalayan vistas.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-6">
            <Link
              href="/boat-experience"
              className="btn-brown px-7 py-3 text-xs uppercase tracking-wider font-bold rounded-full shadow-md"
            >
              Hire My Boat (₹80k Buyout)
            </Link>
            <Link
              href="/rooms"
              className="btn-white px-7 py-3 text-xs uppercase tracking-wider font-bold rounded-full"
            >
              Explore 4 Staterooms
            </Link>
          </div>
        </section>

        {/* Feature Vessel Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-[#1A0F0A] shadow-xl border border-[#2C1A10]/10">
          <Image
            src="/images/boat/Front View.JPG"
            alt="Lake Escape floating catamaran front view"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white max-w-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5EFEB] mb-1 block">
              Architectural Profile
            </span>
            <h3 className="text-xl sm:text-3xl font-medium text-white">
              85ft Custom Floating Catamaran
            </h3>
          </div>
        </div>

        {/* Architecture & Engineering Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-12 border border-[#2C1A10]/10 shadow-sm space-y-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C6747] mb-1">
                Design Philosophy
              </p>
              <h2 className="text-2xl sm:text-4xl font-medium text-[#1A0F0A]">
                Engineering Quiet Exclusivity
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#1A0F0A]/80 leading-relaxed font-normal">
              Designed as a modern floating haven, the vessel features twin buoyant hulls with a lightweight glass-and-cedar superstructure. Powered by a silent solar grid, it remains anchored quietly in secluded coves, ensuring your stay is completely peaceful.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8">
                <Zap size={18} className="text-[#8C6747] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#1A0F0A]">Hybrid Silent Solar Grid</h4>
                  <p className="text-[11px] text-[#1A0F0A]/70">Zero engine noise or vibration at anchor</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8">
                <ShieldCheck size={18} className="text-[#8C6747] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#1A0F0A]">Twin Marine Stability Hulls</h4>
                  <p className="text-[11px] text-[#1A0F0A]/70">Smooth, roll-free floating platform in all weather</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8">
                <Wind size={18} className="text-[#8C6747] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#1A0F0A]">Dedicated Speedboat Launches</h4>
                  <p className="text-[11px] text-[#1A0F0A]/70">On-demand 8-minute private transfers from dock</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-12 border border-[#2C1A10]/10 shadow-sm space-y-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C6747] mb-1">
                Technical Data
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1A0F0A]">
                Vessel Specifications
              </h3>
            </div>

            <div className="divide-y divide-[#2C1A10]/10 text-xs">
              {specs.map((spec, i) => (
                <div key={i} className="py-3 flex justify-between items-center">
                  <span className="font-semibold text-[#8C6747]">{spec.label}</span>
                  <span className="font-medium text-[#1A0F0A]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-[#1A0F0A] text-white rounded-3xl p-8 sm:p-14 text-center border border-[#1A0F0A] shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider border border-white/25 inline-block">
              Experience the Vessel
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium text-white">
              Plan Your Stay on Lake Escape
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
              Book an individual suite or reserve the entire vessel exclusively for up to 12 guests.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <Link
                href="/booking"
                className="px-7 py-3.5 rounded-full bg-white text-[#1A0F0A] hover:bg-[#F5EFEB] text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Book a Stateroom</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/boat-experience"
                className="px-7 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold uppercase tracking-wider transition border border-white/30 cursor-pointer"
              >
                Hire My Boat
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
