import PageHeading from "@/components/page-heading";
import { DataTablePagination } from "@/components/table/table-pagination";
import SearchTopic from "@/modules/topics/components/search-topic";
import { GenericObject } from "@/shared/types";
import { Topic } from "@prisma/client";
import TopicsTable from "./components/table/topics-table";

export const revalidate = 0;

type DashboardPageProps = {
  searchParams: GenericObject;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const topics: Topic[] = [];
  // const topics = await getTopics({
  //   take: 10,
  //   skip: Number(searchParams.skip) || 0,
  // });

  // if (!topics) {
  //   return <NotFound message="Could not retrieve the list of topics." />;
  // }

  return (
    <section className="flex w-full flex-1 flex-col gap-10">
      <div className="flex w-full flex-wrap items-center justify-between gap-6">
        <PageHeading>topics</PageHeading>
        <SearchTopic unapproved />
      </div>
      <TopicsTable topics={topics} />
      <DataTablePagination
        paginationInfo={{
          dataCount: topics.length,
          skip: searchParams.skip || 0,
        }}
      />
    </section>
  );
}
