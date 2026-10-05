"use client";

import { 
  Sun, 
  Ship, 
  Utensils, 
  Wind, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Coffee, 
  Wifi, 
  Waves
} from "lucide-react";

const amenities = [
  {
    title: "Private Water Terraces",
    description: "Cantilevered overwater balconies with panoramic floor-to-ceiling glass in all 4 staterooms.",
    icon: Waves
  },
  {
    title: "Silent Solar Hybrid Grid",
    description: "Whisper-quiet electric propulsion and battery storage. Zero generator hum while you sleep.",
    icon: Sun
  },
  {
    title: "Foraged Mountain Dining",
    description: "Farm-fresh Himalayan river trout, wild-foraged herbs, and wood-fired oven breads prepared on deck.",
    icon: Utensils
  },
  {
    title: "Dedicated Speedboat Launch",
    description: "Twin private high-speed boats for direct dock transfers, water sports, and cove exploration.",
    icon: Wind
  },
  {
    title: "Deep Soaking Rainshowers",
    description: "Panoramic lake-facing ensuite bathrooms with artisan stone vanities and high-pressure rainfall baths.",
    icon: Sparkles
  },
  {
    title: "Stargazing Rooftop Lounge",
    description: "360-degree open-air sun deck for sunrise yoga, afternoon high tea, and dark sky stargazing.",
    icon: Compass
  }
];

export function HomeAmenities() {
  return (
    <section className="py-12 sm:py-16 px-[10px] bg-[#F5EFEB] text-[#1A0F0A]">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Title */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8C6747] mb-2">
            The Craft & Comfort
          </p>
          <h2 className="text-2xl sm:text-4xl text-[#1A0F0A] font-medium leading-tight">
            The good things, considered.
          </h2>
        </div>

        {/* 6-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#2C1A10]/10 hover:shadow-md transition-all shadow-xs"
              >
                <div className="w-9 h-9 rounded-full bg-[#F5EFEB] text-[#8C6747] flex items-center justify-center mb-4">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg text-[#1A0F0A] font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#1A0F0A]/80 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
