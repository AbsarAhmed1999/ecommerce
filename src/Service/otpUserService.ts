import crypto from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import User from "@/model/User";
import OTP from "@/model/Otp";
import { otpStore } from "@/shared/otpStore";
export async function otpUserService(email: string) {
  //check does this email already exist in database ?
  console.log("Otp store inside otpUserService", otpStore);
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: "Email not found , please Register" },
      { status: 300 }
    );
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 }; // OTP valid for 10 minutes

  // save OTP
  const otpDoc = new OTP({ email, otp });
  await otpDoc.save();

  const sender = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SERVICE,
    auth: {
      user: process.env.USER,
      pass: process.env.GMAIL_AUTH,
    },
  });
  await sender.sendMail({
    from: process.env.USER,
    to: email,
    subject: "Your OTP code",
    text: `Your OTP code is ${otp} `,
  });
  return NextResponse.json(
    { message: "OTP Sent Successfully", email: email },
    { status: 200 }
  );
}
