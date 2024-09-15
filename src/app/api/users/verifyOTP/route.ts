import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/Service/verifyOtpService";
import { connectToMongoDB } from "@/database/connection";
export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB(); // Ensure DB is connected
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
