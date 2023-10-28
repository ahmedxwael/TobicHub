"use client";

import { TopicType } from "@/types";
import { getUserTopics } from "@/utils/topic-utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type PostsNumberProps = {
  userId: string;
};

export default function PostsNumber({ userId }: PostsNumberProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState<TopicType[] | null>([]);

  async function getTopics(userId: string) {
    setIsLoading(true);

    const topics = await getUserTopics(userId);

    if (!topics) {
      setTopics([]);
    } else {
      setTopics(topics);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getTopics(userId);
  }, [userId]);

  return (
    <div className="flex items-center gap-2 text-neutral-400">
      <span className="inline-block">
        {isLoading ? (
          <Loader2 className="animate-spin text-base" />
        ) : (
          topics?.length || 0
        )}
      </span>
      Topics
    </div>
  );
}
