"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type Room = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  guests: string;
  tone: string;
  amenities: string[];
};

export function RoomCard({ room }: { room: Room }) {
  return (
    <article 
      className="reveal group overflow-hidden rounded-[8px] border border-matte-black/5 bg-beige/30 hover:shadow-md transition-all duration-500"
      data-cursor="View Details"
    >
      {/* Room Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-matte-black">
        <Image 
          src={room.image} 
          alt={room.name} 
          fill 
          className="image-cover transition-transform duration-[8000ms] ease-out group-hover:scale-108"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Price tag */}
        <div className="absolute top-4 right-4 z-10 rounded-full bg-cream/95 px-4 py-1.5 backdrop-blur-sm border border-matte-black/5">
          <p className="font-poppins text-[10px] font-semibold uppercase tracking-widest text-matte-black/85">
            From {formatCurrency(room.price)}
          </p>
        </div>
      </div>

      {/* Room Details */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h3 className="font-serif text-xl font-light text-matte-black tracking-wide">
              {room.name}
            </h3>
            <p className="mt-1 font-sans text-xs uppercase tracking-widest text-olive font-semibold">
              {room.size} &bull; {room.guests}
            </p>
          </div>
          <Link 
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-matte-black/15 bg-cream/30 text-matte-black transition-all hover:bg-matte-black hover:text-cream" 
            href={`/rooms/${room.slug}`} 
            aria-label={`Open ${room.name}`}
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <p className="mt-4 font-sans text-sm font-light text-matte-black/70 leading-relaxed min-h-[48px]">
          {room.tone}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-matte-black/5 pt-4">
          <span className="font-poppins text-[9px] font-bold uppercase tracking-widest text-matte-black/40">Rate / Night</span>
          <Link 
            className="btn-brown h-9 min-h-0 py-0 px-5 text-xs font-semibold shadow-xs" 
            href="/booking"
          >
            <span>Book Room</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
