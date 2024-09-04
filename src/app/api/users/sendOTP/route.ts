import { otpUserService } from "@/Service/otpUserService";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;
    const result = await otpUserService(email);
    return result;
    // instead of writing here create an OTP service for sending
  } catch (e) {
    console.log("Error inside sendOTP", e);
  }
}
