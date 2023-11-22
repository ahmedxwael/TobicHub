"use client";

import LoadMoreButton from "@/components/load-more-button";
import NotFound from "@/components/not-found";
import { TopicType } from "@/modules/topics/types";
import { getTopics } from "@/utils/topic-utils";
import type { Session } from "next-auth";
import React, { useState } from "react";
import TopicCard from "./topic-card";

export type TopicsTypeType = "approved" | "search" | "user" | "admin";

type TopicsListProps = {
  topicsList: TopicType[];
  session: Session | null;
};

export default function TopicsList({ session, topicsList }: TopicsListProps) {
  const [displayedTopics, setDisplayedTopics] =
    useState<TopicType[]>(topicsList);

  console.log(displayedTopics);

  const fetchMoreTopics = async (skip: number) => {
    console.log("im here1: ", displayedTopics, skip);
    if (displayedTopics.length < skip) return;

    const topics = await getTopics({ skip, take: 5 });
    console.log("im here2: ", topics, skip);

    if (!topics) return;

    setDisplayedTopics([...displayedTopics, ...topics]);
  };

  return displayedTopics.length > 0 ? (
    <div className="space-y-10">
      <div className="space-y-6 lg:space-y-10">
        {displayedTopics.map((topic) => (
          <TopicCard session={session} key={topic.id} topic={topic} />
        ))}
      </div>
      <LoadMoreButton loadMore={fetchMoreTopics} />
    </div>
  ) : (
    <div className="px-6 py-10 text-center text-xl font-bold">
      There are no topics to show.
    </div>
  );
}

TopicsList;
