import { NextResponse } from "next/server";
import { listPhotosFresh } from "@/lib/r2";

export async function GET() {
  const photos = await listPhotosFresh();
  return NextResponse.json({ photos });
}
