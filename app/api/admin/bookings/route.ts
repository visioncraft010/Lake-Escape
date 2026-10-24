import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// ── GET: List and filter all hotel bookings ──
export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    
    // In dev mode or with ADMIN/STAFF role, allow access
    const isAuthorized = user?.role === "ADMIN" || user?.role === "STAFF";
    if (!isAuthorized && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized. Staff or Admin access required." }, { status: 403 });
    }

    if (!prisma) {
      return NextResponse.json({ bookings: [] });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const where: Record<string, unknown> = {};
    if (status && status !== "ALL") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { guestName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { id: { contains: search, mode: "insensitive" } },
      ];
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        room: true,
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error: unknown) {
    console.error("Error in GET /api/admin/bookings:", error);
    return NextResponse.json({ error: "Failed to fetch admin bookings" }, { status: 500 });
  }
}

// ── PATCH: Regulate booking status (Check In, Check Out, Cancel, Confirm) ──
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    const isAuthorized = user?.role === "ADMIN" || user?.role === "STAFF";
    if (!isAuthorized && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized. Staff or Admin access required." }, { status: 403 });
    }

    if (!prisma) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const { bookingId, status } = await req.json();

    if (!bookingId || !status) {
      return NextResponse.json({ error: "Booking ID and status are required" }, { status: 400 });
    }

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: { room: true },
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: unknown) {
    console.error("Error in PATCH /api/admin/bookings:", error);
    return NextResponse.json({ error: "Failed to update reservation status" }, { status: 500 });
  }
}
