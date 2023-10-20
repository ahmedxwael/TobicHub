import { TopicType } from "@/types";
import SearchTopic from "../search-topic";
import TopicsList from "./topics-list";

type Props = { topics: TopicType[]; title: string };

const TopicsSection = async ({ topics, title }: Props) => {
	return (
		<>
			<div className="w-full flex sm:justify-between gap-6 items-center flex-wrap justify-center">
				<h1 className="text-2xl capitalize tracking-wider font-bold w-fit">
					{title}
				</h1>
				<SearchTopic />
			</div>
			{!topics || topics.length === 0 ? (
				<p className="text-xl font-bold text-center p-6">
					There is no topics to show
				</p>
			) : (
				<TopicsList topics={topics} />
			)}
		</>
	);
};

export default TopicsSection;
