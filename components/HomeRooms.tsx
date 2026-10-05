"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Maximize2 } from "lucide-react";
import { rooms } from "@/lib/data";
import { useLightbox } from "@/providers/LightboxProvider";

export function HomeRooms() {
  const { openLightbox } = useLightbox();
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleOpenPhoto = (roomSlug: string, imgIdx = 0, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const r = rooms.find((rm) => rm.slug === roomSlug);
    if (!r) return;
    openLightbox(
      r.gallery.map((src, i) => ({
        src,
        title: `${r.name} (${i + 1} / ${r.gallery.length})`,
        category: r.category,
        description: r.tone
      })),
      imgIdx
    );
  };

  return (
    <section className="py-12 sm:py-16 px-[10px] bg-[#FBF9F5] text-[#1A0F0A]">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Header: Left Eyebrow & Title, Right Editorial Description & Nav */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8C6747] mb-2">
              Only Four Staterooms
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl text-[#1A0F0A] font-medium leading-[1.08] tracking-tight">
              Quiet rooms,<br />open horizons.
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-3 max-w-md">
            <p className="text-xs sm:text-sm text-[#1A0F0A]/70 leading-relaxed font-sans md:text-right">
              Every room faces the calm Himalayan waters. Handcrafted natural cedar wood, panoramic glazing, deep rainshowers, and private overwater balconies.
            </p>

            {/* Quick Navigation Controls */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#8C6747] font-medium mr-2">
                Click photo for instant gallery view
              </span>
              <button
                onClick={() => setScrollIndex((i) => Math.max(0, i - 1))}
                disabled={scrollIndex === 0}
                className="w-8 h-8 rounded-full bg-white border border-[#2C1A10]/10 flex items-center justify-center text-[#1A0F0A] hover:bg-[#F5EFEB] disabled:opacity-40 transition cursor-pointer"
                aria-label="Previous room"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => setScrollIndex((i) => Math.min(rooms.length - 1, i + 1))}
                disabled={scrollIndex === rooms.length - 1}
                className="w-8 h-8 rounded-full bg-white border border-[#2C1A10]/10 flex items-center justify-center text-[#1A0F0A] hover:bg-[#F5EFEB] disabled:opacity-40 transition cursor-pointer"
                aria-label="Next room"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Staterooms Horizontal Grid / Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {rooms.map((room, idx) => (
            <div
              key={room.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-[#2C1A10]/10 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Room Image with click to lightbox */}
              <div 
                onClick={(e) => handleOpenPhoto(room.slug, 0, e)}
                className="relative aspect-[4/3] overflow-hidden bg-[#1A0F0A] cursor-pointer"
              >
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Floating Room Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#1A0F0A] text-[10px] font-semibold tracking-wide shadow-xs">
                    Room {room.roomNumber}
                  </span>
                </div>

                {/* Enlarge Hover Overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1 rounded-full bg-white text-[#1A0F0A] text-[11px] font-semibold shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                    <Maximize2 size={12} />
                    <span>View {room.gallery.length} Photos</span>
                  </span>
                </div>
              </div>

              {/* Room Details & Pricing */}
              <div className="p-4 sm:p-5 flex flex-col justify-between grow">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="text-base sm:text-lg text-[#1A0F0A] font-semibold hover:text-[#8C6747] transition-colors truncate"
                    >
                      {room.name}
                    </Link>
                    <span className="font-sans text-xs font-semibold text-[#1A0F0A] shrink-0">
                      from ₹{room.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#1A0F0A]/60 font-sans mb-2.5">
                    {room.category}
                  </p>

                  <p className="text-[11px] text-[#1A0F0A]/75 font-sans line-clamp-2 leading-relaxed mb-4">
                    {room.tone}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2C1A10]/8 flex items-center justify-between text-[11px]">
                  <span className="text-[#8C6747] font-medium">
                    King · {room.guests} · Lake Terrace
                  </span>
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-[#1A0F0A] hover:text-[#8C6747] transition-colors"
                  >
                    <span>Reserve</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Explorer Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-8 pt-4 border-t border-[#2C1A10]/8 text-xs text-[#1A0F0A]/70">
          <span>All staterooms include breakfast, gourmet dinner, snacks & daily sunset cruise</span>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-1.5 font-semibold text-[#1A0F0A] hover:text-[#8C6747] transition-colors"
          >
            <span>Compare all 4 staterooms</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
}
