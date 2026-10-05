"use client";

import Image from "next/image";
import Link from "next/link";
import { Ship, ArrowRight, CheckCircle2, Wind, Sparkles } from "lucide-react";

export function HomeCharter() {
  return (
    <section className="py-12 sm:py-16 px-[10px] bg-[#FBF9F5] text-[#1A0F0A]">
      <div className="max-w-[1360px] mx-auto">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#2C1A10]/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Pricing */}
          <div className="lg:col-span-6 space-y-5 anim-entry-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFEB] text-[10px] font-bold uppercase tracking-wider text-[#8C6747] border border-[#2C1A10]/10">
              <Ship size={12} />
              <span>Hire My Boat · Private Charter</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl text-[#1A0F0A] font-medium leading-tight">
              Go where the road narrows.
            </h2>

            <p className="text-xs sm:text-sm text-[#1A0F0A]/80 leading-relaxed font-normal">
              Reserve the entire 85ft floating retreat exclusively for your party. Accommodates up to 12 guests across all 4 luxury en-suite staterooms with a dedicated captain, on-board executive chef with customizable menu, and 5 hospitality crew.
            </p>

            {/* Official Pricing Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-2">
              <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">Whole Boat Buyout</span>
                <div className="text-2xl font-semibold text-[#1A0F0A] mt-0.5">₹80,000 <span className="text-xs font-normal text-[#1A0F0A]/60">/ night</span></div>
                <p className="text-[11px] text-[#1A0F0A]/75 mt-1 font-medium">Up to 12 guests max · Customizable menu included</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">Sunset High Tea Cruise</span>
                <div className="text-2xl font-semibold text-[#1A0F0A] mt-0.5">₹3,000 <span className="text-xs font-normal text-[#1A0F0A]/60">/ person</span></div>
                <p className="text-[11px] text-[#1A0F0A]/75 mt-1 font-medium">4 PM – 6 PM cruise · Tea & snacks included</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/boat-experience"
                className="px-6 py-3 rounded-full bg-[#1A0F0A] hover:bg-[#2C1A10] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <span>Hire My Boat Details</span>
                <ArrowRight size={13} className="text-white" />
              </Link>
              <Link
                href="/vessel"
                className="px-6 py-3 rounded-full bg-[#F5EFEB] hover:bg-[#E6DCCE] text-[#1A0F0A] text-xs font-bold uppercase tracking-wider transition-all border border-[#2C1A10]/15"
              >
                Vessel Architecture
              </Link>
            </div>
          </div>

          {/* Right Column: Multi-Image Showcase */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 anim-entry-right">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#1A0F0A]">
              <Image
                src="/images/rooms/suite-room/Suite Room Interior - 1.JPG"
                alt="Presidential Suite Interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A0F0A]">
                <Image
                  src="/images/views/sunset-sailing.JPG"
                  alt="Speedboat Transfer at Sunset"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A0F0A]">
                <Image
                  src="/images/views/lake-view.JPG"
                  alt="Tehri Lake Mountain Gorge"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
