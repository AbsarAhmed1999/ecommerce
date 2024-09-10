import { NextRequest, NextResponse } from "next/server";
import { JwtAuthService } from "@/app/utils/jwt-service";
import { verifyGoogleToken } from "@/app/utils/google-auth-service";
import { registerUserServiceThroughGoogle } from "@/Service/googleUserService";

export async function POST(req: NextRequest) {
  const jwtAuthService = new JwtAuthService();
  const token = req.cookies.get("token")?.value;
  const body = await req.json();
  const { userInfo } = body;
  console.log("Inside POST userINFO", userInfo);

  // If both tokens are missing, the user is not authenticated
  if (!token && !userInfo) {
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
      const result = await registerUserServiceThroughGoogle(googleUser);
      console.log("result ++ ", result);
      console.log("VERIFY GOOGLE TOKEN", googleUser);

      // Set the JWT as a cookie
      // const response = NextResponse.json({
      //   message: "Google login successful",
      // });
      // response.cookies.set("token", { httpOnly: true });

      // return response;
    }

    // Handle JWT-based login
    // if (token) {
    //   const decoded = jwtAuthService.verifyToken(token);
    //   return NextResponse.json({
    //     message: "Protected resource accessed",
    //     user: decoded,
    //   });
    // }
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
