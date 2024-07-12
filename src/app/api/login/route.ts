import { connectToMongoDB } from "@/database/connection";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await connectToMongoDB();
  const body = req.json();
}
