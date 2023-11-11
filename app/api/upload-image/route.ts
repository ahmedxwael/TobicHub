import prisma from "@/prisma";
import { baseUrl } from "@/shared/flags";
import { writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const POST = async (request: NextRequest) => {
  const data = await request.formData();
  const userId = request.nextUrl.searchParams.get("userId");

  const image = data.get("image") as any;

  if (!image) {
    return NextResponse.json({ message: "Image not found" }, { status: 404 });
  }

  const buffer = Buffer.from(await image.arrayBuffer());

  const relativeImagePath = `${nanoid(64)}-${image.name}`;
  const path = join(process.cwd(), "public/images", relativeImagePath);
  const imageSlicedPath = path
    .split("public\\")
    .slice(-1)[0]
    .replace("\\", "/");

  await writeFile(path, buffer);

  await prisma.user.update({
    where: { id: userId! },
    data: { image: `${baseUrl}/${imageSlicedPath}` },
  });

  return NextResponse.json({ message: "Success" }, { status: 200 });
};
