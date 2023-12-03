import prisma from "@/prisma";
import { ParamsType } from "@/shared/types";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (_: NextRequest, { params }: ParamsType) => {
  try {
    await prisma.contact.delete({ where: { id: params.id } });

    return NextResponse.json(
      { message: "Contact message deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Couldn't delete the message, " + error.message },
      { status: 500 }
    );
  }
};
