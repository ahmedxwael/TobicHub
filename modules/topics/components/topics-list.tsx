"use client";

import type { Session } from "next-auth";
import { Topic } from "../types";
import TopicCard from "./topic-card";

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
    <div className="px-6 py-16 text-center text-xl font-bold">
      No topics to show.
    </div>
  );
}
