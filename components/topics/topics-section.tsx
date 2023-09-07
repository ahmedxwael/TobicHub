import TopicCard from "@/components/topics/topic-card";
import { TopicType } from "@/types";
import SearchTopic from "../search-topic";

type Props = { topics: TopicType[]; title: string };

const TopicsSection = async ({ topics, title }: Props) => {
	return (
		<>
			<div className="flex justify-between gap-6 items-center">
				<h1 className="text-2xl pb-2 capitalize tracking-wider font-bold border-b-2 w-fit">
					{title}
				</h1>
				<SearchTopic />
			</div>
			{!topics || topics.length === 0 ? (
				<p className="text-xl font-bold text-center p-6">
					There is no topics to show
				</p>
			) : (
				<div className="space-y-6 sm:columns-2 sm:gap-6 lg:columns-3">
					{topics.map((topic) => (
						<TopicCard key={topic._id} topic={topic} />
					))}
				</div>
			)}
		</>
	);
};

export default TopicsSection;
