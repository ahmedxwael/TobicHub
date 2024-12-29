import prisma from "@/prisma";
import { GenericObject } from "@/shared/types";
import { Prisma, Topic } from "@prisma/client";
import axios from "axios";

const userAllowedFields: Prisma.UserSelect = {
  id: true,
  name: true,
  avatar: true,
};

export async function addTopic(newTopic: Partial<Topic>) {
  try {
    await axios.post("/api/topics", newTopic).catch(() => {});
  } catch (error) {
    console.log(error);
  }
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

export async function getTopic(id: string, edit?: boolean) {
  try {
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: edit
        ? {}
        : {
            author: {
              select: userAllowedFields,
            },
          },
    });

    console.log("topic", topic);

    return topic;
  } catch (error: any) {
    console.log("error", error);
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
      include: { author: { select: userAllowedFields } },
      skip,
      take: take === null ? undefined : take || 5,
      orderBy: { createdAt: "desc" },
    });

    return topics;
  } catch (error: any) {
    return undefined;
  }
}
