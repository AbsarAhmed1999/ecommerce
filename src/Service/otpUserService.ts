import crypto from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function otpUserService(email: string) {
  //check does this email already exist in database ?
  // const checkEmail =

  let otpStore: { [key: string]: string } = {};
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore[email] = otp;
  const sender = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      user: "absar8857@gmail.com",
      pass: `${process.env.GMAIL_AUTH}`,
    },
  });
  await sender.sendMail({
    from: "absar8857@gmail.com",
    to: email,
    subject: "Your OTP code",
    text: `Your OTP code is ${otp} `,
  });
  return NextResponse.json(
    { message: "OTP Sent Successfully" },
    { status: 200 }
  );
}
