import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = { params: { id: string } };

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: ParamsType
) => {
  const data = await request.json();

  try {
    const topic = await prisma.topic.update({ where: { id }, data });

    return NextResponse.json(topic, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: ParamsType
) => {
  try {
    await prisma.topic.delete({ where: { id } });

    return NextResponse.json(
      { message: "Deleted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
