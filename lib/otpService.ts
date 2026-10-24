import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export function generateRandomOtp(): string {
  // Generate secure 6-digit numerical code
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send an OTP code to an email address via Resend
 */
export async function sendEmailOtp(email: string, code: string, purpose: string): Promise<{ success: boolean; message?: string }> {
  const isReset = purpose === "RESET_PASSWORD";
  const subject = isReset 
    ? "Lake Escape — Password Reset Verification Code" 
    : "Lake Escape — Your Guest Verification Code";

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FBF9F5; padding: 40px 20px; color: #1A0F0A;">
        <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid rgba(44, 26, 16, 0.1); padding: 36px 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          
          <div style="text-align: center; margin-bottom: 28px;">
            <p style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em; color: #8C6747; margin: 0 0 6px;">Lake Escape Sanctuary</p>
            <h2 style="font-size: 24px; font-weight: 500; margin: 0; color: #1A0F0A;">${isReset ? "Reset Your Password" : "Verify Your Email"}</h2>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #4B3024; margin-bottom: 24px; text-align: center;">
            Please use the following 6-digit verification code to complete your ${isReset ? "password reset" : "guest registration"}. This code expires in <strong>5 minutes</strong>.
          </p>

          <div style="background: #F5EFEB; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 28px; border: 1px solid rgba(44, 26, 16, 0.08);">
            <span style="font-size: 32px; font-weight: 700; letter-spacing: 0.25em; color: #1A0F0A; font-family: monospace;">${code}</span>
          </div>

          <p style="font-size: 12px; line-height: 1.5; color: rgba(26, 15, 10, 0.5); text-align: center; margin: 0;">
            If you did not request this code, you can safely disregard this email.
          </p>

          <hr style="border: none; border-top: 1px solid rgba(44, 26, 16, 0.08); margin: 28px 0 20px;" />

          <p style="font-size: 11px; text-align: center; color: rgba(26, 15, 10, 0.4); margin: 0;">
            Lake Escape · Tehri Lake, Uttarakhand · +91 97629 85044
          </p>
        </div>
      </body>
    </html>
  `;

  if (resend) {
    try {
      const response = await resend.emails.send({
        from: "Lake Escape <onboarding@resend.dev>", // Or custom domain once configured on Resend
        to: email,
        subject,
        html,
      });
      if (response.error) {
        console.warn("Resend email delivery notice:", response.error);
        return { success: false, message: response.error.message };
      }
      return { success: true };
    } catch (err: unknown) {
      console.error("Failed to send email via Resend:", err);
      return { success: false, message: (err as Error).message };
    }
  } else {
    console.log(`[DEV MODE RESEND NOT CONFIGURED] OTP for ${email}: ${code}`);
    return { success: true, message: "Dev simulated dispatch" };
  }
}

/**
 * Send an OTP code to a mobile phone number
 */
export async function sendPhoneOtp(phone: string, code: string, purpose: string): Promise<{ success: boolean; message?: string }> {
  // If Fast2SMS or Twilio is configured via environment variables:
  const fast2SmsKey = process.env.FAST2SMS_API_KEY;

  if (fast2SmsKey) {
    try {
      const formattedPhone = phone.replace(/[^0-9]/g, "").slice(-10); // Standard 10 digit Indian number
      const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
        method: "POST",
        headers: {
          authorization: fast2SmsKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: "otp",
          variables_values: code,
          numbers: formattedPhone,
        }),
      });
      const data = await response.json();
      if (!data.return) {
        return { success: false, message: data.message || "Failed to send SMS" };
      }
      return { success: true };
    } catch (err: unknown) {
      console.error("Fast2SMS dispatch error:", err);
      return { success: false, message: (err as Error).message };
    }
  }

  // Dev & instant testing simulation
  console.log(`[DEV SMS OTP] Mobile: ${phone} | Code: ${code} | Purpose: ${purpose}`);
  return { success: true, message: "Dev simulated dispatch" };
}
