import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;
    console.log("EMAIL INSIDE sendOTP", email);
    // instead of writing here create an OTP service for sending
    let otpStore: { [key: string]: string } = {};
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = otp;
    const sender = nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: "absar8857@gmail.com",
        pass: "bhnbuzlshiijwbff",
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
  } catch (e) {
    console.log("Error insdie SnedOTP", e);
  }
}
