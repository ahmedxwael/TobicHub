"use server";

import {
  GetTopicsOptions,
  getTopics,
} from "@/modules/topics/services/topics-services";

export async function getTopicsAction(params?: GetTopicsOptions) {
  const topics = await getTopics({ ...params, take: null });

  if (!topics) return null;

  return topics;
}
