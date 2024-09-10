import { NextRequest, NextResponse } from "next/server";
import { JwtAuthService } from "@/app/utils/jwt-service";
import { verifyGoogleToken } from "@/app/utils/google-auth-service";

export async function GET(req: NextRequest) {
  const jwtAuthService = new JwtAuthService();
  const token = req.cookies.get("token")?.value;
  const { googleToken } = await req.json();
  console.log("GOOGLE TOKEN", googleToken);

  // If both tokens are missing, the user is not authenticated
  if (!token && !googleToken) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    // Handle Google OAuth login
    if (googleToken) {
      const googleUser = await verifyGoogleToken(googleToken);

      // Create JWT for Google user
      const newToken = jwtAuthService.createToken({
        id: googleUser.id,
        email: googleUser.email,
      });

      // Set the JWT as a cookie
      const response = NextResponse.json({
        message: "Google login successful",
      });
      response.cookies.set("token", newToken, { httpOnly: true });

      return response;
    }

    // Handle JWT-based login
    if (token) {
      const decoded = jwtAuthService.verifyToken(token);
      return NextResponse.json({
        message: "Protected resource accessed",
        user: decoded,
      });
    }
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
