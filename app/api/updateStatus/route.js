import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, status, rating } = body;
    if (!id || !status)
      return new NextResponse("Missing Information", { status: 400 });

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    if (status.toLowerCase() === "accepted") {
      const seller = await prisma.user.findUnique({
        where: {
          id: order.SellerId,
        },
      });

      const newRating =
        (seller.rating * seller.ratingCount + rating) /
        (seller.ratingCount + 1);
      const updatedSeller = await prisma.user.update({
        where: {
          id: seller.id,
        },
        data: {
          rating: newRating,
          ratingCount: seller.ratingCount + 1,
          balance: seller.balance + order.amount,
        },
      });
    }

    if (status.toLowerCase() === "cancelled") {
      const updatedBookAd = await prisma.bookAd.update({
        where: { id: order.BookAdId },
        data: { sold: false },
      });

      const buyer = await prisma.user.update({
        where: {
          id: order.BuyerId,
        },
        data: {
          balance: {
            increment: order.amount,
          },
        },
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    console.log("Error in updateStatus route");
    console.log("Error in updateStatus route");
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
