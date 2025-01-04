/* eslint-disable prettier/prettier */
import prisma from "@/prisma";

export async function getTopicForActions(id: string) {
  try {
    const topic = await prisma.topic.findUnique({
      where: { id },
      select: {
        id: true,
        approved: true,
        author: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!topic) {
      throw new Error("Topic not found");
    }

    return topic;
  } catch (error: any) {
    console.error("Error fetching topic:", error);
    return undefined;
  }
}
