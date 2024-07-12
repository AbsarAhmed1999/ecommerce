import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  req.headers.get("Authorization");
  return new Response(body);
}
