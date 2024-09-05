import OTP from "@/model/Otp"; // The OTP model
import { NextResponse } from "next/server";

export async function verifyOTP(email: string, otp: string) {
  const decodeEmail = decodeURIComponent(email);
  console.log("decodedEMail", decodeEmail);
  const otpDoc = await OTP.findOne({ email: decodeEmail, otp });
  console.log("inside verifyOTP service", otpDoc);
  if (!otpDoc) {
    return NextResponse.json(
      { success: false, message: "OTP not found or expired" },
      { status: 400 }
    );
  } else {
    await OTP.deleteOne({ email: decodeEmail });
    return NextResponse.json(
      { success: true, message: "User found", data: { decodeEmail } },
      { status: 200 }
    );
  }
  // Optionally delete OTP after successful verification
}
