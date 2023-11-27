"use server";

import { GetTopicsOptions, getTopics } from "@/utils/topic-utils";

export async function getTopicsAction(params: GetTopicsOptions) {
  const topics = await getTopics(params);

  if (!topics) return null;

  return topics;
}
