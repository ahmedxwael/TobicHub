"use client";

import { TopicType } from "@/modules/topics/types";
import { getSomeTopics } from "@/utils/topic-utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type InfiniteScrollingProps = {
  length: number;
  topicsList?: TopicType[];
};

export function InfiniteScrolling({
  length,
  topicsList,
}: InfiniteScrollingProps) {
  const router = useRouter();
  const listRef = useRef(0);

  useEffect(() => {
    async function getTopics() {
      const topics = await getSomeTopics({ take: 5 });
    }
  }, []);

  return (
    <div className="invisible flex items-center justify-between">
      Intersection
    </div>
  );
}
