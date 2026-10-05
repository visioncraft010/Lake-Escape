"use client";

import { faqs } from "@/lib/data";
import { HelpCircle, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function FaqPage() {
  return (
    <main className="bg-[#FBF9F5] text-[#1A0F0A] min-h-screen pt-24 pb-20 px-[10px]">
      <div className="max-w-[1000px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EFEB] text-[10px] font-bold uppercase tracking-wider text-[#8C6747] mb-3 border border-[#2C1A10]/10">
            <HelpCircle size={12} />
            <span>Help & Guest Guidelines</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-medium text-[#1A0F0A] leading-tight mb-3">
            Questions Before You Arrive
          </h1>

          <p className="text-xs sm:text-sm text-[#1A0F0A]/75 leading-relaxed font-normal">
            The essential logistics, boarding details, check-in policies, and dietary guidelines for planning your stay on Lake Escape.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4">
          {faqs.map(([question, answer]: [string, string], index: number) => (
            <details
              key={index}
              className="group bg-white rounded-2xl p-6 border border-[#2C1A10]/10 shadow-xs transition-all [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between text-base sm:text-lg font-semibold text-[#1A0F0A] select-none outline-none">
                <span>{question}</span>
                <span className="w-8 h-8 rounded-full bg-[#F5EFEB] text-[#8C6747] flex items-center justify-center text-sm font-bold transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4">
                  <ChevronDown size={16} />
                </span>
              </summary>
              <p className="mt-4 text-xs sm:text-sm text-[#1A0F0A]/80 leading-relaxed border-t border-[#2C1A10]/10 pt-4 font-normal">
                {answer}
              </p>
            </details>
          ))}
        </div>

        {/* Support Callout */}
        <div className="bg-[#1A0F0A] text-white rounded-3xl p-8 text-center space-y-4 shadow-xl border border-[#1A0F0A]">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            Have a Specific Question or Custom Request?
          </h3>
          <p className="text-xs sm:text-sm text-white/85 font-normal max-w-md mx-auto">
            Our private concierge team is available 24/7 to assist with customized itineraries, celebrations, and transfers.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="btn-white px-6 py-2.5 text-xs uppercase tracking-wider font-bold rounded-full"
            >
              Contact Concierge
            </Link>
            <Link
              href="/terms"
              className="px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold uppercase tracking-wider border border-white/25 transition"
            >
              Read Terms & Policies
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
