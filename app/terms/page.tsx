"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  LifeBuoy, 
  Flame, 
  Compass, 
  Phone, 
  MapPin, 
  Ship,
  Sparkles
} from "lucide-react";

export default function TermsPage() {
  return (
    <main className="bg-[#FBF9F5] text-[#1A0F0A] min-h-screen pt-24 pb-20 px-[10px]">
      <div className="max-w-[1100px] mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EFEB] text-[10px] font-bold uppercase tracking-wider text-[#8C6747] mb-3">
            <ShieldCheck size={12} />
            <span>Official Guest Guidelines & Policies</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold text-[#1A0F0A] tracking-tight mb-3">
            Terms & Conditions
          </h1>

          <p className="text-xs sm:text-sm text-[#1A0F0A]/70 max-w-xl mx-auto leading-relaxed">
            Welcome to Lake Escape. Please review our official stay policies, safety protocols, dining inclusions, and operational guidelines for your floating retreat on Tehri Lake.
          </p>
        </div>

        {/* 1. Stay & Timing Essentials */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#2C1A10]/10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#2C1A10]/10 pb-4">
            <Clock size={20} className="text-[#8C6747]" />
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1A0F0A]">
              Check-In, Check-Out & Stay Inclusions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6747]">Check-In Time</span>
              <p className="text-base font-semibold text-[#1A0F0A]">2:00 PM</p>
              <p className="text-xs text-[#1A0F0A]/70">Speed launch transfers coordinate directly with your arrival time at Koti Colony Jetty.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6747]">Check-Out Time</span>
              <p className="text-base font-semibold text-[#1A0F0A]">11:00 AM</p>
              <p className="text-xs text-[#1A0F0A]/70">Complimentary return speedboat transfer to the dock upon departure.</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A0F0A]">
              Included with Every Stay:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1A0F0A]/85">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                <span>Accommodation in chosen luxury floating stateroom</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                <span>Relaxed morning breakfast with mountain views</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                <span>Curated multi-course dinner prepared by on-board chef</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                <span>Evening snacks and artisan light refreshments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                <span>Scheduled 2-hour Sunset High Tea Cruise across Tehri Lake</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                <span>Round-trip VIP private speedboat transfers from the jetty</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Official Tariffs & Capacity */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#2C1A10]/10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#2C1A10]/10 pb-4">
            <Ship size={20} className="text-[#8C6747]" />
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1A0F0A]">
              Official Tariff & Inventory
            </h2>
          </div>

          <div className="divide-y divide-[#2C1A10]/8 text-xs sm:text-sm">
            <div className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
              <div>
                <span className="font-semibold text-[#1A0F0A]">Deluxe Suites (3 Available: Rooms 01, 02, 03)</span>
                <p className="text-xs text-[#1A0F0A]/60">Comfortable premium floating staterooms with private overwater balcony.</p>
              </div>
              <span className="font-semibold text-[#1A0F0A] shrink-0">₹18,999 + GST / night</span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
              <div>
                <span className="font-semibold text-[#1A0F0A]">Luxury Presidential Suite (1 Available: Room 04)</span>
                <p className="text-xs text-[#1A0F0A]/60">Elevated accommodation with wrap-around terrace & freestanding soaking tub.</p>
              </div>
              <span className="font-semibold text-[#1A0F0A] shrink-0">₹23,999 + GST / night</span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
              <div>
                <span className="font-semibold text-[#1A0F0A]">Whole Boat Buyout (Private Charter)</span>
                <p className="text-xs text-[#1A0F0A]/60">Exclusive vessel takeover for up to 12 guests with dedicated crew & customizable menu.</p>
              </div>
              <span className="font-semibold text-[#1A0F0A] shrink-0">₹80,000 + GST / night</span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
              <div>
                <span className="font-semibold text-[#1A0F0A]">Sunset High Tea Cruise (Non-Resident Guests)</span>
                <p className="text-xs text-[#1A0F0A]/60">4:00 PM – 6:00 PM scenic cruise around Dobra Chanti Bridge with high tea (Max 25 persons).</p>
              </div>
              <span className="font-semibold text-[#1A0F0A] shrink-0">₹3,000 + GST / person</span>
            </div>

            <div className="py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
              <div>
                <span className="font-semibold text-[#1A0F0A]">Extra Bed Arrangement</span>
                <p className="text-xs text-[#1A0F0A]/60">Includes bed setup, all meals (breakfast, dinner, snacks) & cruise access.</p>
              </div>
              <span className="font-semibold text-[#1A0F0A] shrink-0">₹5,000 per person / night</span>
            </div>
          </div>
        </section>

        {/* 3. Safety Protocols & Emergency Preparedness */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#2C1A10]/10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#2C1A10]/10 pb-4">
            <LifeBuoy size={20} className="text-[#8C6747]" />
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1A0F0A]">
              Guest Safety & Emergency Preparedness
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#1A0F0A]/75 leading-relaxed">
            Guest safety remains an essential pillar of the Lake Escape experience. All guests agree to adhere to the following safety protocols:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-[#1A0F0A]">
                <LifeBuoy size={16} className="text-[#8C6747]" />
                <span>Water Safety & Life Jackets</span>
              </div>
              <p className="text-[#1A0F0A]/70 leading-relaxed">
                Certified life jackets are readily available in each suite and must be worn during speedboat transfers and lake-based watersports.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-[#1A0F0A]">
                <Flame size={16} className="text-[#8C6747]" />
                <span>Fire Safety Provisions</span>
              </div>
              <p className="text-[#1A0F0A]/70 leading-relaxed">
                Fire extinguishers and automated smoke detection systems are installed at designated, easily accessible locations across all decks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-[#1A0F0A]">
                <FileText size={16} className="text-[#8C6747]" />
                <span>Mandatory Guest Briefing</span>
              </div>
              <p className="text-[#1A0F0A]/70 leading-relaxed">
                All guests receive a brief safety orientation upon boarding regarding vessel emergency exits, flotation gear, and on-water protocols.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-[#1A0F0A]">
                <Compass size={16} className="text-[#8C6747]" />
                <span>Operational & Weather Safety</span>
              </div>
              <p className="text-[#1A0F0A]/70 leading-relaxed">
                All cruise schedules and lake activities operate strictly subject to weather conditions, reservoir levels, approved capacity, and maritime safety guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Cancellation & Reservation Policies */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#2C1A10]/10 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#2C1A10]/10 pb-4">
            <AlertCircle size={20} className="text-[#8C6747]" />
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1A0F0A]">
              Booking & Cancellation Guidelines
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#1A0F0A]/80 leading-relaxed">
            <p>
              • <strong>Flexible Cancellation:</strong> Full refund or date alteration is available for cancellations made at least 7 days prior to the scheduled check-in date.
            </p>
            <p>
              • <strong>Late Cancellation:</strong> Cancellations made within 7 days of arrival are subject to a 50% retention charge. Cancellations within 48 hours or no-shows are non-refundable.
            </p>
            <p>
              • <strong>Weather Alterations:</strong> In case of extreme weather or official reservoir notices preventing sailing, cruise routes may be adjusted or rescheduled safely by the boat master.
            </p>
          </div>
        </section>

        {/* 5. Contact & Operator Details */}
        <section className="bg-[#1A0F0A] text-white rounded-2xl p-6 sm:p-10 border border-[#2C1A10] shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D6C4AD] block mb-1">
                Official Operator Details
              </span>
              <h3 className="text-xl font-semibold text-white">
                Lake Escape Floating Hospitality
              </h3>
              <p className="text-xs text-white/80 mt-1 flex items-center gap-1.5">
                <MapPin size={13} className="text-[#D6C4AD]" />
                <span>Shop No. 1, 2, Koti Colony Bay, Tehri Lake, New Tehri, Uttarakhand 249001, India</span>
              </p>
              <p className="text-xs text-white/80 mt-1 flex items-center gap-1.5">
                <Phone size={13} className="text-[#D6C4AD]" />
                <span>Phone / WhatsApp: +91 98765 43210</span>
              </p>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              <span className="text-xs uppercase tracking-widest text-[#D6C4AD] font-mono block">
                FLOAT • STAY • EXPERIENCE
              </span>
              <Link
                href="/booking"
                className="mt-3 inline-block px-6 py-2.5 rounded-full bg-white text-[#1A0F0A] hover:bg-[#F5EFEB] font-semibold text-xs transition-all shadow-sm"
              >
                Plan Your Stay
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
