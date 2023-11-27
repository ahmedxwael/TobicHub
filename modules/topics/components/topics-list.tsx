"use client";

import { getTopicsAction } from "@/actions/actions";
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

let skip = 5;

export default function TopicsList({
  session,
  topicsList,
  params,
}: TopicsListProps) {
  const [displayedTopics, setDisplayedTopics] =
    useState<TopicType[]>(topicsList);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadDisabled, setIsLoadDisabled] = useState(
    () => topicsList.length < 5
  );

  const { ref, inView } = useInView({});

  const loadMoreTopics = useCallback(async () => {
    setIsLoading(true);
    const topics = await getTopicsAction({ ...params, skip, take: 5 });
    setIsLoading(false);

    if (!topics) return;

    skip += 5;
    setDisplayedTopics([...displayedTopics, ...topics]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    if (inView) {
      if (displayedTopics.length < skip) {
        setIsLoadDisabled(true);
        return;
      }

      loadMoreTopics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    skip = 5;
    setIsLoadDisabled(topicsList.length < 0);
  }, [topicsList.length]);

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
      w There are no topics to show.
    </div>
  );
}
