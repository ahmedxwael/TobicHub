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
			<div className="w-full flex justify-between gap-6 items-center flex-wrap">
				<h1 className="text-2xl capitalize tracking-wider font-bold w-fit">
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
