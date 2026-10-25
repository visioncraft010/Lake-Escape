import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, generateToken, hashPassword, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Admin ID (email or mobile) and password are required." },
        { status: 400 }
      );
    }

    const cleanId = String(identifier).trim().toLowerCase();

    if (!prisma) {
      return NextResponse.json({ error: "Database service unavailable." }, { status: 503 });
    }

    // Default permanent admin identity
    const defaultAdminEmail = "info@lakeescape.in";
    const defaultAdminPhone = "9762985044";
    const defaultAdminPass = "LakeEscape@2026";

    // Auto-ensure permanent admin exists if logging in with the default admin identity
    if (cleanId === defaultAdminEmail || cleanId === defaultAdminPhone) {
      const adminExists = await prisma.user.findFirst({
        where: {
          OR: [
            { email: defaultAdminEmail },
            { phone: defaultAdminPhone }
          ]
        }
      });

      if (!adminExists) {
        const passwordHash = await hashPassword(defaultAdminPass);
        await prisma.user.create({
          data: {
            name: "Lake Escape Administrator",
            email: defaultAdminEmail,
            phone: defaultAdminPhone,
            passwordHash,
            role: "ADMIN",
            phoneVerified: true,
            emailVerified: true,
          }
        });
      }
    }

    // Query user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanId },
          { phone: cleanId }
        ]
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid administrator ID or password." },
        { status: 401 }
      );
    }

    // Strict role check: Only ADMIN or STAFF allowed in the admin portal
    if (user.role !== "ADMIN" && user.role !== "STAFF") {
      return NextResponse.json(
        { error: "Access denied. This portal is strictly for Lake Escape Administrators and Management." },
        { status: 403 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid administrator ID or password." },
        { status: 401 }
      );
    }

    const sessionPayload = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(sessionPayload);

    const res = NextResponse.json({
      success: true,
      user: sessionPayload,
      message: `Welcome back, ${user.name}`,
    });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return res;
  } catch (error: unknown) {
    console.error("Error in /api/admin/auth/login:", error);
    return NextResponse.json(
      { error: "Authentication system error. Please retry." },
      { status: 500 }
    );
  }
}
