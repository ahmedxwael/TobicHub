import { authOptions } from "@/app/api/auth/options";
import NotFound from "@/components/not-found";
import { TopicType } from "@/modules/topics/types";
import { getServerSession } from "next-auth";
import React from "react";
import TopicCard from "./topic-card";

export type TopicsTypeType = "approved" | "search" | "user" | "admin";

type TopicsListProps = {
  topicsPromise: Promise<TopicType[] | undefined>;
};

export default async function TopicsList({ topicsPromise }: TopicsListProps) {
  const session = await getServerSession(authOptions);
  const topicsList = await topicsPromise;

  if (!topicsList) {
    return <NotFound message="Could not retrieve the list of topics." />;
  }

  return topicsList.length > 0 ? (
    <div className="space-y-10">
      <div className="space-y-6 lg:space-y-10">
        {topicsList.map((topic) => (
          <TopicCard session={session} key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  ) : (
    <div className="px-6 py-10 text-center text-xl font-bold">
      There are no topics to show.
    </div>
  );
}

TopicsList;
