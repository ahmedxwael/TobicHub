import prisma from "@/prisma";
import { ParamsType } from "@/shared/types";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: ParamsType
) => {
  const data = await request.json();

  try {
    const topic = await prisma.topic.update({ where: { id }, data });

    return NextResponse.json(topic, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (
  request: NextRequest,
  { params: { id } }: ParamsType
) => {
  try {
    const data = await request.json();

    await prisma.topic.delete({ where: { id } });
    await prisma.user.update({
      where: { id: data.authorId },
      data: { topicsCount: { decrement: 1 } },
    });

    return NextResponse.json(
      { message: "Deleted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
