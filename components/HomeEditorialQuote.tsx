"use client";

import Link from "next/link";
import { Star, MapPin, ArrowRight, Compass, Waves } from "lucide-react";

export function HomeEditorialQuote() {
  return (
    <section className="py-12 sm:py-16 px-[10px] bg-[#FBF9F5] text-[#1A0F0A]">
      <div className="max-w-[1360px] mx-auto space-y-12">
        
        {/* Editorial Quote & Location Block */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#2C1A10]/10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Quote */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex text-[#8C6747] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-[#8C6747] text-[#8C6747]" />
              ))}
            </div>

            <blockquote className="text-xl sm:text-3xl lg:text-3xl text-[#1A0F0A] font-medium leading-snug">
              “It has the rare feeling of a secret that has been quietly looked after, rather than discovered.”
            </blockquote>

            <p className="text-xs uppercase tracking-[0.14em] text-[#8C6747] font-bold pt-2">
              Architectural Digest · Luxury Himalayan Sanctuaries
            </p>
          </div>

          {/* Location Coordinates Card */}
          <div className="lg:col-span-5 bg-[#F5EFEB] rounded-2xl p-6 sm:p-8 border border-[#2C1A10]/10">
            <div className="flex items-center gap-2 text-[#8C6747] text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin size={14} />
              <span>Location & Transit</span>
            </div>

            <h3 className="text-lg sm:text-xl text-[#1A0F0A] font-semibold mb-2">
              At the end of the mountain road.
            </h3>

            <p className="text-xs text-[#1A0F0A]/80 leading-relaxed mb-4 font-normal">
              Anchored quietly in the pristine waters of Tehri Lake, 800m above sea level. Reached exclusively via a 10-minute private speedboat launch from the dock.
            </p>

            <div className="pt-3 border-t border-[#2C1A10]/10 text-[11px] font-mono text-[#8C6747]">
              30.3782° N, 78.4803° E · Tehri Lake, Uttarakhand
            </div>
          </div>

        </div>

        {/* Bottom Call-to-Action Banner (Let the lake set the pace) */}
        <div className="bg-[#1A0F0A] text-white rounded-3xl p-8 sm:p-14 text-center border border-[#1A0F0A] shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5EFEB] mb-3">
              Lake Escape · Private Staterooms & Full Buyout
            </p>

            <h2 className="text-3xl sm:text-5xl text-white font-medium leading-tight mb-4">
              Let the lake set the pace.
            </h2>

            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-8 max-w-md mx-auto">
              Four staterooms or the entire 85ft boat exclusively for you. Check available dates and plan your Himalayan water escape.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/booking"
                className="btn-white text-xs uppercase tracking-wider font-semibold shadow-md"
              >
                <span>Check Availability & Book</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/boat-experience"
                className="btn-outline-white text-xs uppercase tracking-wider font-semibold"
              >
                <span>Hire My Boat (₹80k)</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
