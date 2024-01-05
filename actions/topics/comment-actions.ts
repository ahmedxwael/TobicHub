"use server";

import { Comment, NewComment } from "@/modules/topics/types";
import prisma from "@/prisma";

export async function addNewComment(comment: NewComment) {
  const newComment = await prisma.comment.create({
    data: comment,
  });

  await prisma.topic.update({
    where: {
      id: comment.topicId,
    },
    data: {
      comments: {
        connect: {
          id: newComment.id,
        },
      },
      totalComments: {
        increment: 1,
      },
    },
  });
}

type UpdateComment = {
  commentId: string;
  content: string;
};

export async function updateComment({ commentId, content }: UpdateComment) {
  await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });
}

type DeleteComment = {
  commentId: string;
  topicId: string;
};

export async function deleteComment({ commentId, topicId }: DeleteComment) {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  await prisma.topic.update({
    where: {
      id: topicId,
    },
    data: {
      comments: {
        disconnect: {
          id: commentId,
        },
      },
      totalComments: {
        decrement: 1,
      },
    },
  });
}

type GetTopicComments = {
  topicId: string;
  isApproved: boolean;
};

export async function getComments({ topicId, isApproved }: GetTopicComments) {
  const where = isApproved ? { topicId, isApproved: true } : { topicId };

  try {
    const comments = await prisma.comment.findMany({
      where,
      include: {
        user: true,
      },
    });

    return comments as Comment[];
  } catch (error) {
    return undefined;
  }
}
