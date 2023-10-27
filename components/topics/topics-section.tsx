import { TopicType } from "@/types";
import { getTopics } from "@/utils/topic-utils";
import { Suspense } from "react";
import ComponentLoader from "../component-loader";
import SearchTopic from "../search-topic";
import TopicsList from "./topics-list";

type Props = { title: string; query?: string };

const TopicsSection = ({ title, query }: Props) => {
  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-between gap-6">
        <h1 className="w-fit text-2xl font-bold capitalize tracking-wider">
          {title}
        </h1>
        <SearchTopic />
      </div>

      <Suspense fallback={<ComponentLoader />}>
        <TopicsList query={query} />
      </Suspense>
    </>
  );
};

export default TopicsSection;
