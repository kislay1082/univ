"use server";

import { WithdrawEmail } from "@/components/withdraw-email";
import prisma from "@/lib/prismadb";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

export const sendWithdrawEmail = async (user) => {
  const { name, email, balance } = user;

  if (balance <= 0) {
    return;
  }

  const emailHtml = render(
    <WithdrawEmail name={name} email={email} balance={balance} />
  );

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
    to: process.env.WITHDRAW_RECEIVER_EMAIL,
    subject: "Withdraw Requested",
    html: emailHtml,
  };

  const info = await transporter.sendMail(options);

  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      balance: 0,
    },
  });

  return {
    status: "Withdraw request sent!",
  };
};
