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

        {/* 4. Vessel House Rules & Prohibited Activities */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#2C1A10]/10 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#2C1A10]/10 pb-4">
            <AlertCircle size={20} className="text-[#8C6747]" />
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1A0F0A]">
              Vessel House Rules & Prohibitions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8 space-y-1.5">
              <span className="font-semibold text-[#1A0F0A] block text-sm">No Barbecue or Open Flames</span>
              <p className="text-[#1A0F0A]/70 leading-relaxed">
                To uphold strict marine and fire safety regulations, open barbecues, charcoal deck grills, and open flames are strictly not permitted on board. All meals are prepared safely in our certified galley.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8 space-y-1.5">
              <span className="font-semibold text-[#1A0F0A] block text-sm">No Lake Swimming</span>
              <p className="text-[#1A0F0A]/70 leading-relaxed">
                Direct swimming or diving into the reservoir waters from the vessel or staterooms is strictly prohibited for personal safety and reservoir maritime compliance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8 space-y-1.5">
              <span className="font-semibold text-[#1A0F0A] block text-sm">No Alcohol or Wine</span>
              <p className="text-[#1A0F0A]/70 leading-relaxed">
                Lake Escape operates as a tranquil, alcohol-free luxury floating sanctuary. Possession, consumption, or service of alcohol, wine, or intoxicating beverages is strictly disallowed aboard the boat.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Booking, Sailing & Reservoir Guidelines */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#2C1A10]/10 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#2C1A10]/10 pb-4">
            <Compass size={20} className="text-[#8C6747]" />
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1A0F0A]">
              Booking & Sailing Guidelines
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#1A0F0A]/80 leading-relaxed">
            <p>
              • <strong>Firm Reservations:</strong> All suite bookings and charter buyouts are confirmed specifically for the reserved dates upon advance booking.
            </p>
            <p>
              • <strong>Sailing & Lake Conditions:</strong> Vessel navigation and scheduled cruise routes depend strictly on prevailing wind, water conditions, and administrative reservoir clearance.
            </p>
            <p>
              • <strong>Stationary Water Stay Policy:</strong> In the event that adverse weather, technical considerations, or local safety directives prevent the vessel from sailing, the boat will remain safely anchored or berthed in the lake/river. Guests will continue to enjoy the complete luxury floating hotel experience—including en-suite staterooms, panoramic views, attentive crew service, and private chef dining. Experiencing the serene water and scenic mountains from the side of the lake is an integral, peaceful dimension of the stay and does not qualify for cancellations, rescheduling, or refunds.
            </p>
          </div>
        </section>

        {/* 6. Contact & Operator Details */}
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
                <span>Phone / WhatsApp: +91 97629 85044</span>
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
