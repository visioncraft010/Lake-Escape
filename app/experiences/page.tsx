"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Maximize2,
  Film,
  Camera,
  Utensils,
  Ship,
  Sun,
  Compass
} from "lucide-react";
import { media } from "@/lib/data";
import { useLightbox } from "@/providers/LightboxProvider";

export default function ExperiencesPage() {
  const { openLightbox } = useLightbox();

  // Carousel active indices
  const [skydeckIndex, setSkydeckIndex] = useState(0);
  const [rooftopIndex, setRooftopIndex] = useState(0);

  const skydeckImages = media.skydeckGallery;
  const rooftopImages = media.rooftopGallery;

  return (
    <main className="bg-[#FBF9F5] text-[#1A0F0A] min-h-screen pt-24 pb-20 px-[10px]">
      <div className="max-w-[1360px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EFEB] text-[10px] font-bold uppercase tracking-wider text-[#8C6747] mb-3 border border-[#2C1A10]/10">
            <Compass size={12} />
            <span>Curated On-Water Encounters</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl text-[#1A0F0A] font-medium leading-[1.08] mb-4">
            Experiences on Tehri Lake.
          </h1>

          <p className="text-xs sm:text-base text-[#1A0F0A]/80 max-w-xl mx-auto leading-relaxed font-normal">
            From high-adrenaline speedboat excursions through Himalayan gorges to rooftop celestial stargazing and private overwater dining. Click on any video or photo to explore in full view.
          </p>
        </div>

        {/* 1. Featured Video Experience: Tehri Speedboat Excursion */}
        <section className="bg-[#1A0F0A] text-white rounded-3xl overflow-hidden border border-[#1A0F0A] shadow-xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Video Player Preview */}
            <div className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/20 shadow-2xl group anim-entry-left">
              <video
                src="/media/speedboat-adventure.mp4"
                playsInline
                autoPlay
                muted
                loop
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

              {/* Play / Expand Button Overlay */}
              <button
                onClick={() => openLightbox([
                  {
                    src: "/media/speedboat-adventure.mp4",
                    title: "Tehri Speedboat Adventure Excursion",
                    category: "Video Excursion",
                    type: "video",
                    description: "High-speed navigation through the scenic fjord-like waters of Tehri Lake."
                  }
                ], 0)}
                className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3 cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-transform group-hover:scale-110 shadow-2xl">
                  <Play size={28} className="fill-white translate-x-0.5" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase border border-white/25">
                  Click to Watch Full Video
                </span>
              </button>
            </div>

            {/* Right Video Copy */}
            <div className="lg:col-span-5 space-y-4 anim-entry-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider border border-white/25">
                <Film size={12} />
                <span>Video Excursion</span>
              </div>

              <h2 className="text-2xl sm:text-4xl text-white font-medium leading-tight">
                Tehri Speedboat Adventure
              </h2>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                Take the helm or sit back as our twin high-speed launches whisk you across 42 square kilometres of mirror-calm mountain waters. Discover hidden lake coves, fjord-like canyon walls, and panoramic perspectives of Dobra Chanti Bridge.
              </p>

              <div className="space-y-2 text-xs text-white/85 pt-2">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[#F5EFEB]" />
                  <span>Flexible Daily Departures · 10-minute Speed Launch Transfers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={13} className="text-[#F5EFEB]" />
                  <span>Complimentary for all overnight stays & whole boat charters</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => openLightbox([
                    {
                      src: "/media/speedboat-adventure.mp4",
                      title: "Tehri Speedboat Adventure Excursion",
                      category: "Video Excursion",
                      type: "video",
                      description: "High-speed navigation through the scenic fjord-like waters of Tehri Lake."
                    }
                  ], 0)}
                  className="px-6 py-3 rounded-full bg-white text-[#1A0F0A] hover:bg-[#F5EFEB] text-xs font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <Play size={13} className="fill-[#1A0F0A]" />
                  <span>Play Cinematic Video</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* 2. Interactive Carousel: Skydeck and Starlight Lounge */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2C1A10]/10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-4 anim-entry-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFEB] text-[#8C6747] text-[10px] font-bold uppercase tracking-wider border border-[#2C1A10]/10">
                <Sparkles size={12} />
                <span>Interactive Gallery</span>
              </div>

              <h2 className="text-2xl sm:text-4xl text-[#1A0F0A] font-medium leading-tight">
                Skydeck & Starlight Lounge
              </h2>

              <p className="text-xs sm:text-sm text-[#1A0F0A]/80 leading-relaxed font-normal">
                Positioned on the highest point of the yacht, the Skydeck offers 360-degree celestial viewing. Far from city lights, Tehri Lake provides zero-light-pollution night skies with telescope stargazing, cushioned lounges, and ambient deck lanterns.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => openLightbox(skydeckImages.map((src, idx) => ({
                    src,
                    title: `Skydeck & Starlight Lounge (Photo ${idx + 1})`,
                    category: "Skydeck & Starlight Lounge",
                    description: "360° celestial stargazing deck on Tehri Lake."
                  })), skydeckIndex)}
                  className="px-6 py-3 rounded-full bg-[#1A0F0A] hover:bg-[#2C1A10] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <Camera size={13} />
                  <span>Open Full Skydeck Carousel ({skydeckImages.length} Photos)</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Carousel */}
            <div className="lg:col-span-7 space-y-3 anim-entry-right">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#1A0F0A] shadow-md border border-[#2C1A10]/10 group">
                <Image
                  src={skydeckImages[skydeckIndex]}
                  alt="Skydeck and Starlight Lounge"
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Click to expand overlay */}
                <button
                  onClick={() => openLightbox(skydeckImages.map((src, idx) => ({
                    src,
                    title: `Skydeck & Starlight Lounge (Photo ${idx + 1})`,
                    category: "Skydeck & Starlight Lounge",
                    description: "360° celestial stargazing deck on Tehri Lake."
                  })), skydeckIndex)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <span className="px-4 py-2 rounded-full bg-white text-[#1A0F0A] text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                    <Maximize2 size={13} />
                    <span>Click to Enlarge</span>
                  </span>
                </button>

                {/* Left / Right Nav Arrows */}
                <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSkydeckIndex((i) => (i === 0 ? skydeckImages.length - 1 : i - 1));
                    }}
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#F5EFEB] text-[#1A0F0A] flex items-center justify-center shadow-md transition cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSkydeckIndex((i) => (i === skydeckImages.length - 1 ? 0 : i + 1));
                    }}
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#F5EFEB] text-[#1A0F0A] flex items-center justify-center shadow-md transition cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 z-10 text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {skydeckIndex + 1} / {skydeckImages.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {skydeckImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSkydeckIndex(i)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      i === skydeckIndex ? "border-[#8C6747] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 3. Interactive Carousel: Rooftop Views */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#2C1A10]/10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Interactive Carousel */}
            <div className="lg:col-span-7 space-y-3 order-2 lg:order-1 anim-entry-left">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#1A0F0A] shadow-md border border-[#2C1A10]/10 group">
                <Image
                  src={rooftopImages[rooftopIndex]}
                  alt="Rooftop panoramic views"
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Click to expand overlay */}
                <button
                  onClick={() => openLightbox(rooftopImages.map((src, idx) => ({
                    src,
                    title: `Rooftop Observation Deck (Photo ${idx + 1})`,
                    category: "Rooftop Views",
                    description: "Panoramic vistas across Tehri Lake and Garhwal ridges."
                  })), rooftopIndex)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <span className="px-4 py-2 rounded-full bg-white text-[#1A0F0A] text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                    <Maximize2 size={13} />
                    <span>Click to Enlarge</span>
                  </span>
                </button>

                {/* Left / Right Nav Arrows */}
                <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRooftopIndex((i) => (i === 0 ? rooftopImages.length - 1 : i - 1));
                    }}
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#F5EFEB] text-[#1A0F0A] flex items-center justify-center shadow-md transition cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRooftopIndex((i) => (i === rooftopImages.length - 1 ? 0 : i + 1));
                    }}
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#F5EFEB] text-[#1A0F0A] flex items-center justify-center shadow-md transition cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 z-10 text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {rooftopIndex + 1} / {rooftopImages.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {rooftopImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setRooftopIndex(i)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      i === rooftopIndex ? "border-[#8C6747] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-5 space-y-4 order-1 lg:order-2 anim-entry-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFEB] text-[#8C6747] text-[10px] font-bold uppercase tracking-wider border border-[#2C1A10]/10">
                <Sun size={12} />
                <span>Panoramic Observation</span>
              </div>

              <h2 className="text-2xl sm:text-4xl text-[#1A0F0A] font-medium leading-tight">
                Rooftop Sun & Lake Deck
              </h2>

              <p className="text-xs sm:text-sm text-[#1A0F0A]/80 leading-relaxed font-normal">
                An open-air expanse designed for daytime mountain viewing and golden hour gatherings. Equipped with cushioned loungers, teak sun beds, and unhindered sightlines across the reservoir.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => openLightbox(rooftopImages.map((src, idx) => ({
                    src,
                    title: `Rooftop Observation Deck (Photo ${idx + 1})`,
                    category: "Rooftop Views",
                    description: "Panoramic vistas across Tehri Lake and Garhwal ridges."
                  })), rooftopIndex)}
                  className="px-6 py-3 rounded-full bg-[#1A0F0A] hover:bg-[#2C1A10] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <Camera size={13} />
                  <span>Open Full Rooftop Gallery ({rooftopImages.length} Photos)</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Multi-Experience Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747] mb-1 block">
              More Encounters
            </span>
            <h3 className="text-2xl sm:text-4xl font-medium text-[#1A0F0A]">
              Daily Rituals on the Water
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#2C1A10]/10 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F5EFEB] text-[#8C6747] flex items-center justify-center">
                <Ship size={18} />
              </div>
              <h4 className="text-base font-semibold text-[#1A0F0A]">
                Sunset High Tea Cruise
              </h4>
              <p className="text-xs text-[#1A0F0A]/75 leading-relaxed font-normal">
                4:00 PM – 6:00 PM evening navigation around Dobra Chanti Bridge with chef-crafted pastries, tea, and mountain vistas.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#2C1A10]/10 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F5EFEB] text-[#8C6747] flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <h4 className="text-base font-semibold text-[#1A0F0A]">
                Midnight Stargazing
              </h4>
              <p className="text-xs text-[#1A0F0A]/75 leading-relaxed font-normal">
                Silent anchorage in isolated bays with high-powered telescope stargazing under zero light pollution.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#2C1A10]/10 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#F5EFEB] text-[#8C6747] flex items-center justify-center">
                <Utensils size={18} />
              </div>
              <h4 className="text-base font-semibold text-[#1A0F0A]">
                Bow Deck Sunset Dining
              </h4>
              <p className="text-xs text-[#1A0F0A]/75 leading-relaxed font-normal">
                Fresh mountain trout and seasonal Himalayan recipes curated by our private executive chef under the evening sky.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
