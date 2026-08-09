import { NextResponse } from "next/server";
import { getUploadUrl } from "@/lib/r2";

export async function POST(request) {
  const { filename, contentType } = await request.json();
  const { uploadUrl, key } = await getUploadUrl(filename, contentType);
  return NextResponse.json({ uploadUrl, key });
}
