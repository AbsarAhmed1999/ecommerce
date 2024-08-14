import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Log the incoming cookies for debugging (optional)
  console.log("Incoming cookies:", req.cookies);

  // Create a response
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Set the token cookie to an expired date to remove it
  response.cookies.set("token", "", {
    expires: new Date(0), // Expiry date in the past
    path: "/", // Ensure you set the path if needed
    httpOnly: true, // Optional: set this if your cookie was HttpOnly
    // secure: process.env.NODE_ENV === "production", // Optional: set this to true in production
    secure: true,
  });

  return response;
}
