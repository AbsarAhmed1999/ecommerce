import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;
    console.log("EMAIL INSIDE sendOTP", email);
    // instead of writing here create an OTP service for sending
  } catch (e) {
    console.log("Error insdie SnedOTP", e);
  }
}
