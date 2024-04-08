import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email)
      return new NextResponse("Missing Information", { status: 400 });

    const isValid = await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.NEXTAUTH_PROVIDER_EMAIL_VERIFICATION_SECRET + email,
        (err) => {
          if (err) resolve(false);
          resolve(true);
        }
      );
    });

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        verified: isValid,
      },
    });

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/register?verified=${isValid}`
    );
  } catch (error) {
    console.error(error);
    console.log("Error in Verify route");
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
