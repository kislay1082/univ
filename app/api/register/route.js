import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { VerifyEmail } from "@/components/verify-email";

import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!email || !name || !password)
      return new NextResponse("Missing Information", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: user.id },
      process.env.NEXTAUTH_PROVIDER_EMAIL_VERIFICATION_SECRET + email,
      {
        expiresIn: "1d",
      }
    );

    const url = `${process.env.NEXTAUTH_URL}/api/verify?token=${token}&email=${email}`;

    const emailHtml = render(<VerifyEmail url={url} />);

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      secure: true,
      port: 465,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });

    const options = {
      from: process.env.RESEND_SENDER_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: emailHtml,
    };

    await transporter.sendMail(options);

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    console.log("Error in register route");
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
