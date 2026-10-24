import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { target, code, newPassword } = await req.json();

    if (!target || !code || !newPassword) {
      return NextResponse.json({ error: "Mobile/Email, code, and new password are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const cleanTarget = String(target).trim().toLowerCase();
    const cleanCode = String(code).trim();

    if (!prisma) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    // 1. Check OTP verification record
    const record = await prisma.otpVerification.findFirst({
      where: {
        target: cleanTarget,
        code: cleanCode,
        purpose: "RESET_PASSWORD",
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }

    if (new Date() > new Date(record.expiresAt)) {
      return NextResponse.json({ error: "Verification code has expired. Please request a new one." }, { status: 400 });
    }

    // 2. Find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ phone: cleanTarget }, { email: cleanTarget }],
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    // 3. Update password
    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    // 4. Delete OTP
    await prisma.otpVerification.delete({
      where: { id: record.id },
    });

    return NextResponse.json({
      success: true,
      message: "Your password has been successfully reset. You can now log in.",
    });
  } catch (error: unknown) {
    console.error("Error in /api/auth/reset-password:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}
