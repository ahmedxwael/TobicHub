"use server";

import prisma from "@/prisma";
import { Prisma } from "@prisma/client";

export const userAllowedFields: Prisma.UserSelect = {
  id: true,
  name: true,
  avatar: true,
};

export async function getTopicAction(
  id: string,
  options?: Prisma.TopicInclude
) {
  try {
    const topic = await prisma.topic.findUnique({
      where: { id },
      select: {
        approved: true,
        author: {
          select: userAllowedFields,
        },
        ...options,
      },
    });

    return topic;
  } catch (error: any) {
    console.log("error", error);
    return undefined;
  }
}
