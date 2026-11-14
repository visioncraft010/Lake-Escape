import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { target, code, purpose = "SIGNUP" } = await req.json();

    if (!target || !code) {
      return NextResponse.json({ error: "Target and code are required" }, { status: 400 });
    }

    const cleanTarget = String(target).trim().toLowerCase();
    const cleanCode = String(code).trim();
    const cleanPurpose = String(purpose).toUpperCase();

    // Validate code format — must be exactly 6 digits
    if (!/^\d{6}$/.test(cleanCode)) {
      return NextResponse.json({ error: "Invalid verification code format" }, { status: 400 });
    }

    if (!prisma) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    // Fetch the latest OTP record for this target (regardless of code, to check attempts)
    const record = await prisma.otpVerification.findFirst({
      where: {
        target: cleanTarget,
        purpose: cleanPurpose,
        verified: false,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json({ error: "No pending verification found. Please request a new code." }, { status: 400 });
    }

    if (new Date() > new Date(record.expiresAt)) {
      return NextResponse.json({ error: "Verification code has expired. Please request a new one." }, { status: 400 });
    }

    // Brute-force protection: max 5 attempts per OTP
    const MAX_ATTEMPTS = 5;
    const attempts = (record as { attempts?: number }).attempts ?? 0;
    if (attempts >= MAX_ATTEMPTS) {
      await prisma.otpVerification.delete({ where: { id: record.id } });
      return NextResponse.json(
        { error: "Too many failed attempts. Please request a new verification code." },
        { status: 429 }
      );
    }

    if (record.code !== cleanCode) {
      // Increment attempt counter
      await prisma.otpVerification.update({
        where: { id: record.id },
        data: { attempts: attempts + 1 } as Record<string, unknown>,
      });
      const remaining = MAX_ATTEMPTS - attempts - 1;
      return NextResponse.json(
        { error: `Invalid verification code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.` },
        { status: 400 }
      );
    }

    // Mark as verified
    await prisma.otpVerification.update({
      where: { id: record.id },
      data: { verified: true },
    });

    return NextResponse.json({
      success: true,
      verified: true,
      message: "Verification successful",
    });
  } catch (error: unknown) {
    console.error("Error in /api/auth/otp/verify:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
