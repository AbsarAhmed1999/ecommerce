import { connectToMongoDB } from "@/database/connection";
import { profileUserService } from "@/Service/profileUserService";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectToMongoDB(); // Ensure DB is connected
    const body = await req.json();
    const response = await profileUserService(body);
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
