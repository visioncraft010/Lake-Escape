"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronRight, Edit2, Check, ArrowRight, ShieldCheck, Lock, CheckCircle2, User, Phone, Mail } from "lucide-react";
import { rooms, RoomData } from "@/lib/data";
import { formatCurrency, calculateNights } from "@/lib/utils";
import { createBooking } from "@/actions/booking";

declare global {
  interface RazorpayResponse { error?: { description?: string } }
  interface RazorpayOptions {
    key: string; amount: number; currency: string; name: string; description: string; image: string; order_id?: string;
    handler: (response: RazorpayResponse) => void; prefill: { name: string; email: string; contact: string };
    notes: Record<string, string | number>; theme: { color: string };
  }
  interface RazorpayInstance { on(event: "payment.failed", handler: (response: RazorpayResponse) => void): void; open(): void }
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [roomSlug, setRoomSlug] = useState<string>("lake-view-suite");
  const [checkIn, setCheckIn] = useState<string>("2026-10-15");
  const [checkOut, setCheckOut] = useState<string>("2026-10-17");
  const [guestsCount, setGuestsCount] = useState<number>(2);

  // Guest Contact Details State
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Payment method selection tab
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "direct" | "upi">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const r = searchParams?.get("room");
    const ci = searchParams?.get("checkIn");
    const co = searchParams?.get("checkOut");
    const g = searchParams?.get("guests");

    if (r) setRoomSlug(r);
    if (ci) setCheckIn(ci);
    if (co) setCheckOut(co);
    if (g) setGuestsCount(Number(g) || 2);

    // Dynamically load Razorpay Checkout Script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [searchParams]);

  const activeRoom: RoomData = rooms.find((r) => r.slug === roomSlug) || rooms[0];

  // Dynamic calculations
  const nights = calculateNights(checkIn, checkOut);
  const extraGuests = Math.max(0, guestsCount - 2);
  const extraBedRate = 5000;
  const extraBedTotal = extraGuests * extraBedRate * nights;
  const roomBaseTotal = activeRoom.price * nights;
  const subtotal = roomBaseTotal + extraBedTotal;
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + tax;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      setPaymentError("Please provide your full name, email, and phone number.");
      return;
    }

    if (paymentMethod === "razorpay" || paymentMethod === "upi") {
      handleRazorpayPayment();
    } else {
      handleDirectReservation();
    }
  };

  const handleDirectReservation = async () => {
    setIsProcessing(true);
    setPaymentError("");

    const fd = new FormData();
    fd.append("name", guestName);
    fd.append("email", guestEmail);
    fd.append("phone", guestPhone);
    fd.append("checkIn", checkIn);
    fd.append("checkOut", checkOut);
    fd.append("guests", guestsCount.toString());
    fd.append("roomSlug", activeRoom.slug);
    if (specialRequests) fd.append("specialRequests", specialRequests);

    try {
      const res = await createBooking(fd);
      if (res.ok) {
        setBookingRef(res.bookingId || `LE-${Date.now().toString(36).toUpperCase()}`);
        setBookingSuccess(true);
      } else {
        setPaymentError(res.message || "Could not complete reservation.");
      }
    } catch {
      setPaymentError("Network error. Could not submit reservation.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Razorpay Checkout Trigger
  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    setPaymentError("");

    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`
        })
      });

      const data = await res.json();

      if (!data.ok || !data.order) {
        launchRazorpayModal({
          id: `order_demo_${Date.now()}`,
          amount: grandTotal * 100,
          currency: "INR"
        });
      } else {
        launchRazorpayModal(data.order);
      }
    } catch {
      launchRazorpayModal({
        id: `order_mock_${Date.now()}`,
        amount: grandTotal * 100,
        currency: "INR"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const launchRazorpayModal = (order: { id: string; amount: number; currency: string }) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholderKey123",
        amount: order.amount,
        currency: order.currency,
        name: "Lake Escape Sanctuary",
        description: `Reservation for ${activeRoom.name} (${nights} nights)`,
        image: "/media/Black%20logo.png",
        order_id: order.id,
        handler: async function () {
          const fd = new FormData();
          fd.append("name", guestName);
          fd.append("email", guestEmail);
          fd.append("phone", guestPhone);
          fd.append("checkIn", checkIn);
          fd.append("checkOut", checkOut);
          fd.append("guests", guestsCount.toString());
          fd.append("roomSlug", activeRoom.slug);
          if (specialRequests) fd.append("specialRequests", specialRequests);

          const res = await createBooking(fd);
          setBookingRef(res.bookingId || `LE-${Date.now().toString(36).toUpperCase()}`);
          setBookingSuccess(true);
        },
        prefill: {
          name: guestName,
          email: guestEmail,
          contact: guestPhone
        },
        notes: {
          room: activeRoom.name,
          checkIn,
          checkOut,
          guests: guestsCount
        },
        theme: {
          color: "#1a0f0a"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: RazorpayResponse) {
        setPaymentError(response.error?.description || "Payment authorization failed. You can also choose Direct Concierge Reservation.");
      });
      rzp.open();
    } else {
      handleDirectReservation();
    }
  };

  if (bookingSuccess) {
    return (
      <main className="min-h-screen bg-[#FBF9F5] text-[#1A0F0A] pt-32 pb-20 px-[10px] flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#2C1A10]/10 shadow-2xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 size={32} />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Reservation Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A0F0A] mt-3 mb-1">
              We Await Your Arrival
            </h2>
            <p className="text-xs text-[#5A3D2C] leading-relaxed">
              Thank you, <strong className="text-[#1A0F0A]">{guestName}</strong>. Your sanctuary stay in <strong className="text-[#1A0F0A]">{activeRoom.name}</strong> is confirmed.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#2C1A10]/10 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#5A3D2C]">Booking Ref</span>
              <span className="font-bold text-[#1A0F0A]">{bookingRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5A3D2C]">Dates</span>
              <span className="font-semibold text-[#1A0F0A]">{checkIn} to {checkOut} ({nights} {nights === 1 ? "Night" : "Nights"})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5A3D2C]">Party</span>
              <span className="font-semibold text-[#1A0F0A]">{guestsCount} Guests</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#2C1A10]/10">
              <span className="font-bold text-[#1A0F0A]">Total Paid</span>
              <span className="font-bold text-[#1A0F0A] text-sm">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href="/profile"
              className="w-full py-3 rounded-full bg-[#1A0F0A] hover:bg-[#2C1A10] text-white text-xs font-bold uppercase tracking-wider transition shadow-md block text-center"
            >
              View in Guest Portal
            </Link>
            <Link
              href="/"
              className="w-full py-2.5 rounded-full bg-[#F5EFEB] hover:bg-[#E6DCCE] text-[#1A0F0A] text-xs font-semibold uppercase tracking-wider transition block text-center"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#1A0F0A] pt-24 pb-20 px-[10px]">
      
      {/* Breadcrumbs */}
      <div className="max-w-[1280px] mx-auto mb-6">
        <div className="flex items-center gap-2 text-xs text-[#5A3D2C]">
          <Link href="/" className="hover:text-[#1A0F0A] font-medium">Home</Link>
          <ChevronRight size={12} />
          <Link href="/rooms" className="hover:text-[#1A0F0A] font-medium">Staterooms</Link>
          <ChevronRight size={12} />
          <Link href={`/rooms/${activeRoom.slug}`} className="hover:text-[#1A0F0A] font-medium">{activeRoom.name}</Link>
          <ChevronRight size={12} />
          <span className="text-[#1A0F0A] font-semibold">Confirm Reservation</span>
        </div>
      </div>

      {/* Main Form & Summary Grid */}
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Payment Methods */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747] mb-1 block">
                Checkout Desk
              </span>
              <h1 className="text-3xl sm:text-4xl font-semibold text-[#1A0F0A] leading-tight">
                Complete Your Sanctuary Booking
              </h1>
            </div>

            {/* Stay Details Box */}
            <div className="bg-white rounded-2xl border border-[#2C1A10]/10 p-5 space-y-4 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6747] block">
                Stay Details
              </span>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#2C1A10]/10 text-xs">
                <div>
                  <span className="text-[#5A3D2C] uppercase text-[10px] font-bold">Dates</span>
                  <p className="font-bold text-sm text-[#1A0F0A] mt-0.5">
                    {checkIn} – {checkOut} ({nights} {nights === 1 ? "night" : "nights"})
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[#5A3D2C] uppercase text-[10px] font-bold">Guests</span>
                    <p className="font-bold text-sm text-[#1A0F0A] mt-0.5">
                      {guestsCount} {guestsCount === 1 ? "Guest" : "Guests"} {extraGuests > 0 ? `(+${extraGuests} Extra bed)` : ""}
                    </p>
                  </div>
                  <Link
                    href={`/rooms/${activeRoom.slug}`}
                    className="p-2 rounded-full bg-[#F5EFEB] hover:bg-[#E6DCCE] text-[#1A0F0A] transition"
                    title="Edit dates"
                  >
                    <Edit2 size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Guest Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              <div className="bg-white rounded-2xl border border-[#2C1A10]/10 p-6 space-y-4 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C6747] block">
                  Guest Information
                </span>

                <div>
                  <label className="block text-xs font-bold text-[#1A0F0A] uppercase tracking-wider mb-1.5">
                    Primary Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Aarav Kapoor"
                    className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-4 py-3 text-xs text-[#1A0F0A] outline-none focus:border-[#1A0F0A] font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A0F0A] uppercase tracking-wider mb-1.5">
                      Email for Confirmation
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="aarav@example.com"
                      className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-4 py-3 text-xs text-[#1A0F0A] outline-none focus:border-[#1A0F0A] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A0F0A] uppercase tracking-wider mb-1.5">
                      Phone (Speedboat Coordination)
                    </label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-4 py-3 text-xs text-[#1A0F0A] outline-none focus:border-[#1A0F0A] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A0F0A] uppercase tracking-wider mb-1.5">
                    Dietary & Special Concierge Requests
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Vegetarian preference, anniversary decor, custom check-in timing..."
                    className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-4 py-2.5 text-xs text-[#1A0F0A] outline-none focus:border-[#1A0F0A] font-medium resize-none"
                  />
                </div>
              </div>

              {/* Payment Methods Box */}
              <div className="bg-white rounded-2xl border border-[#2C1A10]/10 p-6 space-y-4 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C6747] block">
                  Payment Method
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("razorpay")}
                    className={`p-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      paymentMethod === "razorpay"
                        ? "bg-[#1A0F0A] text-white border-[#1A0F0A] shadow-md"
                        : "bg-[#FBF9F5] text-[#1A0F0A] border-[#2C1A10]/15 hover:bg-[#F5EFEB]"
                    }`}
                  >
                    Razorpay Gateway
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      paymentMethod === "upi"
                        ? "bg-[#1A0F0A] text-white border-[#1A0F0A] shadow-md"
                        : "bg-[#FBF9F5] text-[#1A0F0A] border-[#2C1A10]/15 hover:bg-[#F5EFEB]"
                    }`}
                  >
                    Instant UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("direct")}
                    className={`p-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      paymentMethod === "direct"
                        ? "bg-[#1A0F0A] text-white border-[#1A0F0A] shadow-md"
                        : "bg-[#FBF9F5] text-[#1A0F0A] border-[#2C1A10]/15 hover:bg-[#F5EFEB]"
                    }`}
                  >
                    Pay at Arrival
                  </button>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/8 text-xs text-[#5A3D2C]">
                  <Lock size={15} className="text-[#8C6747] shrink-0" />
                  <span>256-bit bank-grade TLS encryption via certified Indian payment gateways.</span>
                </div>

                {paymentError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                    {paymentError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-full bg-[#1A0F0A] hover:bg-[#2C1A10] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isProcessing ? "Processing Reservation..." : `Confirm & Authorize ${formatCurrency(grandTotal)}`}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </form>

          </div>

          {/* Right Column: Sticky Summary */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-3xl border border-[#2C1A10]/10 p-6 sm:p-8 space-y-6 shadow-sm">
              
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747] block mb-1">
                  Vessel Sanctuary
                </span>
                <h3 className="text-2xl font-semibold text-[#1A0F0A]">
                  {activeRoom.name}
                </h3>
                <p className="text-xs text-[#5A3D2C] mt-1 font-medium">
                  Tehri Lake, Uttarakhand · {activeRoom.size}
                </p>
              </div>

              {/* Room Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#1A0F0A]">
                <Image
                  src={activeRoom.image}
                  alt={activeRoom.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs text-[#3D2517] pt-4 border-t border-[#2C1A10]/10">
                <div className="flex justify-between">
                  <span>{formatCurrency(activeRoom.price)} × {nights} {nights === 1 ? "night" : "nights"}</span>
                  <span className="font-semibold text-[#1A0F0A]">{formatCurrency(roomBaseTotal)}</span>
                </div>

                {extraGuests > 0 && (
                  <div className="flex justify-between text-[#8C6747] font-medium">
                    <span>Extra Bed ({extraGuests} pers × ₹5k × {nights}n)</span>
                    <span>{formatCurrency(extraBedTotal)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Resort Fee & 18% GST</span>
                  <span className="font-semibold text-[#1A0F0A]">{formatCurrency(tax)}</span>
                </div>

                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Private Speedboat Transfer</span>
                  <span>COMPLIMENTARY</span>
                </div>

                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>2-Hour Sunset Cruise & High Tea</span>
                  <span>INCLUDED</span>
                </div>
              </div>

              {/* Total Due */}
              <div className="flex justify-between items-baseline pt-4 border-t border-[#2C1A10]/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5A3D2C]">
                  Total Due
                </span>
                <span className="text-2xl font-bold text-[#1A0F0A]">
                  {formatCurrency(grandTotal)}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#5A3D2C]">
                <ShieldCheck size={14} className="text-[#8C6747]" />
                <span className="font-medium">All stays protected by Lake Escape Guarantee</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center text-[#1A0F0A] text-xs font-semibold">
        Loading Sanctuary Desk...
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
