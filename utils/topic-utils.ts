import prisma from "@/prisma";
import { NewTopicType, TopicType } from "@/types";
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

export const getApprovedTopics = async (): Promise<TopicType[] | undefined> => {
  try {
    const topics = await prisma.topic.findMany({
      where: { approved: true },
      include: {
        User: { select: userAllowedFields },
      },
      orderBy: { created_at: "desc" },
    });

    return topics as TopicType[];
  } catch (error: any) {
    return undefined;
  }
};

export const getAllTopics = async (): Promise<TopicType[] | undefined> => {
  try {
    const topics = await prisma.topic.findMany({
      include: { User: true },
      orderBy: { created_at: "desc" },
    });

    return topics as TopicType[];
  } catch (error: any) {
    return undefined;
  }
};

export const getUserTopics = async (
  id: string
): Promise<TopicType[] | undefined> => {
  try {
    const topics = await prisma.topic.findMany({
      where: { AND: [{ userId: id }, { approved: true }] },
      include: {
        User: { select: userAllowedFields },
      },
      orderBy: { created_at: "desc" },
    });

    return topics as TopicType[];
  } catch (error: any) {
    return undefined;
  }
};

export const getSearchTopics = async (
  query: string
): Promise<TopicType[] | undefined> => {
  try {
    const topics = await prisma.topic.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
        ],
      },
      include: {
        User: { select: userAllowedFields },
      },
      orderBy: { created_at: "desc" },
    });

    return topics as TopicType[];
  } catch (error: any) {
    return undefined;
  }
};
