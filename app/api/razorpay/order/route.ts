import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt } = body;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_sample_key",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "sample_secret_key"
    });

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100), // convert to paise
      currency,
      receipt: receipt || `rec_${Date.now()}`
    });

    return NextResponse.json({ ok: true, order });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create Razorpay order";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
