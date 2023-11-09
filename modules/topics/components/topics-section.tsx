import ComponentLoader from "@/components/component-loader";
import SearchTopic from "@/modules/topics/components/search-topic";
import { Suspense } from "react";
import TopicsList, { TopicsTypeType } from "./topics-list";

type Props = { title: string; query?: string; type: TopicsTypeType };

const TopicsSection = ({ title, query, type }: Props) => {
  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-between gap-6">
        <h1 className="w-fit text-2xl font-bold capitalize tracking-wider">
          {title}
        </h1>
        <SearchTopic />
      </div>

      <Suspense fallback={<ComponentLoader />}>
        <TopicsList type={type} query={query} />
      </Suspense>
    </>
  );
};

export default TopicsSection;
