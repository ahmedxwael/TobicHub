import { NewTopic, Topic } from "@/modules/topics/types";
import prisma from "@/prisma";
import { GenericObject } from "@/shared/types";
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
  updatedTopic: Partial<Topic> | Topic,
  config?: GenericObject
) {
  await axios.patch(`/api/topics/${id}`, updatedTopic, config).catch(() => {
    throw new Error("Something went wrong.");
  });
}

export async function deleteTopic(id: string, authorId: string) {
  await axios
    .post(`/api/topics/${id}`, {
      authorId,
    })
    .catch(() => {
      throw new Error("Something went wrong.");
    });
}

export async function getTopic(
  id: string,
  isEditing?: boolean
): Promise<Topic | undefined | null> {
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
}

export type GetTopicsOptions = {
  where?: Prisma.TopicWhereInput;
  skip?: number;
  take?: number | null;
  query?: string;
};

export async function getTopics(
  options: GetTopicsOptions = {}
): Promise<Topic[] | undefined> {
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
}

type GetTopicComments = {
  topicId: string;
  isApproved: boolean;
};

export async function getTopicComments({
  topicId,
  isApproved,
}: GetTopicComments) {
  const where = isApproved ? { topicId, isApproved: true } : { topicId };

  try {
    const comments = await prisma.comment.findMany({
      where,
      include: {
        user: true,
      },
    });

    return comments as any;
  } catch (error) {
    return undefined;
  }
}
