"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { rooms } from "@/lib/data";
import { RoomDetailClient } from "@/components/RoomDetailClient";

function BookingContent() {
  const searchParams = useSearchParams();
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string>("lake-view-suite");

  useEffect(() => {
    const roomParam = searchParams?.get("room");
    if (roomParam && rooms.some((r) => r.slug === roomParam)) {
      setSelectedRoomSlug(roomParam);
    }
  }, [searchParams]);

  const activeRoom = rooms.find((r) => r.slug === selectedRoomSlug) || rooms[0];

  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      {/* Room Selection Bar */}
      <div className="bg-[#1A0F0A] text-white pt-28 pb-6 px-[10px]">
        <div className="max-w-[1360px] mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C6747] mb-3">
            Choose Stateroom
          </p>
          <div className="flex flex-wrap gap-2.5">
            {rooms.map((room) => {
              const isSelected = room.slug === activeRoom.slug;
              return (
                <button
                  key={room.slug}
                  onClick={() => setSelectedRoomSlug(room.slug)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-white text-[#1A0F0A] shadow-md font-bold" 
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/15"
                  }`}
                >
                  {room.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <RoomDetailClient room={activeRoom} allRooms={rooms} />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center text-[#1A0F0A] text-xs font-semibold">
        Loading Reservation Engine...
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
