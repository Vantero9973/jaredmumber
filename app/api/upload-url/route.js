import { NextResponse } from "next/server";
import { getUploadUrl } from "@/lib/r2";

export async function POST(request) {
  const { password, filename, contentType } = await request.json();

  if (password !== process.env.UPLOAD_PASSWORD) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const { uploadUrl, key } = await getUploadUrl(filename, contentType);
  return NextResponse.json({ uploadUrl, key });
}
