"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Utensils, Maximize2 } from "lucide-react";
import { useLightbox } from "@/providers/LightboxProvider";

export function HomeDining() {
  const { openLightbox } = useLightbox();

  const diningGallery = [
    { src: "/images/dining/day.JPG", title: "Open-Air Bow Deck Tasting Table", category: "Dining", description: "Fresh morning breakfasts and lunch on the water." },
    { src: "/images/dining/night.JPG", title: "Candlelit Night Deck Service", category: "Dining", description: "Wood-fired trout and mountain dinner under the stars." }
  ];

  return (
    <section className="py-6 sm:py-10 px-[10px] bg-[#FBF9F5]">
      <div className="max-w-[1360px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-3xl overflow-hidden shadow-sm">
          
          {/* Left: Deep Dark Espresso Card */}
          <div className="lg:col-span-5 bg-[#1A0F0A] text-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 flex flex-col justify-between border border-[#2C1A10] anim-entry-left">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D6C4AD] mb-3">
                On-Board Gastronomy
              </p>

              <h2 className="text-2xl sm:text-4xl text-white font-medium leading-[1.12] mb-4">
                Dinner follows the boats in.
              </h2>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-8 font-normal">
                A seasonal menu of freshly caught Himalayan river trout, mountain-foraged herbs, and wood-fired artisanal breads prepared on the open bow deck under the Garhwal dark sky.
              </p>

              <Link
                href="/dining"
                className="btn-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Explore Dining & Menus</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="pt-6 mt-8 border-t border-white/15 flex items-center justify-between text-[11px] text-[#D6C4AD]">
              <span>Private Chef Service</span>
              <span>•</span>
              <span>Deck Fireplace</span>
              <span>•</span>
              <span>Customizable Menus</span>
            </div>
          </div>

          {/* Right: Full Dining Photograph with click to enlarge */}
          <div 
            onClick={() => openLightbox(diningGallery, 0)}
            className="lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] bg-[#1A0F0A] overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer group anim-entry-right"
          >
            <Image
              src="/images/dining/day.JPG"
              alt="Floating Deck Dining Experience"
              fill
              className="object-cover group-hover:scale-103 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:bg-black/25 transition-colors" />
            
            <div className="absolute bottom-4 left-4 z-10 text-white text-xs font-sans bg-black/50 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5">
              <Maximize2 size={12} />
              <span>Open-Air Bow Deck Tasting Table · Click to View</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
