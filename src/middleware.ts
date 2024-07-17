import { NextResponse } from "next/server";

export function middleware(req: Request) {
  console.log(`Request made to: ${req.url}`);

  return NextResponse.next();
}

export const config = {
  matcher: "/api/users/dashboard",
};
