"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Wind, Sun, Utensils, Maximize2 } from "lucide-react";
import { media } from "@/lib/data";
import { useLightbox } from "@/providers/LightboxProvider";

export function HomeSplitExperience() {
  const { openLightbox } = useLightbox();

  return (
    <section className="py-6 sm:py-10 px-[10px] bg-[#FBF9F5]">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-3xl overflow-hidden shadow-sm">
          
          {/* Left: Large Photo (Rooftop/Water Terrace View) with click to expand */}
          <div 
            onClick={() => openLightbox(media.rooftopGallery.map((src, i) => ({
              src,
              title: `Rooftop Observation Lounge (Photo ${i + 1})`,
              category: "Rooftop Sun Lounge",
              description: "Panoramic vistas across Tehri Lake and Garhwal ridges."
            })), 0)}
            className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] bg-[#1A0F0A] overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer group anim-entry-left"
          >
            <Image
              src="/images/rooftop/Rooftop - 1.JPG"
              alt="Lake Escape Rooftop Sun Lounge"
              fill
              className="object-cover group-hover:scale-103 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:bg-black/30 transition-colors" />
            
            <div className="absolute bottom-4 left-4 z-10 text-white text-xs font-sans bg-black/50 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5">
              <Maximize2 size={12} />
              <span>360° Rooftop Lounge · Click to view {media.rooftopGallery.length} Photos</span>
            </div>
          </div>

          {/* Right: Deep Dark Brown / Lake Blue Architectural Block */}
          <div className="lg:col-span-5 bg-[#1F140E] text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 flex flex-col justify-between border border-[#2C1A10] anim-entry-right">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D6C4AD] mb-3">
                The Lake Escape Rhythm
              </p>

              <h2 className="text-2xl sm:text-4xl text-white font-medium leading-[1.12] mb-4">
                Days shaped by light, water and appetite.
              </h2>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-8 font-normal">
                Swim before breakfast. Board the private speedboat for a secluded Garhwal mountain cove. Return when the private chef lights the open wood-fired deck grill under the alpine stars.
              </p>

              <Link
                href="/experiences"
                className="btn-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Curated Experiences</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Stat Counters at Bottom */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/20 text-center sm:text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-white">0 dB</div>
                <div className="text-[10px] uppercase tracking-wider text-[#F5EFEB] mt-1 font-medium">Silent Solar Cruise</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-white">4</div>
                <div className="text-[10px] uppercase tracking-wider text-[#F5EFEB] mt-1 font-medium">Staterooms Only</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-white">8:00</div>
                <div className="text-[10px] uppercase tracking-wider text-[#F5EFEB] mt-1 font-medium">Slow Breakfast</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
