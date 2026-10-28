"use client";

import Image from "next/image";
import Link from "next/link";
import { Utensils, Coffee, Sparkles } from "lucide-react";

export function DiningSection() {
  return (
    <section
      id="dining"
      className="relative w-full min-h-[60vh] sm:min-h-[75vh] flex items-center bg-[#081218] text-white overflow-hidden py-16 sm:py-24 md:py-32 px-6 sm:px-12 border-b border-white/[0.12]"
    >
      {/* Background Ambience Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/rooms/suite-room/interior-2.jpg"
          alt="Floating Lake Dining Experience"
          fill
          className="object-cover object-center opacity-40 animate-kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081218] via-[#081218]/85 to-[#081218]/50" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <div className="w-full sm:max-w-xl bg-[#081218]/90 p-6 sm:p-8 md:p-12 rounded-xl border border-white/15 backdrop-blur-xl shadow-2xl space-y-5 sm:space-y-6">
          
          <div className="flex items-center gap-2 text-slate-300">
            <Utensils size={15} />
            <span className="font-sans text-[12px] font-semibold uppercase tracking-[-0.01em]">
              Culinary Artistry
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-[-0.035em]">
            Floating Deck Gastronomy
          </h2>

          <p className="font-sans text-sm font-normal text-slate-300 leading-relaxed tracking-[-0.01em]">
            Dine surrounded by tranquil mountain waters. Our dedicated executive chef curates bespoke menus combining rare Himalayan mountain herbs, fresh lake catch, and handcrafted culinary delicacies on the open deck.
          </p>

          <div className="grid grid-cols-2 gap-3 border-t border-white/[0.12] pt-5 font-sans text-xs font-semibold text-slate-300 tracking-[-0.01em]">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-slate-400" />
              <span>Private Chef on Board</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee size={14} className="text-slate-400" />
              <span>Artisan Mountain Teas</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/booking"
              className="btn btn-primary w-full sm:w-auto"
            >
              Book Dining Experience
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
