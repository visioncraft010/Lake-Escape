"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rooms } from "@/lib/data";
import { calculateNights } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.coerce.number().min(1).max(25),
  roomSlug: z.string().min(1),
  specialRequests: z.string().optional(),
  coupon: z.string().optional()
});

export async function createBooking(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    const errorMap = parsed.error.flatten().fieldErrors;
    const firstErrorMessage = Object.values(errorMap)[0]?.[0] || "Invalid booking data.";
    return { ok: false, message: firstErrorMessage };
  }

  const { name, email, phone, checkIn, checkOut, guests, roomSlug, coupon, specialRequests } = parsed.data;

  const selectedRoom = rooms.find((r) => r.slug === roomSlug);
  if (!selectedRoom && roomSlug !== "whole-boat" && roomSlug !== "sunset-cruise") {
    return { ok: false, message: "The selected room was not found." };
  }

  // Calculate pricing based on official rates
  const nights = calculateNights(checkIn, checkOut);
  
  let baseNightlyRate = selectedRoom?.price || 18999;
  if (roomSlug === "whole-boat") {
    baseNightlyRate = 80000;
  } else if (roomSlug === "sunset-cruise") {
    baseNightlyRate = 3000 * guests;
  }

  // Extra bed calculation for standard staterooms (₹5,000 / night for each guest beyond 2)
  const extraGuests = roomSlug !== "whole-boat" && roomSlug !== "sunset-cruise" ? Math.max(0, guests - 2) : 0;
  const extraGuestFeePerNight = extraGuests * 5000;
  
  const subtotal = (baseNightlyRate + extraGuestFeePerNight) * nights;
  const gst = Math.round(subtotal * 0.18);
  let totalAmount = subtotal + gst;

  // Process Coupon
  let discountPercent = 0;
  if (coupon) {
    if (process.env.DATABASE_URL && prisma) {
      try {
        const activeCoupon = await prisma.coupon.findUnique({
          where: { code: coupon }
        });
        if (activeCoupon && activeCoupon.active) {
          discountPercent = activeCoupon.percent / 100;
        } else if (coupon.toUpperCase() === "TEHRI10") {
          discountPercent = 0.1;
        }
      } catch {
        if (coupon.toUpperCase() === "TEHRI10") {
          discountPercent = 0.1;
        }
      }
    } else {
      if (coupon.toUpperCase() === "TEHRI10") {
        discountPercent = 0.1;
      }
    }
  }

  totalAmount = Math.round(totalAmount * (1 - discountPercent));

  // Write booking transactions to database if connected
  if (process.env.DATABASE_URL && prisma) {
    try {
      let dbRoom = await prisma.room.findUnique({
        where: { slug: roomSlug }
      });

      if (!dbRoom && selectedRoom) {
        dbRoom = await prisma.room.create({
          data: {
            slug: roomSlug,
            name: selectedRoom.name,
            description: selectedRoom.tone,
            price: selectedRoom.price
          }
        });
      }

      const currentUser = await getCurrentUser();

      const booking = await prisma.booking.create({
        data: {
          roomId: dbRoom?.id || "lake-escape-general",
          userId: currentUser?.id || undefined,
          guestName: name,
          email,
          phone,
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          guests,
          total: totalAmount,
          specialRequests: specialRequests || undefined,
          status: "CONFIRMED"
        }
      });

      return {
        ok: true,
        message: `Reservation confirmed for ${name}. Ref ID: ${booking.id}`,
        bookingId: booking.id,
        total: totalAmount,
        nights,
        roomName: selectedRoom?.name || "Lake Escape Stateroom"
      };
    } catch (error) {
      console.warn("Database offline. Falling back to memory reservation:", error);
      const mockRefId = `LE-${Date.now().toString(36).toUpperCase()}`;
      return {
        ok: true,
        message: `Reservation confirmed for ${name}. Ref ID: ${mockRefId}`,
        bookingId: mockRefId,
        total: totalAmount,
        nights,
        roomName: selectedRoom?.name || "Lake Escape Stateroom",
        isSimulated: true
      };
    }
  } else {
    // Graceful offline fallback
    const mockRefId = `LE-${Date.now().toString(36).toUpperCase()}`;
    return {
      ok: true,
      message: `Reservation confirmed for ${name}. Ref ID: ${mockRefId}`,
      bookingId: mockRefId,
      total: totalAmount,
      nights,
      roomName: selectedRoom?.name || "Lake Escape Stateroom",
      isSimulated: true
    };
  }
}
