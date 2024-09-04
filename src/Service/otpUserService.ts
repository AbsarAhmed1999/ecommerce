import crypto from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import User from "@/model/User";
export async function otpUserService(email: string) {
  //check does this email already exist in database ?
  console.log("EMAIL inside otpUserService", email);
  const isEmailExist = await User.find({ email });
  console.log("isEMailExistr", isEmailExist);
  if (!isEmailExist) {
    return NextResponse.json(
      { message: "Email not found , please Register" },
      { status: 300 }
    );
  }

  let otpStore: { [key: string]: string } = {};
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore[email] = otp;
  const sender = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      user: `${process.env.USER}`,
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
