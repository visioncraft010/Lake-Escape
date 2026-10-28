"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Maximize2, Camera, Film } from "lucide-react";
import { galleryPhotos } from "@/lib/data";
import { useLightbox } from "@/providers/LightboxProvider";

export default function GalleryPage() {
  const { openLightbox } = useLightbox();
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Media" },
    { id: "video", label: "Video Excursion" },
    { id: "suites", label: "Staterooms & Suites" },
    { id: "skydeck", label: "Skydeck & Starlight" },
    { id: "rooftop", label: "Rooftop Views" },
    { id: "dining", label: "Dining & Lounges" },
    { id: "views", label: "Lake & Sunsets" }
  ];

  const filteredPhotos = activeTab === "all"
    ? galleryPhotos
    : galleryPhotos.filter((p) => p.category === activeTab);

  return (
    <main className="bg-[#FBF9F5] text-[#1A0F0A] min-h-screen pt-24 pb-20 px-[10px]">
      <div className="max-w-[1360px] mx-auto space-y-10 sm:space-y-12">
        
        {/* Gallery Header */}
        <div className="text-center max-w-3xl mx-auto pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EFEB] text-[10px] font-bold uppercase tracking-wider text-[#8C6747] mb-3">
            <Camera size={12} />
            <span>Visual Archive</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-[#1A0F0A] font-medium leading-[1.08] mb-4">
            Life aboard Lake Escape.
          </h1>

          <p className="text-xs sm:text-base text-[#1A0F0A]/80 max-w-xl mx-auto leading-relaxed font-normal">
            Explore our suites, rooftop loungers, skydeck stargazing deck, gourmet dining plates, and speedboat excursions. Click any item to view in full resolution.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2 px-2 max-w-full">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#1A0F0A] text-white shadow-sm"
                    : "bg-white text-[#5A3D2C] hover:bg-[#F5EFEB] border border-[#2C1A10]/10"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredPhotos.map((item, index) => {
            const isVideo = item.type === "video";

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(filteredPhotos.map((p) => ({
                  src: p.src,
                  title: p.title,
                  category: p.categoryLabel,
                  description: p.description,
                  type: p.type
                })), index)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#2C1A10]/10 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] bg-[#1A0F0A] overflow-hidden">
                  {isVideo ? (
                    <div className="relative w-full h-full">
                      <video
                        src={item.src}
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-14 h-14 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-transform group-hover:scale-110 shadow-xl">
                          <Play size={22} className="fill-white translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#1A0F0A] text-[10px] font-semibold tracking-wide shadow-xs flex items-center gap-1">
                      {isVideo ? <Film size={10} /> : <Camera size={10} />}
                      <span>{item.categoryLabel}</span>
                    </span>
                  </div>

                  {/* Hover Click Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-[#1A0F0A] text-xs font-semibold shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                      <Maximize2 size={13} />
                      <span>{isVideo ? "Play Video" : "View Photo"}</span>
                    </span>
                  </div>
                </div>

                {/* Card Description */}
                <div className="p-4 flex flex-col justify-between grow bg-white">
                  <div>
                    <h3 className="text-base text-[#1A0F0A] font-semibold group-hover:text-[#8C6747] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#1A0F0A]/65 font-sans mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#2C1A10]/8 flex items-center justify-between text-[11px] text-[#8C6747] font-medium">
                    <span>Click to open full view</span>
                    <Maximize2 size={12} className="group-hover:scale-110 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
