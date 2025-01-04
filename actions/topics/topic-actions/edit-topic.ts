"use server";

import prisma from "@/prisma";
import { getTopicForActions } from "./utils";

export async function editTopicAction(topicId: string, body: any) {
  try {
    // First verify the topic exists and belongs to the user
    const topic = await getTopicForActions(topicId);

    if (!topic) {
      throw new Error("Topic not found");
    }

    // Use a transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Update the topic
      const updatedTopic = await tx.topic.update({
        where: {
          id: topicId,
        },
        data: { ...body },
      });

      // If approval status changed, update user's approved topics count
      if (body.approved !== undefined && body.approved !== topic.approved) {
        await tx.user.update({
          where: {
            id: topic.author.id,
          },
          data: {
            approvedTopicsCount: {
              [body.approved ? "increment" : "decrement"]: 1,
            },
          },
        });
      }

      return updatedTopic;
    });
  } catch (error) {
    throw new Error("Failed to update topic");
  }
}
