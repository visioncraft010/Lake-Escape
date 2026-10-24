"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Ship, 
  Wind, 
  Users, 
  Utensils, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Send,
  Lock,
  ArrowRight
} from "lucide-react";
import { createBooking } from "@/actions/booking";

const specs = [
  { label: "Vessel Type", value: "Luxury Floating Catamaran" },
  { label: "Overall Length", value: "85 Feet (26 Metres)" },
  { label: "Beam / Width", value: "28 Feet (8.5 Metres)" },
  { label: "Staterooms", value: "4 Private En-suite Staterooms" },
  { label: "Maximum Occupancy", value: "Up to 12 Guests Max" },
  { label: "Day Cruise Capacity", value: "Up to 25 Guests" },
  { label: "Decks", value: "2 (Lounge & 360° Stargazing Deck)" },
  { label: "Dedicated On-Board Crew", value: "5 Dedicated Staff Members & Executive Chef" },
  { label: "Power & Propulsion", value: "Hybrid Silent Solar Grid + Clean Cruising" },
  { label: "Speedboat Transfers", value: "Twin High-Speed Launch Included" }
];

const inclusions = [
  "Exclusive access to all 4 floating staterooms with private lake-facing balconies",
  "Dedicated on-board private chef with fully customizable gourmet menu (all meals included)",
  "Daily 2-hour Sunset High Tea Cruise across Tehri Lake (4:00 PM – 6:00 PM)",
  "Complimentary high-speed private speedboat launch transfers for all guests",
  "Rooftop open-air stargazing & bonfire/barbecue lounge on the upper deck",
  "High-speed Starlink Satellite Wi-Fi across all suites and communal decks",
  "All non-alcoholic artisan beverages, mountain spring water & fresh pressed juices",
  "Full crew service with 24/7 dedicated hospitality and housekeeping"
];

