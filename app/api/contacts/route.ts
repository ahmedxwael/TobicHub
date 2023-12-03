import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.json();

  try {
    await prisma.contact.create({ data });

    return NextResponse.json(
      { message: "Contact message sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Couldn't send the message, " + error.message },
      { status: 500 }
    );
  }
};
