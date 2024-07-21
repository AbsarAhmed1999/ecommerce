// pages/api/protected.ts
import { NextRequest, NextResponse } from "next/server";
import { JwtAuthService } from "@/app/utils/jwt-service";

export async function GET(req: NextRequest) {
  const jwtAuthService = new JwtAuthService();
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    // Verify the JWT
    const decoded = jwtAuthService.verifyToken(token);
    console.log("DECODED", decoded);
    return NextResponse.json({
      message: "Protected resource accessed",
      user: decoded,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
