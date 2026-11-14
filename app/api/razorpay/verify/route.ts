import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json(
        { ok: false, error: "Payment gateway is not configured." },
        { status: 503 }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { ok: false, error: "Missing payment verification parameters." },
        { status: 400 }
      );
    }

    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(text)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      return NextResponse.json({ ok: true, message: "Payment signature verified successfully" });
    } else {
      return NextResponse.json({ ok: false, message: "Signature verification failed" }, { status: 400 });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
