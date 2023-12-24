import prisma from "@/prisma";
import { ParamsType } from "@/shared/types";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest, { params }: ParamsType) => {
  try {
    const data = await request.json();

    await prisma.task.update({ where: { id: params.id }, data });

    return NextResponse.json(
      { message: "Task updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(error);
  }
};

export const DELETE = async (request: NextRequest, { params }: ParamsType) => {
  try {
    await prisma.task.delete({ where: { id: params.id } });

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(error);
  }
};
