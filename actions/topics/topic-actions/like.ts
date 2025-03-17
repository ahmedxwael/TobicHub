"use server";

import { userAllowedFields } from "@/modules/topics/services/topics-services";
import { Like } from "@/modules/topics/types";
import prisma from "@/prisma";

type LikeAction = {
  topicId: string;
  userId: string;
};

export async function getIsLikedTopic({ topicId, userId }: LikeAction) {
  const storedLike = await prisma.like.findFirst({
    where: {
      topicId,
      userId,
    },
  });

  return !!storedLike;
}

export async function getTopicLikes(
  topicId: string
): Promise<{ likes: Like[] }> {
  const likes = (await prisma.like.findMany({
    where: {
      topicId,
    },
    include: {
      user: {
        select: userAllowedFields,
      },
      topic: true,
    },
  })) as Like[];

  return { likes };
}

export async function toggleLikeAction({ topicId, userId }: LikeAction) {
  const storedLike = await prisma.like.findFirst({
    where: {
      topicId,
      userId,
    },
  });

  if (!storedLike) {
    await prisma.$transaction([
      // Create a new like
      prisma.like.create({
        data: {
          topicId,
          userId,
        },
      }),

      // Update the topic's like count
      prisma.topic.update({
        where: { id: topicId },
        data: {
          likesCount: { increment: 1 },
        },
      }),

      // Update the user's like count
      prisma.user.update({
        where: { id: userId },
        data: {
          likesCount: { increment: 1 },
        },
      }),
    ]);

    return;
  }

  await prisma.$transaction([
    // Remove the like
    prisma.like.delete({
      where: { id: storedLike.id },
    }),

    // Decrease the topic's like count
    prisma.topic.update({
      where: { id: topicId },
      data: {
        likesCount: { decrement: 1 },
      },
    }),

    // Decrease the user's like count
    prisma.user.update({
      where: { id: userId },
      data: {
        likesCount: { decrement: 1 },
      },
    }),
  ]);
}
