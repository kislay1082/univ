import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user, bookAd, razorpay, amount } = body;
    if (!user || !bookAd || !razorpay || !amount)
      return new NextResponse("Missing Information", { status: 400 });

    const order = await prisma.order.create({
      data: {
        SellerId: bookAd.Seller?.id,
        BuyerId: user.id,
        BookAdId: bookAd.id,
        orderId: razorpay.razorpay_order_id,
        paymentId: razorpay.razorpay_payment_id,
        amount,
      },
    });

    if (!order) {
      return new NextResponse("Error in registering order", { status: 500 });
    }

    const updatedBookAd = await prisma.bookAd.update({
      where: { id: bookAd.id },
      data: { sold: true },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    console.log("Error in registerOrder route");
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
