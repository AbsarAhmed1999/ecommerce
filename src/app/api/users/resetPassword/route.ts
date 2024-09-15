import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/Service/verifyOtpService";
import { resetUserPasswordService } from "@/Service/resetUserPasswordService";
import { connectToMongoDB } from "@/database/connection";
export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB(); // Ensure DB is connected
    const body = await req.json();
    console.log(body);
    const { email, newPassword } = body;
    const result = await resetUserPasswordService({ email, newPassword });
    return result;
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "Failed to Update Password" },
      { status: 400 }
    );
  }
}
