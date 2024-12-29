import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();

    await prisma.task.create({ data });
    await prisma.user.update({
      where: { id: data.userId },
      data: { tasksCount: { increment: 1 } },
    });

    return NextResponse.json(
      { message: "Task created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  const data = await request.json();

  // await prisma.task.deleteMany({
  //   where: {
  //     id: {
  //       in: data.ids,
  //     },
  //   },
  // });
};
