import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const POST = async (request: NextRequest) => {
  const data = await request.formData();
  const image = data.get("image") as any;

  console.log("data: ", data.get("image"));
  if (!image) {
    return NextResponse.json({ message: "Image not found" }, { status: 404 });
  }

  const buffer = Buffer.from(await image.arrayBuffer());

  const path = join("/", "tmp", image.name);
  console.log("path", path);

  await writeFile(path, buffer);

  return NextResponse.json({ message: "Success" }, { status: 200 });
};
