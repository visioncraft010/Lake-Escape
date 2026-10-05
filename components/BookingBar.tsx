"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Home, ArrowRight } from "lucide-react";
import { rooms } from "@/lib/data";

export function BookingBar() {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState("2026-10-15");
  const [checkOut, setCheckOut] = useState("2026-10-17");
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState("lake-view-suite");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past 250px
      setIsVisible(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
      room: selectedRoom
    });
    router.push(`/booking?${params.toString()}`);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-4xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-6">
      <form
        onSubmit={handleBook}
        className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-2.5 sm:p-2 shadow-2xl border border-[#2C1A10]/12 grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#2C1A10]/8 items-center"
      >
        {/* Stateroom Select */}
        <div className="px-3 py-1.5 col-span-2 sm:col-span-1">
          <label className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#8C6747]">
            <Home size={11} />
            <span>Stateroom</span>
          </label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold text-[#1A0F0A] outline-none cursor-pointer mt-0.5 truncate"
          >
            {rooms.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Check In */}
        <div className="px-3 py-1.5">
          <label className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#8C6747]">
            <Calendar size={11} />
            <span>Check In</span>
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold text-[#1A0F0A] outline-none cursor-pointer mt-0.5"
          />
        </div>

        {/* Check Out */}
        <div className="px-3 py-1.5">
          <label className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#8C6747]">
            <Calendar size={11} />
            <span>Check Out</span>
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold text-[#1A0F0A] outline-none cursor-pointer mt-0.5"
          />
        </div>

        {/* Guests */}
        <div className="px-3 py-1.5">
          <label className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#8C6747]">
            <Users size={11} />
            <span>Guests</span>
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-transparent text-xs font-semibold text-[#1A0F0A] outline-none cursor-pointer mt-0.5"
          >
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
          </select>
        </div>

        {/* Submit Reserve Button */}
        <div className="px-2 py-1 col-span-2 sm:col-span-1 flex items-center justify-end">
          <button
            type="submit"
            className="btn-brown w-full py-2 px-4 text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <span>Reserve</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </form>
    </div>
  );
}
