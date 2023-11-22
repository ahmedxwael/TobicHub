import ComponentLoader from "@/components/component-loader";
import NotFound from "@/components/not-found";
import PageHeading from "@/components/page-heading";
import SearchTopic from "@/modules/topics/components/search-topic";
import TopicsList from "@/modules/topics/components/topics-list";
import TopicsSection from "@/modules/topics/components/topics-section";
import { getTopics } from "@/utils/topic-utils";
import { Suspense } from "react";

export const revalidate = 0;

export default async function DashboardPage() {
  const topicsPromise = getTopics({ take: 5 });

  if (!topicsPromise) {
    return <NotFound message="Could not retrieve the list of topics." />;
  }

  return (
    <section className="flex w-full flex-1 flex-col gap-10 lg:max-w-2xl">
      <div className="flex w-full flex-wrap items-center justify-between gap-6">
        <PageHeading>topics</PageHeading>
        <SearchTopic />
      </div>

      <Suspense fallback={<ComponentLoader />}>
        <TopicsSection topicsPromise={topicsPromise} />
      </Suspense>
    </section>
  );
}
