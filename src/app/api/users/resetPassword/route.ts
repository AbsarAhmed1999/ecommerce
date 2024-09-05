import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/Service/verifyOtpService";
import { resetUserPasswordService } from "@/Service/resetUserPasswordService";
export async function POST(req: NextRequest) {
  try {
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
