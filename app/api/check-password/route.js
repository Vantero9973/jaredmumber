import { NextResponse } from "next/server";

export async function POST(request) {
  const { password } = await request.json();
  const valid = password === process.env.UPLOAD_PASSWORD;
  return NextResponse.json({ valid });
}
