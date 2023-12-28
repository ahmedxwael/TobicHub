import { authOptions } from "@/app/api/auth/options";
import NotFound from "@/components/not-found";
import { GetTopicsOptions } from "@/utils/topic-utils";
import { getServerSession } from "next-auth";
import React from "react";
import { Topic } from "../types";
import TopicsList from "./topics-list";

type TopicsSectionProps = {
  topicsPromise: Promise<Topic[] | undefined>;
  params?: GetTopicsOptions;
};

export default async function TopicsSection({
  topicsPromise,
  params,
}: TopicsSectionProps) {
  const session = await getServerSession(authOptions);
  const topicsList = await topicsPromise;

  if (!topicsList) {
    return <NotFound message="Could not retrieve the list of topics." />;
  }

  return (
    <TopicsList topicsList={topicsList} session={session} params={params} />
  );
}
