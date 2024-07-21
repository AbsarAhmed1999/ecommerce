import { connectToMongoDB } from "@/database/connection";
import { loginUserService } from "@/Service/loginUserService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, user } = await loginUserService(body);
    const date = new Date();
    const response = NextResponse.json({ user }, { status: 201 });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Error in API route:", error); // Log the error for debugging
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
