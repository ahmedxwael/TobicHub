import prisma from "@/prisma";
import { ParamsType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: ParamsType
) => {
  const data = await request.json();

  try {
    await prisma.user.update({ where: { id }, data });

    return NextResponse.json(
      { message: "User updated successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
