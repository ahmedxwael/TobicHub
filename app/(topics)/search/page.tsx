import BackButton from "@/components/back-button";
import ComponentLoader from "@/components/component-loader";
import PageHeading from "@/components/page-heading";
import SearchTopic from "@/modules/topics/components/search-topic";
import TopicsList from "@/modules/topics/components/topics-list";
import { getTopics } from "@/utils/topic-utils";
import React, { Suspense } from "react";

type Props = {
  searchParams: { q: string };
};

export const revalidate = 0;

export default function SearchPage({ searchParams: { q } }: Props) {
  const topicsPromise = getTopics({ query: q, where: { approved: true } });

  return (
    <section className="flex flex-col gap-8">
      <BackButton />
      <div className="flex w-full flex-wrap items-center justify-between gap-6">
        <PageHeading> Results for: {q}</PageHeading>
        <SearchTopic />
      </div>
      <Suspense fallback={<ComponentLoader />}>
        <TopicsList topicsPromise={topicsPromise} />
      </Suspense>
    </section>
  );
}
