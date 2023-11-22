import { authOptions } from "@/app/api/auth/options";
import NotFound from "@/components/not-found";
import { getServerSession } from "next-auth";
import React from "react";
import { TopicType } from "../types";
import TopicsList from "./topics-list";

type TopicsSectionProps = {
  topicsPromise: Promise<TopicType[] | undefined>;
};

export default async function TopicsSection({
  topicsPromise,
}: TopicsSectionProps) {
  const session = await getServerSession(authOptions);
  const topicsList = await topicsPromise;

  if (!topicsList) {
    return <NotFound message="Could not retrieve the list of topics." />;
  }

  return <TopicsList topicsList={topicsList} session={session} />;
}
