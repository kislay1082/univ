import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, price, image } = body;
    if (!title || !description || !price || !image)
      return new NextResponse("Missing Information", { status: 400 });

    const user = await getCurrentUser();

    if(!user) return new NextResponse("Unauthorized", { status: 401 });

    const ad = await prisma.bookAd.create({
      data: {
        title,
        description,
        price,
        image,
        SellerId: user.id
      },
    });
    return NextResponse.json(ad);
  } catch (error) {
    console.error(error);
    console.log("Error in createAd route");
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
