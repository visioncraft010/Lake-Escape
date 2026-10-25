import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, hashPassword } from "@/lib/auth";

// ── GET: List all management / staff members ──
export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Master Administrator privileges required." },
        { status: 403 }
      );
    }

    if (!prisma) {
      return NextResponse.json({ staff: [] });
    }

    const staffMembers = await prisma.user.findMany({
      where: { role: "STAFF" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ success: true, staff: staffMembers });
  } catch (error: unknown) {
    console.error("Error in GET /api/admin/staff:", error);
    return NextResponse.json({ error: "Failed to load management team." }, { status: 500 });
  }
}

// ── POST: Add a new management / staff member ──
export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Only Master Administrators can add management members." },
        { status: 403 }
      );
    }

    if (!prisma) {
      return NextResponse.json({ error: "Database service unavailable." }, { status: 503 });
    }

    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email address, and initial password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = phone ? String(phone).replace(/[^0-9+]/g, "").trim() : `+91${Date.now().toString().slice(-10)}`;
    const cleanName = String(name).trim();

    if (String(password).length < 6) {
      return NextResponse.json(
        { error: "Initial password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanEmail },
          { phone: cleanPhone }
        ]
      }
    });

    if (existing) {
      // If user exists as GUEST, promote to STAFF
      if (existing.role === "GUEST") {
        const passwordHash = await hashPassword(String(password));
        const updated = await prisma.user.update({
          where: { id: existing.id },
          data: {
            role: "STAFF",
            passwordHash,
            name: cleanName || existing.name,
          },
          select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true }
        });
        return NextResponse.json({
          success: true,
          message: `User ${cleanEmail} upgraded to Management (Staff).`,
          staff: updated
        });
      }

      return NextResponse.json(
        { error: `An account with ${cleanEmail} is already a ${existing.role.toLowerCase()} member.` },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(String(password));
    const newStaff = await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        passwordHash,
        role: "STAFF",
        phoneVerified: true,
        emailVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      }
    });

    return NextResponse.json({
      success: true,
      message: `Management member ${cleanName} (${cleanEmail}) added successfully.`,
      staff: newStaff
    });
  } catch (error: unknown) {
    console.error("Error in POST /api/admin/staff:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to add management member." },
      { status: 500 }
    );
  }
}

// ── DELETE: Revoke management / staff member access ──
export async function DELETE(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Only Master Administrators can revoke management access." },
        { status: 403 }
      );
    }

    if (!prisma) {
      return NextResponse.json({ error: "Database service unavailable." }, { status: 503 });
    }

    const { staffId } = await req.json();
    if (!staffId) {
      return NextResponse.json({ error: "Staff member ID is required." }, { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: staffId }
    });

    if (!targetUser) {
      return NextResponse.json({ error: "Management member not found." }, { status: 404 });
    }

    if (targetUser.role === "ADMIN") {
      return NextResponse.json(
        { error: "Master Administrator accounts cannot be deleted here." },
        { status: 403 }
      );
    }

    // Demote to GUEST or delete
    await prisma.user.delete({
      where: { id: staffId }
    });

    return NextResponse.json({
      success: true,
      message: `Management access for ${targetUser.name} (${targetUser.email}) revoked.`,
    });
  } catch (error: unknown) {
    console.error("Error in DELETE /api/admin/staff:", error);
    return NextResponse.json(
      { error: "Failed to revoke management access." },
      { status: 500 }
    );
  }
}
