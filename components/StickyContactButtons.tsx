"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

export function StickyContactButtons() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<"whatsapp" | "call" | null>(null);

  // Do not show sticky buttons on admin pages
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const phoneNumber = "+919762985044";
  const whatsappNumber = "919762985044";
  const whatsappMessage = encodeURIComponent("Hello, I want more info about the booking system");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div
      className="fixed bottom-24 sm:bottom-7 right-4 sm:right-7 z-50 flex flex-col gap-3 items-end pointer-events-auto select-none"
      aria-label="Direct contact options"
    >
      {/* WhatsApp Floating Button */}
      <div className="relative flex items-center">
        {/* Tooltip on hover (desktop) */}
        <div
          className={`hidden sm:block absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-[#1A0F0A]/95 text-white text-[11px] font-medium tracking-wide shadow-xl border border-white/10 backdrop-blur-md whitespace-nowrap transition-all duration-200 pointer-events-none ${
            hovered === "whatsapp" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          Chat on WhatsApp
          <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-solid border-l-[#1A0F0A] border-l-6 border-y-transparent border-y-4 border-r-0" />
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered("whatsapp")}
          onMouseLeave={() => setHovered(null)}
          className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-[#25D366]/40 hover:scale-108 active:scale-95 transition-all duration-300 border-2 border-white/30"
          aria-label="Chat on WhatsApp about the booking system"
          title="Chat on WhatsApp"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-60 -z-10 pointer-events-none" />

          {/* WhatsApp SVG Icon */}
          <svg
            className="w-6 h-6 fill-current transition-transform duration-300 group-hover:rotate-6"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.411z" />
          </svg>
        </a>
      </div>

      {/* Call Floating Button */}
      <div className="relative flex items-center">
        {/* Tooltip on hover (desktop) */}
        <div
          className={`hidden sm:block absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-[#1A0F0A]/95 text-white text-[11px] font-medium tracking-wide shadow-xl border border-white/10 backdrop-blur-md whitespace-nowrap transition-all duration-200 pointer-events-none ${
            hovered === "call" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          Call: +91 97629 85044
          <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-solid border-l-[#1A0F0A] border-l-6 border-y-transparent border-y-4 border-r-0" />
        </div>

        <a
          href={`tel:${phoneNumber}`}
          onMouseEnter={() => setHovered("call")}
          onMouseLeave={() => setHovered(null)}
          className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#1A0F0A] text-[#E6DCCE] hover:text-white shadow-xl hover:shadow-black/40 hover:scale-108 active:scale-95 transition-all duration-300 border-2 border-[#C8A97E]/50 hover:border-[#C8A97E]"
          aria-label="Direct call to Lake Escape reservation desk"
          title="Direct Call Desk"
        >
          <Phone
            size={20}
            className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 text-[#E6DCCE] group-hover:text-white"
          />
        </a>
      </div>
    </div>
  );
}
