/* eslint-disable prettier/prettier */
"use server";

import prisma from "@/prisma";

export async function addTopicAction(body: any) {
  const { author, ...rest } = body;
  try {
    await prisma.topic.create({
      data: {
        ...rest,
        author: {
          connect: {
            email: author.email,
          },
        },
      },
      include: {
        author: true,
      },
    });
    await prisma.user.update({
      where: {
        email: author.email,
      },

      data: {
        topicsCount: { increment: 1 },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add topic");
  }
}
