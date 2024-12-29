import { authOptions } from "@/app/api/auth/options";
import NotFound from "@/components/not-found";
import PageHeading from "@/components/page-heading";
import { Pagination } from "@/components/pagination";
import SearchTopic from "@/modules/topics/components/search-topic";
import TopicsList from "@/modules/topics/components/topics-list";
import { getTopics } from "@/modules/topics/services/topics-services";
import { GenericObject } from "@/shared/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Topics | TopicHub",
  description:
    "Topics page that contains general information about popular topics.",
};

export const revalidate = 0;

type TopicsPageProps = {
  searchParams: GenericObject;
};

export default async function TopicsPage({ searchParams }: TopicsPageProps) {
  const skip = Number(searchParams.skip) || 0;
  const session = await getServerSession(authOptions);
  const topics = await getTopics({
    where: { approved: true },
    skip,
  });

  if (!topics) {
    return <NotFound message="Could not retrieve the list of topics." />;
  }

  return (
    <section className="flex w-[800px] max-w-full flex-col gap-10 py-20">
      <div className="flex w-full flex-wrap items-center justify-between gap-6">
        <PageHeading shadow>all topics</PageHeading>
        <SearchTopic />
      </div>
      <TopicsList topicsList={topics} session={session} />
      <Pagination
        paginationInfo={{
          dataCount: topics.length,
          skip,
          limit: 5,
        }}
      />
    </section>
  );
}
