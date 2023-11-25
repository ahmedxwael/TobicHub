"use client";

import { loadMoreTopics } from "@/actions/actions";
import TopicsSkeleton from "@/components/topics-skeleton";
import { TopicType } from "@/modules/topics/types";
import { GetTopicsOptions } from "@/utils/topic-utils";
import type { Session } from "next-auth";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import TopicCard from "./topic-card";

export type TopicsTypeType = "approved" | "search" | "user" | "admin";

type TopicsListProps = {
  topicsList: TopicType[];
  session: Session | null;
  params?: GetTopicsOptions;
};

export default function TopicsList({
  session,
  topicsList,
  params,
}: TopicsListProps) {
  const [displayedTopics, setDisplayedTopics] =
    useState<TopicType[]>(topicsList);
  const [newTopics, setNewTopics] = useState<TopicType[]>([]);

  const [skip, setSkip] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadDisabled, setIsLoadDisabled] = useState(
    () => displayedTopics.length < 5
  );

  const { ref, inView } = useInView({});

  const fetchMoreTopics = useCallback(async () => {
    if (displayedTopics.length < skip) {
      setIsLoadDisabled(true);
      return;
    }

    setIsLoading(true);
    const topics = await loadMoreTopics({ ...params, skip, take: 5 });
    setIsLoading(false);

    if (!topics) return;

    setSkip(skip + 5);
    setNewTopics(topics);
    setDisplayedTopics([...displayedTopics, ...topics]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedTopics, skip]);

  useEffect(() => {
    if (inView) {
      fetchMoreTopics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    setDisplayedTopics([...topicsList, ...newTopics]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicsList]);

  return displayedTopics.length > 0 ? (
    <div className="space-y-10">
      <div className="space-y-6 lg:space-y-10">
        {displayedTopics.map((topic) => (
          <TopicCard session={session} key={topic.id} topic={topic} />
        ))}
      </div>
      {!isLoadDisabled && (
        <div ref={ref}>{isLoading && <TopicsSkeleton />}</div>
      )}
    </div>
  ) : (
    <div className="px-6 py-10 text-center text-xl font-bold">
      There are no topics to show.
    </div>
  );
}
