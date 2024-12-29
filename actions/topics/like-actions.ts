"use server";

import prisma from "@/prisma";

type LikeAction = {
  topicId: string;
  userId: string;
};

export async function getIsLikedTopic({ topicId, userId }: LikeAction) {
  const isLikedTopic = await prisma.like.findFirst({
    where: {
      AND: [
        {
          topicId,
          userId,
        },
      ],
    },
  });

  return !!isLikedTopic;
}

export async function toggleLikeAction({ topicId, userId }: LikeAction) {
  const isLikedTopic = await prisma.like.findFirst({
    where: {
      AND: [
        {
          topicId,
          userId,
        },
      ],
    },
  });

  if (isLikedTopic) {
    await prisma.like.delete({
      where: {
        id: isLikedTopic.id,
      },
    });

    await prisma.topic.update({
      where: {
        id: topicId,
      },
      data: {
        likesCount: {
          decrement: 1,
        },
      },
    });
  } else {
    await prisma.like.create({
      data: {
        targetId: topicId,
        userId,
      },
    });

    await prisma.topic.update({
      where: {
        id: topicId,
      },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });
  }
}
