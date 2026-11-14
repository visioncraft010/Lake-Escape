import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { ok: false, error: "Payment gateway is not configured. Please contact support." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { amount, currency = "INR", receipt } = body;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json(
        { ok: false, error: "A valid payment amount is required." },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100), // convert to paise
      currency,
      receipt: receipt || `rec_${Date.now()}`,
    });

    return NextResponse.json({ ok: true, order });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create Razorpay order";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
