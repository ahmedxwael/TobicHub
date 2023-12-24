import NotFound from "@/components/not-found";
import PageHeading from "@/components/page-heading";
import SearchTopic from "@/modules/topics/components/search-topic";
import { getTopics } from "@/utils/topic-utils";
import TopicsTable from "./components/table/topics-table";

export const revalidate = 0;

export default async function DashboardPage() {
  const topics = await getTopics({ take: null });

  if (!topics) {
    return <NotFound message="Could not retrieve the list of topics." />;
  }

  return (
    <section className="flex w-full flex-1 flex-col gap-10">
      <div className="flex w-full flex-wrap items-center justify-between gap-6">
        <PageHeading>topics</PageHeading>
        <SearchTopic unapproved />
      </div>
      <TopicsTable topics={topics} />
    </section>
  );
}