export default function BoatExperiencePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ id: string; name?: string; email?: string; phone?: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    charterType: "whole-boat",
    checkIn: "2026-10-15",
    checkOut: "2026-10-17",
    guests: "8",
    specialRequests: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          setFormData((prev) => ({
            ...prev,
            name: data.user.name || prev.name,
            email: data.user.email || prev.email,
            phone: data.user.phone || prev.phone,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      router.push(`/auth/login?redirect=${encodeURIComponent("/boat-experience#charter-inquiry")}`);
      return;
    }

    setIsSubmitting(true);
    setBookingError(null);
    setBookingSuccess(null);

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("checkIn", formData.checkIn);
    fd.append("checkOut", formData.checkOut);
    fd.append("guests", formData.guests);
    fd.append("roomSlug", formData.charterType === "sunset-cruise" ? "lake-view-suite" : "presidential-suite");
    if (formData.specialRequests) fd.append("specialRequests", formData.specialRequests);

    try {
      const res = await createBooking(fd);
      if (res.ok) {
        setBookingSuccess(`Your charter reservation request has been registered successfully. Booking Ref: ${res.bookingId}`);

        // Dispatch Email Alert via /api/enquiry to hotel management and guest
        fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            guests: formData.guests,
            room: formData.charterType === "whole-boat" ? "Whole Vessel Private Buyout" : "Sunset High Tea Cruise",
            specialRequests: formData.specialRequests || `Charter Booking #${res.bookingId}`,
            source: "Hire My Boat Charter Reservation"
          })
        }).catch((err) => console.warn("Email alert error:", err));
      } else {
        setBookingError(res.message || "Could not complete charter request. Please check your information.");
      }
    } catch {
      setBookingError("A network error occurred. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#FBF9F5] text-[#1A0F0A] min-h-screen pt-24 pb-20 px-[10px]">
      
      {/* Hero Section */}
      <section className="max-w-[1360px] mx-auto mb-12 sm:mb-16">
        <div className="relative rounded-3xl overflow-hidden bg-[#1A0F0A] text-white p-8 sm:p-16 lg:p-20 shadow-xl border border-[#2C1A10]/10">
          
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/rooms/suite-room/Suite Room Interior - 1.JPG"
              alt="Luxury Boat Experience"
              fill
              className="object-cover opacity-35"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F0A]/95 via-[#1A0F0A]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white mb-4 border border-white/20">
              <Ship size={13} className="text-white" />
              <span>Private Charter & Vessel Hire</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.08] mb-4">
              Hire My Boat.<br />
              <span className="text-[#F5EFEB]">The entire lake is yours.</span>
            </h1>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mb-8 font-normal">
              Experience the pinnacle of Himalayan seclusion. Reserve the whole Lake Escape vessel exclusively for your family, celebration, or private retreat with dedicated crew and on-board chef.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#charter-pricing"
                className="bg-white text-[#1A0F0A] hover:bg-[#F5EFEB] px-7 py-3 text-xs uppercase tracking-wider font-bold rounded-full shadow-md transition-all"
              >
                View Official Tariff
              </a>
              <a
                href="#charter-inquiry"
                className="px-7 py-3 text-xs uppercase tracking-wider font-bold rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm transition-all"
              >
                Instant Charter Inquiry
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Official Tariff & Pricing Grid */}
      <section id="charter-pricing" className="max-w-[1360px] mx-auto mb-16 sm:mb-24 scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6747] mb-2">Transparent Tariff</p>
          <h2 className="text-2xl sm:text-4xl text-[#1A0F0A] font-medium">
            Official Lake Escape Pricing
          </h2>
          <p className="text-xs sm:text-sm text-[#1A0F0A]/75 mt-2">
            All overnight stays and full boat charters include gourmet dining, daily sunset cruise, and private speedboat transfers.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Option 1: Deluxe Cabins */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C1A10]/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-[#F5EFEB] text-[#1A0F0A] text-[10px] font-bold uppercase tracking-wider border border-[#2C1A10]/10">
                  Individual Stateroom
                </span>
                <Users size={18} className="text-[#8C6747]" />
              </div>
              
              <h3 className="text-xl text-[#1A0F0A] font-semibold mb-1">
                Deluxe Lakefront Cabin
              </h3>
              <p className="text-xs text-[#1A0F0A]/70 mb-4">
                Rooms 01, 02 & 03 (Morning Dew, Tehri Vista, Azure Deck)
              </p>

              <div className="mb-6 pb-6 border-b border-[#2C1A10]/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-[#1A0F0A]">₹18,999</span>
                  <span className="text-xs text-[#1A0F0A]/60">/ night + GST</span>
                </div>
                <p className="text-[11px] text-[#8C6747] font-semibold mt-1">
                  Includes Breakfast, Dinner, Evening Snacks & Sunset Cruise
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-[#1A0F0A] mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                  <span>Up to 2 Guests (1 King Floating Bed)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                  <span>Private overwater viewing balcony</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                  <span>Daily 2-hour Sunset Cruise included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                  <span>Complimentary speedboat launch transfers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                  <span>Extra bed available: ₹5,000 / person</span>
                </li>
              </ul>
            </div>

            <Link
              href="/rooms"
              className="btn-brown w-full py-3 text-center text-xs font-semibold rounded-full"
            >
              Explore Cabins
            </Link>
          </div>

          {/* Option 2: Whole Boat Buyout (Highlighted) */}
          <div className="bg-[#1A0F0A] text-white rounded-2xl p-6 sm:p-8 border border-[#1A0F0A] shadow-xl flex flex-col justify-between relative transform md:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8C6747] text-white px-4 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Most Exclusive · Full Buyout
            </div>

            <div>
              <div className="flex justify-between items-start mb-4 mt-2">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider border border-white/25">
                  Private Charter
                </span>
                <Ship size={20} className="text-white" />
              </div>
              
              <h3 className="text-2xl text-white font-semibold mb-1">
                Whole Boat Buyout
              </h3>
              <p className="text-xs text-white/85 mb-4">
                Exclusive private takeover of all 4 staterooms & full vessel
              </p>

              <div className="mb-6 pb-6 border-b border-white/20">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-white">₹80,000</span>
                  <span className="text-xs text-white/75">/ night + GST</span>
                </div>
                <p className="text-[11px] text-[#F5EFEB] font-semibold mt-1">
                  Accommodates up to 12 Guests Max · Customizable Gourmet Menu
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-white mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-white shrink-0" />
                  <span>All 4 Luxury En-suite Staterooms included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-white shrink-0" />
                  <span>Dedicated Executive Chef with fully customizable dining menu</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-white shrink-0" />
                  <span>Exclusive Sunset Cruise across Tehri Lake</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-white shrink-0" />
                  <span>Private twin speedboat transfers for entire party</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-white shrink-0" />
                  <span>Upper deck barbecue & private stargazing party</span>
                </li>
              </ul>
            </div>

            <a
              href="#charter-inquiry"
              className="w-full py-3 text-center text-xs font-bold rounded-full bg-white text-[#1A0F0A] hover:bg-[#F5EFEB] transition-all shadow-md cursor-pointer"
            >
              Inquire Whole Boat Charter
            </a>
          </div>

          {/* Option 3: Sunset Cruise Experience */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C1A10]/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-[#F5EFEB] text-[#1A0F0A] text-[10px] font-bold uppercase tracking-wider border border-[#2C1A10]/10">
                  Day Experience
                </span>
                <Clock size={18} className="text-[#8C6747]" />
              </div>
              
              <h3 className="text-xl text-[#1A0F0A] font-semibold mb-1">
                Sunset High Tea Cruise
              </h3>
              <p className="text-xs text-[#1A0F0A]/70 mb-4">
                4:00 PM – 6:00 PM Evening Voyage (Non-Overnight Guests)
              </p>

              <div className="mb-6 pb-6 border-b border-[#2C1A10]/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-[#1A0F0A]">₹3,000</span>
                  <span className="text-xs text-[#1A0F0A]/60">/ person + GST</span>
                </div>
                <p className="text-[11px] text-[#8C6747] font-semibold mt-1">
                  Includes Chef-crafted Tea, Pastries & Speedboat Return
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-[#1A0F0A] mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                  <span>2-hour scenic navigation through the Garhwal gorge</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                  <span>Artisan Himalayan teas, specialty coffees & bakery snacks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                  <span>Full access to the 360° open-air rooftop sun deck</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8C6747] shrink-0" />
                  <span>Round-trip speedboat transfers from Tehri dock</span>
                </li>
              </ul>
            </div>

            <a
              href="#charter-inquiry"
              className="btn-brown w-full py-3 text-center text-xs font-semibold rounded-full"
            >
              Book Sunset Cruise
            </a>
          </div>

        </div>
      </section>

      {/* Whole Boat Inclusions Section */}
      <section className="max-w-[1360px] mx-auto mb-16 sm:mb-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#2C1A10]/10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#8C6747] mb-2">Charter Inclusions</p>
              <h2 className="text-2xl sm:text-4xl text-[#1A0F0A] font-medium leading-tight mb-4">
                Everything taken care of from dock to departure.
              </h2>
              <p className="text-xs sm:text-sm text-[#1A0F0A]/80 leading-relaxed mb-6 font-normal">
                When you hire the entire Lake Escape vessel, our entire team of 5 dedicated hospitality professionals, including our head chef and licensed boat master, focuses exclusively on your party.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8">
                  <Utensils size={18} className="text-[#8C6747] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1A0F0A]">Private Chef Catering</h4>
                    <p className="text-[11px] text-[#1A0F0A]/70">Custom multi-course gourmet dining</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8">
                  <Wind size={18} className="text-[#8C6747] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1A0F0A]">Speedboat Launch</h4>
                    <p className="text-[11px] text-[#1A0F0A]/70">Private transfers on demand</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8">
                  <Sparkles size={18} className="text-[#8C6747] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1A0F0A]">Custom Itineraries</h4>
                    <p className="text-[11px] text-[#1A0F0A]/70">Flexible sailing & secluded anchorages</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8">
                  <ShieldCheck size={18} className="text-[#8C6747] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1A0F0A]">Complete Privacy</h4>
                    <p className="text-[11px] text-[#1A0F0A]/70">Zero outside guests on board</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FBF9F5] rounded-2xl p-6 sm:p-8 border border-[#2C1A10]/8">
              <h3 className="text-lg font-semibold text-[#1A0F0A] mb-4">
                Included in Your Private Charter:
              </h3>
              <ul className="space-y-3 text-xs text-[#1A0F0A]">
                {inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-[#8C6747] shrink-0 mt-0.5" />
                    <span className="font-normal text-[#1A0F0A] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="max-w-[1360px] mx-auto mb-16 sm:mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6747] mb-2">The Architecture</p>
          <h2 className="text-2xl sm:text-4xl text-[#1A0F0A] font-medium">
            Vessel Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specs.map((spec, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-[#2C1A10]/10 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6747]">
                {spec.label}
              </span>
              <span className="text-sm font-semibold text-[#1A0F0A] mt-2">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Charter Inquiry & Booking Form */}
      <section id="charter-inquiry" className="max-w-[1360px] mx-auto scroll-mt-28">
        <div className="bg-[#1A0F0A] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-[#1A0F0A]">
          <div className="max-w-3xl mx-auto">
            
            <div className="text-center mb-10">
              <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider border border-white/30 inline-block mb-3">
                Instant Request
              </span>
              <h2 className="text-2xl sm:text-4xl text-white font-medium mb-3">
                Charter Inquiry & Reservation
              </h2>
              <p className="text-xs sm:text-sm text-white/85">
                Submit your charter dates. Our concierge will review availability and confirm your booking directly.
              </p>
            </div>

            {bookingSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-100 text-xs flex items-center gap-3">
                <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                <span className="font-medium">{bookingSuccess}</span>
              </div>
            )}

            {bookingError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/90 border border-rose-500/60 text-rose-100 text-xs flex items-center gap-3">
                <Sparkles size={18} className="shrink-0 text-rose-400" />
                <span className="font-medium">{bookingError}</span>
              </div>
            )}

            {!currentUser && (
              <div className="mb-6 p-4 rounded-2xl bg-white/10 border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <Lock size={16} className="text-[#F5EFEB] shrink-0" />
                  <span className="text-white/90">Authentication Required: Please sign in or register to reserve this vessel. You will return here immediately.</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/auth/login?redirect=${encodeURIComponent("/boat-experience#charter-inquiry")}`}
                    className="px-4 py-2 rounded-full bg-white text-[#1A0F0A] font-bold text-xs hover:bg-[#F5EFEB] transition shadow-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    href={`/auth/register?redirect=${encodeURIComponent("/boat-experience#charter-inquiry")}`}
                    className="px-4 py-2 rounded-full bg-white/20 text-white font-bold text-xs hover:bg-white/30 transition border border-white/30"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Charter Type Selection */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Select Experience Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, charterType: "whole-boat", guests: "8" }))}
                    className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                      formData.charterType === "whole-boat" 
                        ? "bg-white text-[#1A0F0A] border-white font-bold shadow-md ring-2 ring-white/50" 
                        : "bg-white/10 text-white border-white/25 hover:bg-white/20 font-medium"
                    }`}
                  >
                    <p className="text-xs font-semibold">Whole Boat Buyout</p>
                    <p className="text-[11px] opacity-90 mt-0.5 font-bold">₹80,000 / night</p>
                    <p className="text-[10px] opacity-75 mt-0.5">Up to 12 Guests</p>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, charterType: "suite", guests: "2" }))}
                    className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                      formData.charterType === "suite" 
                        ? "bg-white text-[#1A0F0A] border-white font-bold shadow-md ring-2 ring-white/50" 
                        : "bg-white/10 text-white border-white/25 hover:bg-white/20 font-medium"
                    }`}
                  >
                    <p className="text-xs font-semibold">Individual Suite</p>
                    <p className="text-[11px] opacity-90 mt-0.5 font-bold">From ₹18,999 / night</p>
                    <p className="text-[10px] opacity-75 mt-0.5">2 Guests / Suite</p>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, charterType: "sunset-cruise", guests: "4" }))}
                    className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                      formData.charterType === "sunset-cruise" 
                        ? "bg-white text-[#1A0F0A] border-white font-bold shadow-md ring-2 ring-white/50" 
                        : "bg-white/10 text-white border-white/25 hover:bg-white/20 font-medium"
                    }`}
                  >
                    <p className="text-xs font-semibold">Sunset Cruise</p>
                    <p className="text-[11px] opacity-90 mt-0.5 font-bold">₹3,000 / person</p>
                    <p className="text-[10px] opacity-75 mt-0.5">4 PM – 6 PM Cruise</p>
                  </button>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-white/15 border border-white/30 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/60 outline-none focus:border-white focus:bg-white/20 font-medium transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="rahul@example.com"
                    className="w-full bg-white/15 border border-white/30 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/60 outline-none focus:border-white focus:bg-white/20 font-medium transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/15 border border-white/30 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/60 outline-none focus:border-white focus:bg-white/20 font-medium transition"
                  />
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData(p => ({ ...p, checkIn: e.target.value }))}
                    className="w-full bg-[#2C1A10] border border-white/30 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-white font-medium transition cursor-pointer [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData(p => ({ ...p, checkOut: e.target.value }))}
                    className="w-full bg-[#2C1A10] border border-white/30 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-white font-medium transition cursor-pointer [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Number of Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData(p => ({ ...p, guests: e.target.value }))}
                    className="w-full bg-[#2C1A10] border border-white/30 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-white font-medium transition cursor-pointer [color-scheme:dark]"
                  >
                    <option value="2" className="bg-[#1A0F0A] text-white">2 Guests</option>
                    <option value="4" className="bg-[#1A0F0A] text-white">4 Guests</option>
                    <option value="6" className="bg-[#1A0F0A] text-white">6 Guests</option>
                    <option value="8" className="bg-[#1A0F0A] text-white">8 Guests</option>
                    <option value="10" className="bg-[#1A0F0A] text-white">10 Guests</option>
                    <option value="12" className="bg-[#1A0F0A] text-white">12 Guests (Max Boat Occupancy)</option>
                    <option value="15" className="bg-[#1A0F0A] text-white">15 Guests (Day Event)</option>
                    <option value="20" className="bg-[#1A0F0A] text-white">20+ Guests (Full Charter Event)</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                  Custom Menu & Special Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData(p => ({ ...p, specialRequests: e.target.value }))}
                  placeholder="Mention any dietary preferences, celebratory arrangements (anniversary/birthday), or customized cruise timings..."
                  className="w-full bg-white/15 border border-white/30 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/60 outline-none focus:border-white focus:bg-white/20 font-medium transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-white text-[#1A0F0A] hover:bg-[#F5EFEB] font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Request...</span>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Submit Charter Reservation</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      </section>

    </main>
  );
}
