"use client";

import Image from "next/image";
import Link from "next/link";
import { Utensils, Sparkles, ArrowRight, Flame, Coffee } from "lucide-react";
import { cuisines } from "@/lib/data";

export default function DiningPage() {
  return (
    <main className="bg-[#FBF9F5] text-[#1A0F0A] min-h-screen pt-24 pb-20 px-[10px]">
      <div className="max-w-[1360px] mx-auto space-y-16">

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EFEB] text-[10px] font-bold uppercase tracking-wider text-[#8C6747] mb-3 border border-[#2C1A10]/10">
            <Utensils size={12} />
            <span>On-Board Gastronomy & Private Chef</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-[#1A0F0A] leading-[1.08] mb-4">
            The table is set<br />
            <span className="text-[#8C6747]">on the water.</span>
          </h1>

          <p className="text-xs sm:text-base text-[#1A0F0A]/80 max-w-xl mx-auto leading-relaxed font-normal">
            Dine surrounded by tranquil alpine waters. Our dedicated on-board chef prepares bespoke multi-course menus featuring wild-foraged Himalayan herbs, mountain trout, and handcrafted gourmet dining.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-6">
            <Link
              href="/boat-experience#charter-pricing"
              className="btn-brown px-7 py-3 text-xs uppercase tracking-wider font-bold rounded-full shadow-md"
            >
              Explore Buyout Dining (₹80k)
            </Link>
            <Link
              href="/rooms"
              className="btn-white px-7 py-3 text-xs uppercase tracking-wider font-bold rounded-full"
            >
              View Staterooms
            </Link>
          </div>
        </section>

        {/* Hero Feature Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-[#1A0F0A] shadow-xl border border-[#2C1A10]/10">
          <Image
            src="/images/dining/day.JPG"
            alt="Lake Escape dining on the open deck"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white max-w-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5EFEB] mb-1 block">
              Al Fresco Dining
            </span>
            <h3 className="text-xl sm:text-3xl font-medium text-white">
              Open Bow Deck Breakfast & Gourmet Feasts
            </h3>
          </div>
        </div>

        {/* 3 Dining Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C1A10]/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F5EFEB] text-[#8C6747] flex items-center justify-center">
              <Coffee size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[#1A0F0A]">
              Sunrise Lake Breakfast
            </h3>
            <p className="text-xs text-[#1A0F0A]/75 leading-relaxed font-normal">
              Served to your private stateroom balcony or open bow deck. Fresh cold-pressed mountain juices, warm artisan sourdough breads, Himalayan honey, and freshly brewed coffees.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C1A10]/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F5EFEB] text-[#8C6747] flex items-center justify-center">
              <Flame size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[#1A0F0A]">
              Chef&apos;s Artisanal Dinner & Himalayan Delicacies
            </h3>
            <p className="text-xs text-[#1A0F0A]/75 leading-relaxed font-normal">
              Fresh mountain trout, seasonal hill vegetables, and artisanal Himalayan marinades delicately prepared by our chef under the Garhwal dark sky.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C1A10]/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F5EFEB] text-[#8C6747] flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[#1A0F0A]">
              Sunset High Tea Cruise
            </h3>
            <p className="text-xs text-[#1A0F0A]/75 leading-relaxed font-normal">
              4:00 PM – 6:00 PM evening cruise across Tehri Lake. Hand-crafted pastries, savory Garhwali starters, mountain herbal infusions, and bespoke mocktails included with every stay.
            </p>
          </div>
        </section>

        {/* Curated Cuisine Gallery */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#2C1A10]/10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-6 border-b border-[#2C1A10]/10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C6747] mb-1">
                Seasonal Offerings
              </p>
              <h2 className="text-2xl sm:text-4xl font-medium text-[#1A0F0A]">
                Chef-Crafted Specialties
              </h2>
            </div>
            <p className="text-xs text-[#1A0F0A]/75 max-w-sm font-normal">
              Every meal is tailored to guest preferences with 100% customizable menus for private boat buyouts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cuisines.map((item, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden border border-[#2C1A10]/10 bg-[#FBF9F5] shadow-xs flex flex-col justify-between">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1A0F0A]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1.5 grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-semibold text-[#1A0F0A] mt-0.5">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#1A0F0A]/70 mt-1 line-clamp-2 font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inclusions Banner */}
        <section className="bg-[#1A0F0A] text-white rounded-3xl p-8 sm:p-14 text-center border border-[#1A0F0A] shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider border border-white/25 inline-block">
              All-Inclusive Dining
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium text-white">
              Breakfast, Sunset High Tea & Multi-Course Dinner Included
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
              Every room reservation on Lake Escape includes full chef-curated dining, evening snacks, high tea cruise, and speedboat transfers.
            </p>
            <div className="pt-3">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#1A0F0A] hover:bg-[#F5EFEB] text-xs font-bold uppercase tracking-wider transition shadow-md cursor-pointer"
              >
                <span>Reserve Stateroom Experience</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
