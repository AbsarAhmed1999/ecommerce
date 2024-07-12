import { registerUserService } from "@/Service/registerUserService";
import { connectToMongoDB } from "@/database/connection";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  await connectToMongoDB();
  try {
    const body = await req.json();
    const newUser = await registerUserService(body);
    console.log("THIS IS NEW USER", newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
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
