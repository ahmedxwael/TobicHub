"use server";

import { GetTopicsOptions, getTopics } from "@/utils/topic-utils";

export async function getTopicsAction(params?: GetTopicsOptions) {
  console.log("im in actions");
  const topics = await getTopics({ ...params, take: null });

  if (!topics) return null;

  return topics;
}
