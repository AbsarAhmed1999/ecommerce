import { NextRequest, NextResponse } from "next/server";
import { JwtAuthService } from "@/app/utils/jwt-service";
import { registerUserServiceThroughGoogle } from "@/Service/googleUserService";

export async function POST(req: NextRequest) {
  const jwtAuthService = new JwtAuthService();
  const token = req.cookies.get("token")?.value;
  const body = await req.json();
  const { userInfo } = body;

  // If both tokens are missing, the user is not authenticated
  // if (!token && !userInfo) {
  //   return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  // }

  if (!userInfo) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const {
    id: googleId,
    email,
    verified_email,
    name: fullName,
    picture: profileImage,
  } = userInfo;

  try {
    // Handle Google OAuth login
    if (userInfo) {
      const googleUser = {
        googleId,
        email,
        verified_email,
        fullName,
        profileImage,
      };
      const response = await registerUserServiceThroughGoogle(googleUser);

      return response;
    }
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
