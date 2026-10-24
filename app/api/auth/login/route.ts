import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, generateToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json({ error: "Mobile number and password are required" }, { status: 400 });
    }

    const cleanPhone = String(phone).trim().toLowerCase();

    if (!prisma) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    // Look for user by phone (or allow email for flexibility)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: cleanPhone },
          { email: cleanPhone }
        ]
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid mobile number or password." }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid mobile number or password." }, { status: 401 });
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
      message: "Logged in successfully",
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
    console.error("Error in /api/auth/login:", error);
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
