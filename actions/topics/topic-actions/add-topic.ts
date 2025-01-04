"use server";

import prisma from "@/prisma";

export async function addTopicAction(body: any) {
  const { author, ...rest } = body;

  try {
    // Use a transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Create the topic
      const newTopic = await tx.topic.create({
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

      // Update user's topic count
      await tx.user.update({
        where: {
          email: author.email,
        },
        data: {
          topicsCount: { increment: 1 },
        },
      });

      return newTopic;
    });
  } catch (error) {
    throw new Error("Failed to add topic");
  }
}
