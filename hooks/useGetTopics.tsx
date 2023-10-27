"use client";

import { TopicType } from "@/types";
import { getUserTopics } from "@/utils/topic-utils";
import { useEffect, useState } from "react";

export default function useGetUserTopics(id: string) {
  // const [isLoading, setIsLoading] = useState(true);
  // const [topics, setTopics] = useState<TopicType[] | null>([]);

  // useEffect(() => {
  // 	setIsLoading(true);

  // 	getUserTopics(id)
  // 		.then((data) => {
  // 			setTopics(data);
  // 		})
  // 		.catch(() => {
  // 			throw new Error("Something went wrong.");
  // 		})
  // 		.finally(() => setIsLoading(false));
  // }, [id]);

  return { isLoading: false, topics: [] };
}
