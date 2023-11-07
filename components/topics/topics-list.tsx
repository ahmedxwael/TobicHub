import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TopicType } from "@/types";
import {
  getAllTopics,
  getApprovedTopics,
  getSearchTopics,
  getUserTopics,
} from "@/utils/topic-utils";
import { getServerSession } from "next-auth";
import React from "react";
import { InfiniteScrolling } from "../infinite-scrolling/infinite-scrolling";
import NotFound from "../not-found";
import TopicCard from "./topic-card";

export type TopicsTypeType = "approved" | "search" | "user" | "admin";

type Props = {
  topics?: TopicType[];
  userId?: string;
  query?: string;
  type: TopicsTypeType;
};

function getTopics(type: TopicsTypeType, query?: string, userId?: string) {
  switch (type) {
    case "approved": {
      return getApprovedTopics();
    }
    case "search": {
      return getSearchTopics(query!);
    }
    case "user": {
      return getUserTopics(userId!);
    }
    case "admin": {
      return getAllTopics();
    }
  }
}

const TopicsList = async ({ type, userId, query }: Props) => {
  const topics = await getTopics(type, query, userId);
  const session = await getServerSession(authOptions);

  if (!topics) {
    return <NotFound message="Could not retrieve the list of topics." />;
  }

  return topics.length > 0 ? (
    <div className="space-y-10">
      <div className="space-y-6 lg:space-y-10">
        {topics.map((topic) => (
          <TopicCard session={session} key={topic.id} topic={topic} />
        ))}
      </div>
      <InfiniteScrolling length={topics.length} />
    </div>
  ) : (
    <div className="px-6 py-10 text-center text-xl font-bold">
      There are no topics to show.
    </div>
  );
};

export default TopicsList;
