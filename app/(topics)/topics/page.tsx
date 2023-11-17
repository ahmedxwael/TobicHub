import ComponentLoader from "@/components/component-loader";
import PageHeading from "@/components/page-heading";
import SearchTopic from "@/modules/topics/components/search-topic";
import TopicsList from "@/modules/topics/components/topics-list";
import { getTopics } from "@/utils/topic-utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Topics | TopicHub",
  description:
    "Topics page that contains general information about popular topics.",
};

export const revalidate = 60;

export default async function TopicsPage() {
  const topicsPromise = getTopics({ where: { approved: true } });

  return (
    <section className="flex flex-col gap-10">
      <div className="flex w-full flex-wrap items-center justify-between gap-6">
        <PageHeading>all topics</PageHeading>
        <SearchTopic />
      </div>
      <Suspense fallback={<ComponentLoader />}>
        <TopicsList topicsPromise={topicsPromise} />
      </Suspense>
    </section>
  );
}
