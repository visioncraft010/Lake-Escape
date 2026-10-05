"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { rooms } from "@/lib/data";

export default function RoomsPage() {
  const [activeImageMap, setActiveImageMap] = useState<Record<string, number>>({
    "room-1": 0,
    "room-2": 0,
    "room-3": 0,
    "room-4": 0,
  });

  const handleThumbnailClick = (roomId: string, index: number) => {
    setActiveImageMap((prev) => ({ ...prev, [roomId]: index }));
  };

  return (
    <main className="bg-[#FBF9F5] text-[#1A0F0A] min-h-screen pt-24 pb-20">
      
      {/* Page Header */}
      <section className="container-sym mb-12 sm:mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747] mb-2 block">Accommodations</span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-[#1A0F0A] font-medium leading-tight mb-4">
            Four Private Staterooms.<br />
            <span className="text-[#8C6747]">One Endless Horizon.</span>
          </h1>
          <p className="text-xs sm:text-base text-[#1A0F0A]/80 max-w-xl mx-auto leading-relaxed font-normal">
            Every stateroom on Lake Escape is an en-suite overwater sanctuary engineered with natural cedar wood, panoramic glazing, and private viewing balconies.
          </p>
        </div>
      </section>

      {/* Staterooms Grid */}
      <section className="container-sym mb-16 sm:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {rooms.map((room) => {
            const currentImgIndex = activeImageMap[room.id] || 0;
            const currentImg = room.gallery[currentImgIndex] || room.image;

            return (
              <div 
                key={room.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#2C1A10]/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
              >
                {/* Image Section with Gallery Navigation */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1A0F0A]">
                  <Image
                    src={currentImg}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2C1A10] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      Room {room.roomNumber} · {room.category}
                    </span>
                  </div>

                  {/* Navigation Arrows if gallery exists */}
                  {room.gallery.length > 1 && (
                    <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleThumbnailClick(room.id, currentImgIndex === 0 ? room.gallery.length - 1 : currentImgIndex - 1);
                        }}
                        className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#2C1A10] flex items-center justify-center transition backdrop-blur-xs cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleThumbnailClick(room.id, currentImgIndex === room.gallery.length - 1 ? 0 : currentImgIndex + 1);
                        }}
                        className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#2C1A10] flex items-center justify-center transition backdrop-blur-xs cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 z-10 text-[10px] font-medium text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
                    {currentImgIndex + 1} / {room.gallery.length}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-8 flex flex-col justify-between grow">
                  <div>
                    <h2 className="text-2xl sm:text-3xl text-[#1A0F0A] font-semibold mb-2">
                      {room.name}
                    </h2>
                    <p className="text-xs text-[#1A0F0A]/75 leading-relaxed mb-6 line-clamp-2 font-normal">
                      {room.tone}
                    </p>

                    {/* Room Attributes */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#2C1A10]/8 mb-6 text-center">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-[#8C6747] font-medium">Capacity</span>
                        <span className="text-xs font-semibold text-[#1A0F0A]">{room.guests}</span>
                      </div>
                      <div className="border-x border-[#2C1A10]/8">
                        <span className="block text-[10px] uppercase tracking-wider text-[#8C6747] font-medium">Size</span>
                        <span className="text-xs font-semibold text-[#1A0F0A]">{room.size.split('/')[0]}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-[#8C6747] font-medium">Bed</span>
                        <span className="text-xs font-semibold text-[#1A0F0A]">King Floating</span>
                      </div>
                    </div>

                    {/* Inclusions Highlights */}
                    <div className="space-y-1.5 text-xs text-[#1A0F0A]/85 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#8C6747] shrink-0" />
                        <span>Breakfast, Dinner, Evening High Tea & Snacks included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#8C6747] shrink-0" />
                        <span>Daily 2-hour Sunset Cruise across Tehri Lake</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#8C6747] shrink-0" />
                        <span>Complimentary speedboat launch transfers</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-4 border-t border-[#2C1A10]/8 flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#8C6747] font-bold">Tariff</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold text-[#1A0F0A]">₹{room.price.toLocaleString("en-IN")}</span>
                        <span className="text-[11px] text-[#1A0F0A]/60">/ night</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="px-4 py-2 rounded-full border border-[#2C1A10]/20 hover:border-[#2C1A10] text-[#1A0F0A] text-xs font-semibold transition-all"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/booking?room=${room.slug}`}
                        className="btn-brown px-5 py-2 text-xs font-semibold rounded-full shadow-xs flex items-center gap-1"
                      >
                        <span>Reserve</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Whole Boat Charter Callout */}
      <section className="container-sym">
        <div className="bg-[#1A0F0A] text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#1A0F0A] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider border border-white/25 inline-block mb-3">
              Whole Boat Buyout
            </span>
            <h2 className="text-2xl sm:text-4xl text-white font-medium mb-3">
              Reserve all four staterooms exclusively.
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
              Book the entire floating hotel for your private celebration or retreat. Includes private chef, dedicated crew, all gourmet meals with customizable menu, sunset cruising, and speedboat transfers for up to 12 guests.
            </p>
          </div>

          <div className="shrink-0 text-center lg:text-right">
            <div className="mb-4">
              <span className="block text-[11px] uppercase tracking-wider text-[#F5EFEB] font-bold">Whole Boat Tariff</span>
              <div className="text-3xl sm:text-4xl font-semibold text-white">
                ₹80,000 <span className="text-xs text-white/70">/ night + GST</span>
              </div>
            </div>
            <Link
              href="/boat-experience"
              className="inline-block px-7 py-3 rounded-full bg-white text-[#1A0F0A] hover:bg-[#F5EFEB] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Hire My Boat
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
