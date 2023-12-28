import prisma from "@/prisma";
import { ParamsType } from "@/shared/types";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: ParamsType
) => {
  const data = await request.json();

  try {
    await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      { message: "User updated successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: ParamsType
) => {
  try {
    await prisma.topic.deleteMany({ where: { authorId: id } });
    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { message: "User deleted successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
