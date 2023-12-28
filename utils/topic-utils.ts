import { NewTopic, Topic } from "@/modules/topics/types";
import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import axios from "axios";

const userAllowedFields = { isAdmin: true, id: true, name: true, image: true };

export async function addTopic(newTopic: NewTopic) {
  await axios.post("/api/topics", newTopic).catch(() => {
    throw new Error("Something went wrong.");
  });
}

export async function editTopic(
  id: string,
  updatedTopic: Partial<Topic> | Topic
) {
  await axios.patch(`/api/topics/${id}`, updatedTopic).catch(() => {
    throw new Error("Something went wrong.");
  });
}

export async function deleteTopic(id: string) {
  await axios.delete(`/api/topics/${id}`).catch(() => {
    throw new Error("Something went wrong.");
  });
}

export const getTopic = async (
  id: string,
  isEditing?: boolean
): Promise<Topic | undefined | null> => {
  try {
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: isEditing
        ? {}
        : {
            author: { select: userAllowedFields },
          },
    });

    return topic as Topic;
  } catch (error: any) {
    return undefined;
  }
};

export type GetTopicsOptions = {
  where?: Prisma.TopicWhereInput;
  skip?: number;
  take?: number | null;
  query?: string;
};

export const getTopics = async (
  options: GetTopicsOptions = {}
): Promise<Topic[] | undefined> => {
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
      include: { author: { select: userAllowedFields } },
      skip,
      take: take === null ? undefined : take || 5,
      orderBy: { createdAt: "desc" },
    });

    return topics as Topic[];
  } catch (error: any) {
    return undefined;
  }
};
