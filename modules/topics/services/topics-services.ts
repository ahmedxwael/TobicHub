import prisma from "@/prisma";
import { Prisma } from "@prisma/client";

export const userAllowedFields: Prisma.UserSelect = {
  id: true,
  name: true,
  avatar: true,
};

export async function getTopic(id: string) {
  try {
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        author: {
          select: userAllowedFields,
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

export type GetTopicsOptions = {
  where?: Prisma.TopicWhereInput;
  skip?: number;
  take?: number | null;
  query?: string;
};

export async function getTopics(options: GetTopicsOptions = {}) {
  const { where, query, skip, take } = options;

  const queryOptions: Prisma.TopicWhereInput[] | undefined = query
    ? [
        { author: { name: { contains: query, mode: "insensitive" } } },
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ]
    : undefined;

  try {
    const topics = await prisma.topic.findMany({
      where: { ...where, OR: queryOptions },
      include: {
        author: { select: userAllowedFields },
      },
      skip,
      take: take === null ? undefined : take || 5,
      orderBy: { createdAt: "desc" },
    });

    if (!topics) {
      throw new Error("No topics found");
    }

    return topics;
  } catch (error: any) {
    console.error("Error fetching topics:", error);
    return undefined;
  }
}
