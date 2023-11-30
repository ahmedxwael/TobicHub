import { NewTopicType, TopicType } from "@/modules/topics/types";
import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import axios from "axios";

const userAllowedFields = { admin: true, id: true, name: true, image: true };

export async function addTopic(newTopic: NewTopicType) {
  await axios.post("/api/topics", newTopic).catch(() => {
    throw new Error("Something went wrong.");
  });
}

export async function editTopic(
  id: string,
  updatedTopic: Partial<TopicType> | TopicType
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
): Promise<TopicType | undefined | null> => {
  try {
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: isEditing
        ? {}
        : {
            User: { select: userAllowedFields },
          },
    });

    return topic as TopicType;
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
): Promise<TopicType[] | undefined> => {
  const { where, query, skip, take } = options;

  const queryOptions: Prisma.TopicWhereInput[] | undefined = query
    ? [
        { User: { name: { contains: query, mode: "insensitive" } } },
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ]
    : undefined;

  try {
    const topics = await prisma.topic.findMany({
      where: { ...where, OR: queryOptions },
      include: { User: { select: userAllowedFields } },
      skip,
      take: take === null ? undefined : take || 5,
      orderBy: { created_at: "desc" },
    });

    return topics as TopicType[];
  } catch (error: any) {
    return undefined;
  }
};
