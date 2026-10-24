import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    if (prisma) {
      const dbUser = await prisma.user.findUnique({
        where: { id: session.id },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          role: true,
          avatarUrl: true,
          dietaryPreference: true,
          dietaryNotes: true,
          celebrationDate: true,
          emergencyContact: true,
          idTypeNumber: true,
          specialPreferences: true,
          createdAt: true,
        },
      });
      if (dbUser) {
        return NextResponse.json({ authenticated: true, user: dbUser });
      }
    }

    return NextResponse.json({ authenticated: true, user: session });
  } catch (error: unknown) {
    console.error("Error in /api/auth/me:", error);
    return NextResponse.json({ authenticated: false, user: null });
  }
}
