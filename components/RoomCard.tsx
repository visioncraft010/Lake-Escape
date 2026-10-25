"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { RoomData } from "@/lib/data";

export type RoomCardItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  guests?: string;
  tone?: string;
  amenities?: string[];
  category?: string;
};

export function RoomCard({ room }: { room: RoomCardItem | RoomData }) {
  const roomSlug = room.slug || "lake-view-suite";
  const roomSize = room.size || "350 sq.ft";
  const roomGuests = room.guests || "Up to 2 Guests";
  const roomTone = room.tone || "Panoramic floor-to-ceiling windows overlooking Tehri Lake.";

  return (
    <article 
      className="reveal group overflow-hidden rounded-2xl border border-[#2C1A10]/10 bg-white hover:shadow-lg transition-all duration-500 flex flex-col justify-between"
      data-cursor="View Details"
    >
      {/* Room Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1A0F0A]">
        {room.image ? (
          <Image 
            src={room.image} 
            alt={room.name} 
            fill 
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-[#1A0F0A]/50 flex items-center justify-center text-white/50 text-xs">
            Lake Escape Sanctuary
          </div>
        )}
        {/* Price tag */}
        <div className="absolute top-4 right-4 z-10 rounded-full bg-white/95 px-3.5 py-1.5 backdrop-blur-sm border border-[#2C1A10]/10 shadow-xs">
          <p className="font-poppins text-[10px] font-semibold uppercase tracking-widest text-[#1A0F0A]">
            From {formatCurrency(room.price)}
          </p>
        </div>
      </div>

      {/* Room Details */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-medium text-[#1A0F0A] tracking-wide">
                {room.name}
              </h3>
              <p className="mt-1 font-sans text-xs uppercase tracking-widest text-[#8C6747] font-semibold">
                {roomSize} &bull; {roomGuests}
              </p>
            </div>
            <Link 
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2C1A10]/15 bg-[#F5EFEB]/50 text-[#1A0F0A] transition-all hover:bg-[#1A0F0A] hover:text-white" 
              href={`/rooms/${roomSlug}`} 
              aria-label={`Open ${room.name}`}
            >
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <p className="mt-3 font-sans text-xs font-normal text-[#1A0F0A]/70 leading-relaxed min-h-[36px]">
            {roomTone}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#2C1A10]/10 pt-4">
          <span className="font-poppins text-[9px] font-bold uppercase tracking-widest text-[#1A0F0A]/50">Rate / Night</span>
          <Link 
            className="inline-flex items-center justify-center rounded-full bg-[#1A0F0A] text-white hover:bg-[#8C6747] px-5 py-2 text-xs font-semibold tracking-wide transition-all shadow-xs" 
            href={`/booking?room=${roomSlug}`}
          >
            <span>Book Stateroom</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
