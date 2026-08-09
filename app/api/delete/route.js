import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deletePhoto } from "@/lib/r2";

export async function POST(request) {
  const { password, key } = await request.json();

  if (password !== process.env.UPLOAD_PASSWORD) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  await deletePhoto(key);
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
