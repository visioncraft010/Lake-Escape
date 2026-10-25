"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Phone, Mail, ArrowUp } from "lucide-react";
import { media } from "@/lib/data";

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1A0F0A] text-[#F5EFEB] pt-14 pb-10 border-t border-white/5 px-[10px]">
      <div className="max-w-[1360px] mx-auto flex flex-col items-center text-center">
        
        {/* Brand Logo (White version) */}
        <div className="relative w-[100px] h-[36px] sm:w-[110px] sm:h-[40px] mb-5">
          <Image
            src={media.logoWhiteFull}
            alt="Lake Escape"
            fill
            className="object-contain"
          />
        </div>

        {/* 3 Top Subheaders / Dots (Reference Image 4 Style) */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-[#E6DCCE]/75 font-medium mb-10">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C6747]" />
            Bespoke Staterooms
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C6747]" />
            Private Boat Charter
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C6747]" />
            Sunset Dining & Cruises
          </span>
        </div>

        {/* Clean Center Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-normal text-white/80 mb-10">
          <Link href="/rooms" className="hover:text-white transition-colors">
            Staterooms
          </Link>
          <Link href="/boat-experience" className="hover:text-white transition-colors font-medium text-[#E6DCCE]">
            Hire My Boat
          </Link>
          <Link href="/experiences" className="hover:text-white transition-colors">
            Experiences
          </Link>
          <Link href="/dining" className="hover:text-white transition-colors">
            Dining
          </Link>
          <Link href="/vessel" className="hover:text-white transition-colors">
            The Vessel
          </Link>
          <Link href="/gallery" className="hover:text-white transition-colors">
            Gallery
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact Us
          </Link>
          <Link href="/profile" className="hover:text-white transition-colors">
            Guest Portal
          </Link>
        </nav>

        {/* Social Icons in Rounded Square Tiles (Reference Image 4 Style) */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
          <a
            href="tel:+919762985044"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            aria-label="Phone Concierge"
          >
            <Phone size={18} />
          </a>
          <a
            href="mailto:info@lakeescape.in"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            aria-label="Email Inquiries"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full max-w-2xl h-px bg-white/10 mb-8" />

        {/* Bottom Legal Links & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-2xl text-xs text-white/50">
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white/80 transition-colors">
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link href="/privacy-policy" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/faq" className="hover:text-white/80 transition-colors">
              Disclosures & FAQs
            </Link>
          </div>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>

        {/* Copyright */}
        <p className="text-xs text-white/40 mt-6">
          © {new Date().getFullYear()} Lake Escape. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}
