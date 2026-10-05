"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Ship, Anchor, Compass, Sparkles, Wind } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "@/lib/data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function BoatParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const waterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !boatRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Smooth horizontal and slight vertical gliding of the boat as you scroll
      gsap.fromTo(
        boatRef.current,
        { x: "-8%", y: "10%", scale: 0.95 },
        {
          x: "8%",
          y: "-10%",
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      // Water background subtle parallax
      if (waterRef.current) {
        gsap.fromTo(
          waterRef.current,
          { y: "-6%" },
          {
            y: "6%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 overflow-hidden bg-[#F5EFEB] border-b border-[#2C1A10]/8"
      aria-label="The Lake Escape Vessel"
    >
      {/* Background Water Surface */}
      <div
        ref={waterRef}
        className="absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: "url('/images/views/lake-view.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <div className="container-sym relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="badge-pill mb-3">
            <Anchor size={12} className="text-[#8C6747]" />
            <span>Naval Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#1A0F0A] font-normal italic mb-3">
            Engineered for Quiet Waters
          </h2>
          <p className="text-[#5A3D2C] text-sm sm:text-base leading-relaxed">
            A 32-meter bespoke floating sanctuary crafted specifically for the calm alpine waters of Tehri Lake, running on silent solar hybrid power.
          </p>
        </div>

        {/* Parallax Cutout Stage */}
        <div className="relative w-full max-w-5xl mx-auto h-[260px] sm:h-[420px] md:h-[480px] flex items-center justify-center">
          
          {/* Subtle water ripple ring */}
          <div className="absolute w-[85%] h-[70%] rounded-full bg-white/60 blur-2xl pointer-events-none" />

          {/* Floating Boat Cutout */}
          <div ref={boatRef} className="relative w-full h-full flex items-center justify-center drop-shadow-2xl">
            <Image
              src={media.boatTopdown}
              alt="Lake Escape Yacht Architectural Plan"
              width={1400}
              height={380}
              className="object-contain max-h-full w-auto transition-transform duration-300"
              priority
            />
          </div>

        </div>

        {/* Symmetrical Feature Grid (Reference Image 1 Feature style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">
          
          <div className="card-sym p-5 sm:p-6 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-full bg-[#F5EFEB] flex items-center justify-center text-[#2C1A10] mb-4">
              <Ship size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-[#1A0F0A] mb-1">
                4 Private Staterooms
              </h4>
              <p className="text-xs sm:text-sm text-[#7A7067] leading-relaxed">
                Floor-to-ceiling glass and private cantilevered balconies over the lake.
              </p>
            </div>
          </div>

          <div className="card-sym p-5 sm:p-6 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-full bg-[#F5EFEB] flex items-center justify-center text-[#2C1A10] mb-4">
              <Wind size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-[#1A0F0A] mb-1">
                Silent Hybrid Grid
              </h4>
              <p className="text-xs sm:text-sm text-[#7A7067] leading-relaxed">
                Zero generator vibration and clean solar storage for uninterrupted sleep.
              </p>
            </div>
          </div>

          <div className="card-sym p-5 sm:p-6 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-full bg-[#F5EFEB] flex items-center justify-center text-[#2C1A10] mb-4">
              <Compass size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-[#1A0F0A] mb-1">
                Observation Skydeck
              </h4>
              <p className="text-xs sm:text-sm text-[#7A7067] leading-relaxed">
                Open-air upper deck with sun lounges, sunset high tea, and telescope stargazing.
              </p>
            </div>
          </div>

          <div className="card-sym p-5 sm:p-6 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-full bg-[#F5EFEB] flex items-center justify-center text-[#2C1A10] mb-4">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-[#1A0F0A] mb-1">
                Starlink Maritime
              </h4>
              <p className="text-xs sm:text-sm text-[#7A7067] leading-relaxed">
                High-speed satellite connectivity across the 42 sq km expanse of Tehri Lake.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
