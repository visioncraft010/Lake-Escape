import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateRandomOtp, sendEmailOtp, sendPhoneOtp } from "@/lib/otpService";

export async function POST(req: Request) {
  try {
    const { target, type, purpose = "SIGNUP" } = await req.json();

    if (!target || !type) {
      return NextResponse.json({ error: "Target and type are required" }, { status: 400 });
    }

    const cleanTarget = String(target).trim().toLowerCase();
    const cleanType = String(type).toUpperCase(); // "PHONE" or "EMAIL"
    const cleanPurpose = String(purpose).toUpperCase(); // "SIGNUP" or "RESET_PASSWORD"

    // If Purpose is SIGNUP, check if user already exists
    if (cleanPurpose === "SIGNUP" && prisma) {
      const existingUser = await prisma.user.findFirst({
        where: cleanType === "PHONE" ? { phone: cleanTarget } : { email: cleanTarget },
      });
      if (existingUser) {
        return NextResponse.json(
          { error: `An account with this ${cleanType.toLowerCase()} is already registered.` },
          { status: 409 }
        );
      }
    }

    // If Purpose is RESET_PASSWORD, check if user exists
    if (cleanPurpose === "RESET_PASSWORD" && prisma) {
      const existingUser = await prisma.user.findFirst({
        where: cleanType === "PHONE" ? { phone: cleanTarget } : { email: cleanTarget },
      });
      if (!existingUser) {
        return NextResponse.json(
          { error: `No registered account found with this ${cleanType.toLowerCase()}.` },
          { status: 404 }
        );
      }
    }

    // Generate 6-digit OTP
    const code = generateRandomOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save to database
    if (prisma) {
      // Invalidate any previous OTPs for this target
      await prisma.otpVerification.deleteMany({
        where: { target: cleanTarget, purpose: cleanPurpose },
      });

      await prisma.otpVerification.create({
        data: {
          target: cleanTarget,
          type: cleanType,
          code,
          purpose: cleanPurpose,
          expiresAt,
          verified: false,
        },
      });
    }

    // Dispatch OTP
    let dispatchResult: { success: boolean; message?: string } = { success: true };
    if (cleanType === "EMAIL") {
      dispatchResult = await sendEmailOtp(cleanTarget, code, cleanPurpose);
      if (!dispatchResult.success) {
        console.error(`[OTP Send] Email dispatch failed to ${cleanTarget}:`, dispatchResult.message);
        return NextResponse.json(
          { error: dispatchResult.message || "Failed to deliver verification email. Please check your email address." },
          { status: 502 }
        );
      }
    } else {
      dispatchResult = await sendPhoneOtp(cleanTarget, code, cleanPurpose);
      if (!dispatchResult.success) {
        console.error(`[OTP Send] SMS dispatch failed to ${cleanTarget}:`, dispatchResult.message);
        return NextResponse.json(
          { error: dispatchResult.message || "Failed to deliver SMS verification code. Please check your mobile number." },
          { status: 502 }
        );
      }
    }

    const isDev = process.env.NODE_ENV !== "production";
    const resendApiKey = process.env.RESEND_API_KEY;

    return NextResponse.json({
      success: true,
      message: `Verification code sent to ${cleanTarget}`,
      // In local development or if testing without paid SMS keys, return devCode for seamless instant testing
      ...(isDev || !resendApiKey ? { devCode: code } : {}),
    });
  } catch (error: unknown) {
    console.error("Error in /api/auth/otp/send:", error);
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 });
  }
}
