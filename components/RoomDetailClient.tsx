"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Star, Share2, Heart, MapPin, Check, 
  ArrowRight, ChevronRight, X, ChevronLeft,
  Sparkles, ShieldCheck, Compass, CheckCircle2,
  Navigation, Send
} from "lucide-react";
import { RoomData } from "@/lib/data";
import { formatCurrency, calculateNights } from "@/lib/utils";
import { createBooking } from "@/actions/booking";

interface RoomDetailClientProps {
  room: RoomData;
  allRooms: RoomData[];
}

export function RoomDetailClient({ room, allRooms }: RoomDetailClientProps) {
  const router = useRouter();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // User session state
  const [currentUser, setCurrentUser] = useState<{ id: string; name?: string; email?: string; phone?: string } | null>(null);

  // Booking states
  const [checkIn, setCheckIn] = useState("2026-10-15");
  const [checkOut, setCheckOut] = useState("2026-10-17");
  const [guestsCount, setGuestsCount] = useState(2);
  const [isSaved, setIsSaved] = useState(false);

  // Modal / Instant Booking states
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          if (data.user.name) setGuestName(data.user.name);
          if (data.user.email) setGuestEmail(data.user.email);
          if (data.user.phone) setGuestPhone(data.user.phone);
        }
      })
      .catch(() => {});
  }, []);

  // Dynamic Live Calculations
  const nights = calculateNights(checkIn, checkOut);
  const extraGuests = Math.max(0, guestsCount - 2);
  const extraBedRatePerNight = 5000;
  const extraBedTotal = extraGuests * extraBedRatePerNight * nights;
  const roomBaseTotal = room.price * nights;
  const subtotal = roomBaseTotal + extraBedTotal;
  const taxesAndFees = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + taxesAndFees;

  const galleryImages = room.gallery.length > 0 ? room.gallery : [room.image];
  const mainPhoto = galleryImages[photoIndex] || galleryImages[0];
  const recommendedRooms = allRooms.filter((r) => r.slug !== room.slug);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingError(null);
    setBookingSuccess(null);

    const fd = new FormData();
    fd.append("name", guestName);
    fd.append("email", guestEmail);
    fd.append("phone", guestPhone);
    fd.append("checkIn", checkIn);
    fd.append("checkOut", checkOut);
    fd.append("guests", guestsCount.toString());
    fd.append("roomSlug", room.slug);
    if (specialRequests) fd.append("specialRequests", specialRequests);

    try {
      const res = await createBooking(fd);
      if (res.ok) {
        setBookingSuccess(`Your stay in ${room.name} has been confirmed successfully!`);
        setBookingRef(res.bookingId || `LE-${Date.now().toString(36).toUpperCase()}`);

        // Dispatch Email Alert to Resort Desk and Guest
        fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: guestName,
            email: guestEmail,
            phone: guestPhone,
            checkIn,
            checkOut,
            guests: guestsCount,
            room: room.name,
            specialRequests: specialRequests || `Instant Booking #${res.bookingId}`,
            source: "Direct Instant Stateroom Reservation"
          })
        }).catch((err) => console.warn("Email alert error:", err));
      } else {
        setBookingError(res.message || "Could not complete reservation. Please verify your details.");
      }
    } catch {
      setBookingError("Network error. Your reservation could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantReserveClick = () => {
    if (!currentUser) {
      const redirectUrl = `/booking?room=${room.slug}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guestsCount}`;
      router.push(`/auth/login?redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }
    setShowBookingModal(true);
  };

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#1A0F0A] pt-24 pb-20 px-[10px]">
      
      {/* 1. Header Navigation Bar */}
      <div className="max-w-[1360px] mx-auto mb-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#5A3D2C] mb-3">
          <Link href="/" className="hover:text-[#1A0F0A] font-medium">Home</Link>
          <ChevronRight size={12} />
          <Link href="/rooms" className="hover:text-[#1A0F0A] font-medium">Staterooms</Link>
          <ChevronRight size={12} />
          <span className="text-[#1A0F0A] font-semibold">{room.name}</span>
        </div>

        {/* Title & Action Buttons */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EFEB] text-[11px] font-bold uppercase tracking-wider text-[#8C6747] mb-2 border border-[#2C1A10]/10">
              <Sparkles size={12} />
              <span>Room {room.roomNumber} · {room.category}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1A0F0A] leading-tight">
              {room.name}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-[#3D2517]">
              <div className="flex items-center gap-1 font-semibold text-[#1A0F0A]">
                <Star size={14} className="fill-[#8C6747] text-[#8C6747]" />
                <span>4.98</span>
                <span className="font-normal text-[#5A3D2C]">(128 verified stays)</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1 font-medium text-[#1A0F0A]">
                <MapPin size={14} className="text-[#8C6747]" />
                <span>Koti Colony Jetty, Tehri Lake</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                isSaved
                  ? "bg-[#1A0F0A] text-white border-[#1A0F0A]"
                  : "bg-white text-[#1A0F0A] border-[#2C1A10]/20 hover:bg-[#F5EFEB]"
              }`}
            >
              <Heart size={14} className={isSaved ? "fill-current" : ""} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: room.name, url: window.location.href });
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#1A0F0A] border border-[#2C1A10]/20 hover:bg-[#F5EFEB] text-xs font-semibold transition-all cursor-pointer"
            >
              <Share2 size={14} />
              <span>Share</span>
            </button>
          </div>
        </div>

      </div>

      {/* 2. Hero Card & Floating Booking Widgets */}
      <div className="max-w-[1360px] mx-auto mb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#2C1A10]/10 bg-[#1A0F0A] min-h-[520px] lg:min-h-[580px] flex flex-col justify-between p-6 sm:p-10">
          
          {/* Main Background Image */}
          <Image
            src={mainPhoto}
            alt={room.name}
            fill
            priority
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/40" />

          {/* Top Bar inside Hero */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-semibold border border-white/25">
              <MapPin size={13} className="text-white" />
              <span>Tehri Lake, Uttarakhand</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAllPhotos(true)}
                className="px-4 py-2 rounded-full bg-white text-[#1A0F0A] font-bold text-xs hover:bg-[#F5EFEB] shadow-md transition-all cursor-pointer"
              >
                View Gallery ({galleryImages.length} Photos)
              </button>
            </div>
          </div>

          {/* Center / Lower Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mt-12">
            
            {/* Left Headline */}
            <div className="lg:col-span-6 text-white space-y-4">
              <p className="text-xs uppercase tracking-widest text-[#F5EFEB] font-bold">
                Your Passport to Unforgettable Floating Luxury
              </p>
              <h2 className="text-3xl sm:text-5xl font-medium text-white leading-tight drop-shadow-md">
                Book Perfect Stay<br />For Your Vacation
              </h2>
              <p className="text-xs sm:text-sm text-white/90 max-w-md font-normal leading-relaxed">
                We provide premier overwater hospitality designed for discerning travelers in search of quietness, bespoke Himalayan meals, and mountain horizons.
              </p>
            </div>

            {/* Right: Confirmed Stay Preview & Live Reservation Widget */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 justify-end items-stretch">
              
              {/* Card 1: Live Interactive Booking Desk Widget */}
              <div className="bg-white rounded-2xl p-5 shadow-2xl border border-white/40 text-[#1A0F0A] flex-1 max-w-sm space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-[#2C1A10]/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-[#8C6747]" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#1A0F0A]">
                      Live Booking Desk
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#F5EFEB] px-2.5 py-0.5 rounded-full font-bold text-[#8C6747] border border-[#2C1A10]/10">
                    AVAILABLE
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5A3D2C] font-medium">Check In</span>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="font-bold text-[#1A0F0A] bg-[#F5EFEB] px-2.5 py-1 rounded-md border border-[#2C1A10]/10 outline-none cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5A3D2C] font-medium">Check Out</span>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="font-bold text-[#1A0F0A] bg-[#F5EFEB] px-2.5 py-1 rounded-md border border-[#2C1A10]/10 outline-none cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5A3D2C] font-medium">Guests</span>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="font-bold text-[#1A0F0A] bg-[#F5EFEB] px-2.5 py-1 rounded-md border border-[#2C1A10]/10 outline-none cursor-pointer"
                    >
                      <option value={1}>1 Person</option>
                      <option value={2}>2 Persons</option>
                      <option value={3}>3 Persons (+₹5,000 extra bed)</option>
                      <option value={4}>4 Persons (+₹10,000 extra beds)</option>
                    </select>
                  </div>

                  {/* Live Dynamic Price Breakdown */}
                  <div className="pt-3 border-t border-[#2C1A10]/10 space-y-1.5 text-xs text-[#3D2517]">
                    <div className="flex justify-between">
                      <span>{formatCurrency(room.price)} × {nights} {nights === 1 ? "night" : "nights"}</span>
                      <span className="font-semibold text-[#1A0F0A]">{formatCurrency(roomBaseTotal)}</span>
                    </div>

                    {extraGuests > 0 && (
                      <div className="flex justify-between text-[#8C6747]">
                        <span>Extra bed ({extraGuests} guest × ₹5,000 × {nights}n)</span>
                        <span className="font-semibold">{formatCurrency(extraBedTotal)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[11px] text-[#5A3D2C]">
                      <span>GST & Luxury Levies (18%)</span>
                      <span className="font-semibold text-[#1A0F0A]">{formatCurrency(taxesAndFees)}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-[#2C1A10]/10 text-sm">
                      <span className="font-bold text-[#1A0F0A]">Total Tariff</span>
                      <span className="font-bold text-[#1A0F0A] text-base">{formatCurrency(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleInstantReserveClick}
                    className="w-full py-3 text-xs justify-center font-bold uppercase tracking-wider rounded-full bg-[#1A0F0A] hover:bg-[#2C1A10] text-white shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Instant Reserve Stateroom</span>
                    <ArrowRight size={14} />
                  </button>
                  <Link
                    href={`/checkout?room=${room.slug}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guestsCount}`}
                    className="w-full py-2.5 text-xs justify-center font-bold uppercase tracking-wider rounded-full bg-[#F5EFEB] hover:bg-[#E6DCCE] text-[#1A0F0A] border border-[#2C1A10]/15 transition-all flex items-center gap-1.5 text-center"
                  >
                    <span>Proceed to Online Checkout</span>
                  </Link>
                </div>

              </div>

              {/* Card 2: Stay Info / Direction card */}
              <div className="bg-[#1A0F0A] rounded-2xl p-5 shadow-2xl border border-white/20 text-white flex-1 max-w-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Navigation size={14} className="text-[#F5EFEB]" />
                    <span className="text-xs uppercase tracking-wider text-[#F5EFEB] font-bold">
                      Boarding Bay
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-white">
                    Koti Colony Jetty
                  </h4>
                  <p className="text-xs text-white/90 mt-1 leading-relaxed font-normal">
                    VIP 8-minute speedboat shuttle transfer included with your reservation.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/15 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/80">Dining Included</span>
                    <span className="font-semibold text-white">Breakfast, Dinner & Snacks</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/80">Sunset Cruise</span>
                    <span className="font-semibold text-white">2 Hours Daily</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/80">Status</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-bold text-[10px] border border-emerald-400/40">
                      Instant Confirmation
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 3. Specifications, Amenities & Inclusions */}
      <div className="max-w-[1360px] mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Room overview, details, amenities */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview Card */}
            <div className="bg-white rounded-3xl border border-[#2C1A10]/10 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2C1A10]/10">
                <div>
                  <h3 className="text-2xl font-semibold text-[#1A0F0A]">
                    The Stateroom Sanctuary
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A3D2C] mt-1 font-medium">
                    {room.size} · {room.guests} · {room.bedType} · Ensuite Washroom
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#F5EFEB] flex items-center justify-center text-lg text-[#1A0F0A] font-bold border border-[#2C1A10]/10">
                  {room.roomNumber}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm sm:text-base text-[#2C1A10] leading-relaxed font-normal">
                  {room.description}
                </p>
                <p className="text-sm sm:text-base text-[#3D2517] leading-relaxed font-normal">
                  {room.tone}
                </p>
              </div>

              {/* Inclusions Pill Bar */}
              <div className="bg-[#F5EFEB] rounded-2xl p-5 space-y-3 border border-[#2C1A10]/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C6747] block">
                  Package Inclusions (Official Tariff)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#1A0F0A]">
                  {room.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check size={14} className="text-[#8C6747] shrink-0" />
                      <span className="font-normal">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-3xl border border-[#2C1A10]/10 p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-xl font-semibold text-[#1A0F0A]">
                Stateroom Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8 text-xs font-medium text-[#1A0F0A] flex items-center gap-2.5"
                  >
                    <Check size={14} className="text-[#8C6747] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Anchor Map Coordinates */}
            <div className="bg-white rounded-3xl border border-[#2C1A10]/10 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#1A0F0A]">
                    Tehri Lake Anchor Bay
                  </h3>
                  <p className="text-xs text-[#5A3D2C] mt-0.5 font-medium">
                    Garhwal Himalayas, Uttarakhand 249001
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFEB] text-[#8C6747] text-xs font-bold border border-[#2C1A10]/10">
                  <Compass size={12} />
                  <span>30.4002° N, 78.4357° E</span>
                </div>
              </div>
              <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[#2C1A10]/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54988.94828117769!2d78.43574972583856!3d30.400262193556106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390906ad4cf01db3%3A0xe54e2f9d6a7d97cb!2sTehri%20Lake!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Tehri Lake Map"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Summary & Reservation Form */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-3xl border border-[#2C1A10]/10 p-6 space-y-6 shadow-sm">
              
              <div className="flex items-baseline justify-between pb-4 border-b border-[#2C1A10]/10">
                <div>
                  <span className="text-2xl sm:text-3xl font-semibold text-[#1A0F0A]">
                    {formatCurrency(room.price)}
                  </span>
                  <span className="text-xs text-[#5A3D2C] ml-1 font-medium">/ night + GST</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#1A0F0A]">
                  <Star size={13} className="fill-[#8C6747] text-[#8C6747]" />
                  <span>4.98</span>
                </div>
              </div>

              {/* Symmetrical Date Box */}
              <div className="rounded-2xl border border-[#2C1A10]/15 overflow-hidden divide-y divide-[#2C1A10]/15 bg-[#FBF9F5]">
                <div className="grid grid-cols-2 divide-x divide-[#2C1A10]/15">
                  <div className="p-3">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#8C6747] block">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#1A0F0A] outline-none mt-0.5 cursor-pointer"
                    />
                  </div>
                  <div className="p-3">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#8C6747] block">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#1A0F0A] outline-none mt-0.5 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#8C6747] block">
                      Guests
                    </label>
                    <span className="text-xs font-bold text-[#1A0F0A]">
                      {guestsCount} {guestsCount === 1 ? "Guest" : "Guests"} {extraGuests > 0 ? `(${extraGuests} Extra bed)` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                      className="w-7 h-7 rounded-full border border-[#2C1A10]/20 bg-white font-bold text-xs hover:bg-[#F5EFEB] transition cursor-pointer flex items-center justify-center text-[#1A0F0A]"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center text-[#1A0F0A]">{guestsCount}</span>
                    <button
                      type="button"
                      onClick={() => setGuestsCount(Math.min(room.maxGuests, guestsCount + 1))}
                      className="w-7 h-7 rounded-full border border-[#2C1A10]/20 bg-white font-bold text-xs hover:bg-[#F5EFEB] transition cursor-pointer flex items-center justify-center text-[#1A0F0A]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-[#3D2517] pb-4 border-b border-[#2C1A10]/10">
                <div className="flex justify-between">
                  <span>{formatCurrency(room.price)} × {nights} {nights === 1 ? "night" : "nights"}</span>
                  <span className="font-semibold text-[#1A0F0A]">{formatCurrency(roomBaseTotal)}</span>
                </div>
                {extraGuests > 0 && (
                  <div className="flex justify-between text-[#8C6747] font-medium">
                    <span>Extra Bed ({extraGuests} pers × ₹5k × {nights}n)</span>
                    <span>{formatCurrency(extraBedTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST & Resort Maintenance (18%)</span>
                  <span className="font-semibold text-[#1A0F0A]">{formatCurrency(taxesAndFees)}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Speedboat Transfer & Sunset Cruise</span>
                  <span>INCLUDED</span>
                </div>
              </div>

              {/* Total Due */}
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider font-bold text-[#5A3D2C]">
                  Estimated Total
                </span>
                <span className="text-2xl font-bold text-[#1A0F0A]">
                  {formatCurrency(grandTotal)}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleInstantReserveClick}
                  className="w-full py-3.5 text-xs justify-center font-bold uppercase tracking-wider rounded-full bg-[#1A0F0A] hover:bg-[#2C1A10] text-white shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Instant Reserve Stateroom</span>
                  <ArrowRight size={14} />
                </button>
                <Link
                  href={`/checkout?room=${room.slug}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guestsCount}`}
                  className="w-full py-3 text-xs justify-center font-bold uppercase tracking-wider rounded-full bg-[#F5EFEB] hover:bg-[#E6DCCE] text-[#1A0F0A] border border-[#2C1A10]/15 transition-all flex items-center gap-2 text-center"
                >
                  <span>Proceed to Online Checkout</span>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#5A3D2C]">
                <ShieldCheck size={14} className="text-[#8C6747]" />
                <span className="font-medium">Direct Lake Escape Booking Guarantee</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 4. Other Staterooms Grid */}
      <div className="max-w-[1360px] mx-auto pt-12 border-t border-[#2C1A10]/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747] mb-1 block">Alternative Suites</span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#1A0F0A]">
              Unlock Other Staterooms
            </h3>
          </div>
          <Link href="/rooms" className="text-xs font-bold text-[#1A0F0A] hover:underline flex items-center gap-1">
            <span>View All</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recommendedRooms.map((r) => (
            <Link key={r.slug} href={`/rooms/${r.slug}`} className="bg-white rounded-2xl border border-[#2C1A10]/10 overflow-hidden shadow-xs hover:shadow-md transition-all group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1A0F0A]">
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                  {r.category}
                </span>
                <h4 className="text-base font-semibold text-[#1A0F0A] group-hover:text-[#8C6747] transition-colors">
                  {r.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-[#5A3D2C] pt-2 border-t border-[#2C1A10]/10">
                  <span className="font-medium">{r.size}</span>
                  <span className="font-bold text-[#1A0F0A] text-sm">{formatCurrency(r.price)}/night</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 5. Instant Reservation Form Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#1A0F0A] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#2C1A10]/10 max-h-[90vh] overflow-y-auto no-scrollbar relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => {
                setShowBookingModal(false);
                setBookingSuccess(null);
                setBookingError(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F5EFEB] hover:bg-[#E6DCCE] text-[#1A0F0A] transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Reservation Request Registered
                  </span>
                  <h3 className="text-2xl font-semibold text-[#1A0F0A] mt-3 mb-1">
                    We Await Your Arrival
                  </h3>
                  <p className="text-xs text-[#3D2517] leading-relaxed max-w-xs mx-auto">
                    {bookingSuccess}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#2C1A10]/10 text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#5A3D2C]">Booking Reference</span>
                    <span className="font-bold text-[#1A0F0A]">{bookingRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A3D2C]">Stateroom</span>
                    <span className="font-semibold text-[#1A0F0A]">{room.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A3D2C]">Duration</span>
                    <span className="font-semibold text-[#1A0F0A]">{nights} {nights === 1 ? "Night" : "Nights"} ({checkIn} to {checkOut})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A3D2C]">Party</span>
                    <span className="font-semibold text-[#1A0F0A]">{guestsCount} Guests</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#2C1A10]/10">
                    <span className="font-bold text-[#1A0F0A]">Total Tariff</span>
                    <span className="font-bold text-[#1A0F0A] text-sm">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href={`/checkout?room=${room.slug}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guestsCount}`}
                    className="w-full py-3 rounded-full bg-[#1A0F0A] hover:bg-[#2C1A10] text-white text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Online Payment</span>
                    <ArrowRight size={14} />
                  </Link>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="w-full py-2.5 rounded-full bg-[#F5EFEB] hover:bg-[#E6DCCE] text-[#1A0F0A] text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#F5EFEB] text-[#8C6747] text-[10px] font-bold uppercase tracking-wider border border-[#2C1A10]/10 inline-block mb-2">
                    Instant Reservation
                  </span>
                  <h3 className="text-2xl font-semibold text-[#1A0F0A]">
                    Reserve {room.name}
                  </h3>
                  <p className="text-xs text-[#5A3D2C] mt-1">
                    {formatCurrency(grandTotal)} for {nights} {nights === 1 ? "night" : "nights"} · {guestsCount} {guestsCount === 1 ? "Guest" : "Guests"}
                  </p>
                </div>

                {bookingError && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                    {bookingError}
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1A0F0A] uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A0F0A] outline-none focus:border-[#1A0F0A] font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#1A0F0A] uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="rahul@example.com"
                        className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A0F0A] outline-none focus:border-[#1A0F0A] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#1A0F0A] uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#1A0F0A] outline-none focus:border-[#1A0F0A] font-medium"
                      />
                    </div>
                  </div>

                  {/* Dates and Guests confirmation */}
                  <div className="p-3.5 rounded-xl bg-[#F5EFEB] border border-[#2C1A10]/10 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#5A3D2C]">Dates:</span>
                      <span className="font-bold text-[#1A0F0A]">{checkIn} to {checkOut} ({nights} {nights === 1 ? "night" : "nights"})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A3D2C]">Occupancy:</span>
                      <span className="font-bold text-[#1A0F0A]">{guestsCount} Guests {extraGuests > 0 ? `(+${extraGuests} Extra bed)` : ""}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#2C1A10]/10 font-bold">
                      <span className="text-[#1A0F0A]">Total Payable:</span>
                      <span className="text-[#1A0F0A]">{formatCurrency(grandTotal)}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1A0F0A] uppercase tracking-wider mb-1">
                      Special Requests / Dietary Notes
                    </label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Vegetarian preference, anniversary arrangement, arrival time..."
                      className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-3.5 py-2 text-xs text-[#1A0F0A] outline-none focus:border-[#1A0F0A] font-medium resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-[#1A0F0A] hover:bg-[#2C1A10] text-white text-xs font-bold uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Confirming Reservation...</span>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Submit Instant Reservation</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 6. Full-Screen Gallery Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6">
          <div className="flex items-center justify-between text-white">
            <span className="text-xs uppercase tracking-wider font-semibold">
              {room.name} · Photo {photoIndex + 1} of {galleryImages.length}
            </span>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative w-full max-w-5xl h-[70vh] mx-auto flex items-center justify-center">
            <Image
              src={galleryImages[photoIndex]}
              alt={`Photo ${photoIndex + 1}`}
              fill
              className="object-contain"
            />
            <button
              onClick={() => setPhotoIndex((photoIndex - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setPhotoIndex((photoIndex + 1) % galleryImages.length)}
              className="absolute right-2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setPhotoIndex(i)}
                className={`relative w-16 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  i === photoIndex ? "border-white scale-105" : "border-transparent opacity-50"
                }`}
              >
                <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

    </main>
  );
}
