import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/Service/verifyOtpService";
export async function POST(req: NextRequest) {
  console.log("PSOT HAHAHA");
  try {
    const body = await req.json();
    console.log("Insdie verify otp");
    const { email, otp } = body;
    console.log("email , otp", email, otp);
    const result = await verifyOTP(email, otp);
    return result;
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "OTP Not verified" },
      { status: 400 }
    );
  }
}
