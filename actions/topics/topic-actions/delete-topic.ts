"use server";

import prisma from "@/prisma";
import { getTopicForActions } from "./utils";

type DeleteTopicProps = {
  topicId: string;
  authorId: string;
};

export async function deleteTopicAction({
  authorId,
  topicId,
}: DeleteTopicProps) {
  try {
    // First verify the topic exists and belongs to the user
    const topic = await getTopicForActions(topicId);

    if (!topic) {
      throw new Error("Topic not found");
    }

    if (topic.author.id !== authorId) {
      throw new Error("Unauthorized to delete this topic");
    }

    // Use a transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Delete the topic first
      await tx.topic.delete({
        where: {
          id: topicId,
        },
      });

      // Update user counts
      await tx.user.update({
        where: {
          id: authorId,
        },
        data: {
          topicsCount: { decrement: 1 },
          ...(topic.approved && {
            approvedTopicsCount: { decrement: 1 },
          }),
        },
      });
    });
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error.message);
  }
}
