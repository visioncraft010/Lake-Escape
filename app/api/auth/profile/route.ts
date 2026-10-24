import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session || !prisma) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
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

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error: unknown) {
    console.error("Error in GET /api/auth/profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getCurrentUser();
    if (!session || !prisma) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      avatarUrl,
      dietaryPreference,
      dietaryNotes,
      celebrationDate,
      emergencyContact,
      idTypeNumber,
      specialPreferences,
    } = body;

    const updatedUser = await prisma.user.update({
      where: { id: session.id },
      data: {
        ...(name ? { name: String(name).trim() } : {}),
        avatarUrl: avatarUrl !== undefined ? avatarUrl : undefined,
        dietaryPreference: dietaryPreference !== undefined ? dietaryPreference : undefined,
        dietaryNotes: dietaryNotes !== undefined ? dietaryNotes : undefined,
        celebrationDate: celebrationDate !== undefined ? celebrationDate : undefined,
        emergencyContact: emergencyContact !== undefined ? emergencyContact : undefined,
        idTypeNumber: idTypeNumber !== undefined ? idTypeNumber : undefined,
        specialPreferences: specialPreferences !== undefined ? specialPreferences : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatarUrl: true,
        dietaryPreference: true,
        dietaryNotes: true,
        celebrationDate: true,
        emergencyContact: true,
        idTypeNumber: true,
        specialPreferences: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: "Sanctuary profile updated successfully.",
    });
  } catch (error: unknown) {
    console.error("Error in PUT /api/auth/profile:", error);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}
