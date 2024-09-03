import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("REQI inside verify OTP", await req.json());
  try {
  } catch (e) {}
}
