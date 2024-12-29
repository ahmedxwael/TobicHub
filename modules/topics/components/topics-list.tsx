"use client";

import NoData from "@/components/no-data";
import { Topic } from "@prisma/client";
import type { Session } from "next-auth";
import TopicCard from "./topic-card/topic-card";

export type TopicsTypeType = "approved" | "search" | "user" | "admin";

type TopicsListProps = {
  topicsList: Topic[];
  session: Session | null;
};

export default function TopicsList({ session, topicsList }: TopicsListProps) {
  return topicsList.length > 0 ? (
    <div className="space-y-6 lg:space-y-12">
      {topicsList.map((topic) => (
        <TopicCard session={session} key={topic.id} topic={topic} />
      ))}
    </div>
  ) : (
    <NoData message="No topics to show." />
  );
}
