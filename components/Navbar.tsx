"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Calendar, User, Search, ArrowRight, Sparkles, MapPin, Compass, Phone, Mail } from "lucide-react";
import { media, rooms } from "@/lib/data";

const menuItems = [
  {
    title: "Staterooms",
    subtitle: "Four Bespoke Overwater Sanctuaries",
    href: "/rooms",
    image: "/images/rooms/suite-room/Suite Room Interior - 1.JPG",
    eyebrow: "Only 4 Suites"
  },
  {
    title: "Hire My Boat",
    subtitle: "Private 85ft Vessel Charter (Up to 12 Guests)",
    href: "/boat-experience",
    image: "/images/views/sunset-sailing.JPG",
    eyebrow: "₹80,000 / night"
  },
  {
    title: "Gastronomie",
    subtitle: "Bow Deck Tasting Table & Wood-Fired Himalayan Cuisine",
    href: "/dining",
    image: "/images/dining/day.JPG",
    eyebrow: "Private Chef"
  },
  {
    title: "Skydeck & Lounge",
    subtitle: "360° Open Air Sun Lounge & Alpine Stargazing",
    href: "/experiences",
    image: "/images/rooftop/Rooftop - 1.JPG",
    eyebrow: "Panoramic Views"
  },
  {
    title: "Curated Experiences",
    subtitle: "Speedboat Coves, Sunset Sailing & Mountain Yoga",
    href: "/experiences",
    image: "/images/views/view 1.JPG",
    eyebrow: "Daily Included"
  },
  {
    title: "The Vessel",
    subtitle: "85ft Naval Architecture & Silent Hybrid Solar Propulsion",
    href: "/vessel",
    image: "/media/boat-cutout.png",
    eyebrow: "Zero Decibel Cruise"
  },
  {
    title: "Cinematic Gallery",
    subtitle: "Visual Journey Across Tehri Lake",
    href: "/gallery",
    image: "/images/views/lake-view.JPG",
    eyebrow: "Full Collection"
  },
  {
    title: "Transit & Contact",
    subtitle: "Koti Colony Jetty, Tehri Lake, Uttarakhand",
    href: "/contact",
    image: "/images/views/laser show.JPG",
    eyebrow: "Concierge"
  }
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState(menuItems[0].image);
  const [activeTitle, setActiveTitle] = useState(menuItems[0].title);
  const [activeSubtitle, setActiveSubtitle] = useState(menuItems[0].subtitle);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open (Kube style)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-[#2C1A10]/8 py-1.5"
            : "bg-white/80 backdrop-blur-sm border-b border-[#2C1A10]/5 py-2"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-[10px] flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <div className="relative w-[95px] h-[34px] sm:w-[100px] sm:h-[36px]">
              <Image
                src={media.logoBlackFull}
                alt="Lake Escape"
                fill
                className="object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
                priority
              />
            </div>
          </Link>

          {/* Center: Editorial Symmetrical Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7">
            <Link
              href="/rooms"
              className={`text-[13px] font-medium tracking-normal transition-colors duration-200 ${
                pathname === "/rooms"
                  ? "text-[#1A0F0A] font-semibold border-b-2 border-[#1A0F0A] pb-0.5"
                  : "text-[#5A3D2C]/80 hover:text-[#1A0F0A]"
              }`}
            >
              Staterooms
            </Link>
            <Link
              href="/boat-experience"
              className={`text-[13px] font-medium tracking-normal transition-colors duration-200 ${
                pathname === "/boat-experience"
                  ? "text-[#1A0F0A] font-semibold border-b-2 border-[#1A0F0A] pb-0.5"
                  : "text-[#5A3D2C]/80 hover:text-[#1A0F0A]"
              }`}
            >
              Hire My Boat
            </Link>
            <Link
              href="/dining"
              className={`text-[13px] font-medium tracking-normal transition-colors duration-200 ${
                pathname === "/dining"
                  ? "text-[#1A0F0A] font-semibold border-b-2 border-[#1A0F0A] pb-0.5"
                  : "text-[#5A3D2C]/80 hover:text-[#1A0F0A]"
              }`}
            >
              Dining
            </Link>
            <Link
              href="/experiences"
              className={`text-[13px] font-medium tracking-normal transition-colors duration-200 ${
                pathname === "/experiences"
                  ? "text-[#1A0F0A] font-semibold border-b-2 border-[#1A0F0A] pb-0.5"
                  : "text-[#5A3D2C]/80 hover:text-[#1A0F0A]"
              }`}
            >
              Experiences
            </Link>
            <Link
              href="/vessel"
              className={`text-[13px] font-medium tracking-normal transition-colors duration-200 ${
                pathname === "/vessel"
                  ? "text-[#1A0F0A] font-semibold border-b-2 border-[#1A0F0A] pb-0.5"
                  : "text-[#5A3D2C]/80 hover:text-[#1A0F0A]"
              }`}
            >
              The Vessel
            </Link>
            <Link
              href="/gallery"
              className={`text-[13px] font-medium tracking-normal transition-colors duration-200 ${
                pathname === "/gallery"
                  ? "text-[#1A0F0A] font-semibold border-b-2 border-[#1A0F0A] pb-0.5"
                  : "text-[#5A3D2C]/80 hover:text-[#1A0F0A]"
              }`}
            >
              Gallery
            </Link>
          </nav>

          {/* Right: Quick Actions & Kube-Style Hamburger Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Stateroom Quick Finder */}
            <Link
              href="/rooms"
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#F5EFEB] text-[#5A3D2C] hover:text-[#1A0F0A] hover:bg-[#E6DCCE] text-xs font-medium transition-colors"
            >
              <Search size={14} className="text-[#8C6747]" />
              <span>4 Staterooms</span>
            </Link>

            {/* Guest Portal */}
            <Link
              href="/profile"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#5A3D2C] hover:text-[#1A0F0A] px-2 py-1 transition-colors"
            >
              <User size={15} />
              <span>Guest Portal</span>
            </Link>

            {/* Book Stay Button (High Contrast White on Dark) */}
            <Link
              href="/booking"
              className="btn-brown text-xs py-2.5 px-5 font-semibold tracking-wide"
            >
              <Calendar size={13} />
              <span>Book Stay</span>
            </Link>

            {/* Kube-style 2-Line Morphing Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="relative w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 p-2 bg-[#F5EFEB] hover:bg-[#E6DCCE] text-[#1A0F0A] transition-all cursor-pointer z-50 group"
              aria-label={open ? "Close Menu" : "Open Menu"}
            >
              <span
                className={`w-5 h-0.5 bg-[#1A0F0A] transition-all duration-300 transform origin-center ${
                  open ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#1A0F0A] transition-all duration-300 transform origin-center ${
                  open ? "-rotate-45 -translate-y-0" : ""
                }`}
              />
            </button>
          </div>

        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          KUBE SAINT-TROPEZ STYLE FULL-SCREEN EDITORIAL MENU OVERLAY
          ═══════════════════════════════════════════════════════════ */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#1A0F0A] text-white flex flex-col justify-between overflow-y-auto no-scrollbar animate-in fade-in duration-300">
          
          {/* Top Bar inside Menu */}
          <div className="max-w-[1360px] w-full mx-auto px-[10px] pt-6 sm:pt-8 flex items-center justify-between border-b border-white/10 pb-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="relative w-[95px] h-[34px] sm:w-[100px] sm:h-[36px] shrink-0"
            >
              <Image
                src={media.logoWhiteFull}
                alt="Lake Escape"
                fill
                className="object-contain object-left"
              />
            </Link>

            <div className="flex items-center gap-4 text-xs text-white/70">
              <span className="hidden sm:inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Anchorage · Tehri Lake, Uttarakhand</span>
              </span>
              <span className="font-mono text-white/50">30.3782° N, 78.4803° E</span>
            </div>
          </div>

          {/* Main Menu Body: Left Big Typographic Links, Right Interactive Preview */}
          <div className="max-w-[1360px] w-full mx-auto px-[10px] py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
            
            {/* Left: Large Editorial Typographic Links */}
            <div className="lg:col-span-7 flex flex-col space-y-1 sm:space-y-2">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => {
                    setActiveImage(item.image);
                    setActiveTitle(item.title);
                    setActiveSubtitle(item.subtitle);
                  }}
                  className="group flex items-center justify-between py-2 sm:py-2.5 px-3 rounded-xl transition-all duration-200 hover:bg-white/5"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="text-xs sm:text-sm font-mono text-[#8C6747] font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white/90 group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[#E6DCCE]/60 group-hover:text-[#E6DCCE] transition-colors">
                      {item.eyebrow}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white text-white group-hover:text-[#1A0F0A] flex items-center justify-center transition-all duration-200">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right: Kube-style Dynamic Interactive Image Showcase */}
            <div className="hidden lg:block lg:col-span-5 h-full min-h-[460px] relative rounded-3xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl">
              <Image
                src={activeImage}
                alt={activeTitle}
                fill
                className="object-cover transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E6DCCE]">
                  Lake Escape Experience
                </span>
                <h3 className="text-xl font-medium text-white">
                  {activeTitle}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-normal">
                  {activeSubtitle}
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Secondary Links Row */}
          <div className="max-w-[1360px] w-full mx-auto px-[10px] py-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/rooms"
                onClick={() => setOpen(false)}
                className="hover:text-white transition-colors"
              >
                4 Staterooms
              </Link>
              <Link
                href="/boat-experience"
                onClick={() => setOpen(false)}
                className="hover:text-white transition-colors text-[#E6DCCE] font-medium"
              >
                Hire My Boat (₹80k Buyout)
              </Link>
              <Link
                href="/terms"
                onClick={() => setOpen(false)}
                className="hover:text-white transition-colors"
              >
                Terms & Policies
              </Link>
              <Link
                href="/faq"
                onClick={() => setOpen(false)}
                className="hover:text-white transition-colors"
              >
                FAQs
              </Link>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="hover:text-white transition-colors"
              >
                Guest Portal
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="px-6 py-2.5 rounded-full bg-white text-[#1A0F0A] hover:bg-[#F5EFEB] font-bold text-xs uppercase tracking-wider transition-all"
              >
                Reserve Stateroom
              </Link>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
