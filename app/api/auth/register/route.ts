import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, generateToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { 
      name, 
      phone, 
      email, 
      password,
      avatarUrl,
      dietaryPreference,
      dietaryNotes,
      celebrationDate,
      emergencyContact,
      idTypeNumber,
      specialPreferences,
    } = await req.json();

    if (!name || !phone || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const cleanName = String(name).trim();
    const cleanPhone = String(phone).trim().toLowerCase();
    const cleanEmail = String(email).trim().toLowerCase();

    if (!prisma) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    // 1. Verify that Phone was verified via OTP
    const phoneRecord = await prisma.otpVerification.findFirst({
      where: {
        target: cleanPhone,
        type: "PHONE",
        purpose: "SIGNUP",
        verified: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!phoneRecord) {
      return NextResponse.json(
        { error: "Mobile number has not been verified. Please verify your mobile number with the OTP code first." },
        { status: 400 }
      );
    }

    // 2. Verify that Email was verified via OTP
    const emailRecord = await prisma.otpVerification.findFirst({
      where: {
        target: cleanEmail,
        type: "EMAIL",
        purpose: "SIGNUP",
        verified: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!emailRecord) {
      return NextResponse.json(
        { error: "Email address has not been verified. Please verify your email with the OTP code first." },
        { status: 400 }
      );
    }

    // 3. Check for duplicates
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ phone: cleanPhone }, { email: cleanEmail }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this phone or email already exists. Please log in." },
        { status: 409 }
      );
    }

    // 4. Hash password & create user
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: cleanName,
        phone: cleanPhone,
        phoneVerified: true,
        email: cleanEmail,
        emailVerified: true,
        passwordHash,
        role: "GUEST",
        avatarUrl: avatarUrl ? String(avatarUrl).trim() : null,
        dietaryPreference: dietaryPreference ? String(dietaryPreference).trim() : null,
        dietaryNotes: dietaryNotes ? String(dietaryNotes).trim() : null,
        celebrationDate: celebrationDate ? String(celebrationDate).trim() : null,
        emergencyContact: emergencyContact ? String(emergencyContact).trim() : null,
        idTypeNumber: idTypeNumber ? String(idTypeNumber).trim() : null,
        specialPreferences: specialPreferences ? String(specialPreferences).trim() : null,
      },
    });

    // 5. Clean up used OTPs
    await prisma.otpVerification.deleteMany({
      where: {
        target: { in: [cleanPhone, cleanEmail] },
        purpose: "SIGNUP",
      },
    });

    // 6. Generate Session Token & set HttpOnly Cookie
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
      message: "Account registered successfully",
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
    console.error("Error in /api/auth/register:", error);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
