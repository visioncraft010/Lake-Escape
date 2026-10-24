import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!prisma) {
      return NextResponse.json({ bookings: [] });
    }

    // Match by userId, or by phone / email
    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          { userId: user.id },
          { phone: user.phone },
          { email: user.email },
        ],
      },
      include: {
        room: true,
      },
      orderBy: {
        checkIn: "desc",
      },
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error: unknown) {
    console.error("Error in /api/bookings/my-bookings:", error);
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 });
  }
}
