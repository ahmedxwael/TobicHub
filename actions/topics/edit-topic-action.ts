/* eslint-disable prettier/prettier */
"use server";

import prisma from "@/prisma";

export async function editTopicAction(topicId: string, body: any) {
  try {
    await prisma.topic.update({
      where: {
        id: topicId,
      },
      data: { ...body },
    });
  } catch (error) {
    throw new Error("Failed to update topic");
  }
}
