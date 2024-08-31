import { NextRequest } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    // instead of writing here create an OTP service for sending
    let otpStore: { [key: string]: string } = {};
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = otp;
    const sender = nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: "aabsar434@gmail.com",
        pass: "password",
      },
    });
    await sender.sendMail({
      from: "aabsar434@gmail.com",
      to: email,
      subject: "Your OTP code",
      text: `Your OTP code is ${otp} `,
    });
  } catch (e) {}
}
