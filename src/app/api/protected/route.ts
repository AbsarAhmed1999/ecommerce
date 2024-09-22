import { NextRequest, NextResponse } from "next/server";
import { registerUserServiceThroughGoogle } from "@/Service/googleUserService";
import { connectToMongoDB } from "@/database/connection";
import { JwtAuthService } from "@/app/utils/jwt-service";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const body = await req.json();
  const { userInfo } = body;

  // Check for token and user info
  if (!token && !userInfo) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  if (token) {
    // Verify the JWT token
    const jwtAuthService = new JwtAuthService();
    const decodedToken = jwtAuthService.verifyToken(token);

    if (!decodedToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  }

  if (userInfo) {
    const {
      id: googleId,
      email,
      verified_email,
      name: fullName,
      picture: profileImage,
    } = userInfo;

    try {
      await connectToMongoDB();
      // Handle Google OAuth login
      const googleUser = {
        googleId,
        email,
        verified_email,
        fullName,
        profileImage,
      };
      const response = await registerUserServiceThroughGoogle(googleUser);

      return response;
    } catch (err) {
      return NextResponse.json(
        { message: "Error processing user" },
        { status: 500 }
      );
    }
  }
}
