import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize razorpay object
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECERT,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount } = body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "12344",
    });

    return NextResponse.json(order);
  } catch (error) {
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
