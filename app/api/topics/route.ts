import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.json();

  try {
    await prisma.topic.create({ data });
    await prisma.user.update({
      where: { id: data.authorId },
      data: { topicsCount: { increment: 1 } },
    });

    return NextResponse.json(
      { message: "Topic created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Couldn't add the topic, " + error.message },
      { status: 500 }
    );
  }
};
