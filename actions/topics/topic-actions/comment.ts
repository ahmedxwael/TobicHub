"use server";

import { userAllowedFields } from "@/modules/topics/services/topics-services";
import { Comment } from "@/modules/topics/types";
import prisma from "@/prisma";

export type NewCommentType = {
  content: string;
  userId: string;
  topicId: string;
};

export async function addNewComment(comment: NewCommentType) {
  const { content, userId, topicId } = comment;

  const newComment = await prisma.comment.create({
    data: {
      content,
      userId,
      topicId,
    },
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
      commentCount: {
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
      commentCount: {
        decrement: 1,
      },
    },
  });
}

type GetTopicComments = {
  topicId: string;
  approved: boolean;
};

export async function getComments({ topicId, approved }: GetTopicComments) {
  const where = { topicId };

  try {
    const comments = await prisma.comment.findMany({
      where,
      include: {
        user: true,
      },
    });

    console.log(comments);

    return comments;
  } catch (error) {
    console.log(error);

    return undefined;
  }
}

export async function getTopicComments(
  topicId: string
): Promise<{ comments: Comment[] }> {
  const comments = (await prisma.comment.findMany({
    where: {
      topicId,
    },
    include: {
      user: {
        select: userAllowedFields,
      },
      topic: true,
    },
  })) as Comment[];

  return { comments };
}
