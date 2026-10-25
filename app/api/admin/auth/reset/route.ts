import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateRandomOtp, sendEmailOtp, sendPhoneOtp } from "@/lib/otpService";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { action, identifier, code, newPassword } = await req.json();

    if (!identifier) {
      return NextResponse.json({ error: "Registered email or mobile number is required." }, { status: 400 });
    }

    const cleanId = String(identifier).trim().toLowerCase();

    if (!prisma) {
      return NextResponse.json({ error: "Database service unavailable." }, { status: 503 });
    }

    // Find the admin/management user
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanId },
          { phone: cleanId }
        ]
      }
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "STAFF")) {
      return NextResponse.json(
        { error: "No registered Administrator or Management account found with this ID." },
        { status: 404 }
      );
    }

    // ── ACTION 1: REQUEST OTP ──
    if (action === "request") {
      const isEmail = cleanId.includes("@");
      const targetType = isEmail ? "EMAIL" : "PHONE";
      const targetAddress = isEmail ? user.email : user.phone;

      const otp = generateRandomOtp();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      // Invalidate existing reset OTPs
      await prisma.otpVerification.deleteMany({
        where: {
          target: targetAddress.toLowerCase(),
          purpose: "ADMIN_RESET",
        }
      });

      // Save new OTP
      await prisma.otpVerification.create({
        data: {
          target: targetAddress.toLowerCase(),
          type: targetType,
          code: otp,
          purpose: "ADMIN_RESET",
          expiresAt,
          verified: false,
        }
      });

      // Dispatch OTP
      if (targetType === "EMAIL") {
        const dispatchRes = await sendEmailOtp(targetAddress, otp, "RESET_PASSWORD");
        if (!dispatchRes.success) {
          return NextResponse.json(
            { error: dispatchRes.message || "Failed to send reset code to registered email." },
            { status: 502 }
          );
        }
      } else {
        const dispatchRes = await sendPhoneOtp(targetAddress, otp, "RESET_PASSWORD");
        if (!dispatchRes.success) {
          return NextResponse.json(
            { error: dispatchRes.message || "Failed to send reset SMS to registered mobile." },
            { status: 502 }
          );
        }
      }

      const isDev = process.env.NODE_ENV !== "production";
      const fast2SmsKey = process.env.FAST2SMS_API_KEY;

      return NextResponse.json({
        success: true,
        target: targetAddress,
        type: targetType,
        message: `Security verification code sent to registered ${targetType.toLowerCase()} (${targetAddress})`,
        ...(isDev || (targetType === "PHONE" && !fast2SmsKey) ? { devCode: otp } : {}),
      });
    }

    // ── ACTION 2: CONFIRM OTP & RESET PASSWORD ──
    if (action === "confirm") {
      if (!code || !newPassword) {
        return NextResponse.json(
          { error: "Verification code and new password are required." },
          { status: 400 }
        );
      }

      if (String(newPassword).length < 6) {
        return NextResponse.json(
          { error: "New password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      const cleanCode = String(code).trim();
      const isEmail = cleanId.includes("@");
      const targetAddress = (isEmail ? user.email : user.phone).toLowerCase();

      const otpRecord = await prisma.otpVerification.findFirst({
        where: {
          target: targetAddress,
          purpose: "ADMIN_RESET",
          code: cleanCode,
        },
        orderBy: { createdAt: "desc" }
      });

      if (!otpRecord) {
        return NextResponse.json(
          { error: "Invalid verification code. Please check and try again." },
          { status: 400 }
        );
      }

      if (new Date() > new Date(otpRecord.expiresAt)) {
        return NextResponse.json(
          { error: "Verification code has expired. Please request a new one." },
          { status: 400 }
        );
      }

      // Update password hash permanently
      const passwordHash = await hashPassword(String(newPassword));
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash }
      });

      // Cleanup OTP
      await prisma.otpVerification.deleteMany({
        where: {
          target: targetAddress,
          purpose: "ADMIN_RESET",
        }
      });

      return NextResponse.json({
        success: true,
        message: "Permanent admin password successfully updated. You may now log in.",
      });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (error: unknown) {
    console.error("Error in /api/admin/auth/reset:", error);
    return NextResponse.json(
      { error: "Reset service encountered an error." },
      { status: 500 }
    );
  }
}
