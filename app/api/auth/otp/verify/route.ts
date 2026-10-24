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

    if (!prisma) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const record = await prisma.otpVerification.findFirst({
      where: {
        target: cleanTarget,
        purpose: cleanPurpose,
        code: cleanCode,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }

    if (new Date() > new Date(record.expiresAt)) {
      return NextResponse.json({ error: "Verification code has expired. Please request a new one." }, { status: 400 });
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
