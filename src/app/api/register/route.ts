import { registerUserService } from "@/Service/registerUserService";
import { connectToMongoDB } from "@/database/connection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Ensure the database connection is established
    const body = await req.json(); // Parse the request body
    const newUser = await registerUserService(body); // Register the new user
    console.log("THIS IS NEW USER", newUser);
    return NextResponse.json(newUser, { status: 201 });
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
