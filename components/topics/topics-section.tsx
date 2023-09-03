import TopicCard from "@/components/topics/topic-card";
import { TopicType } from "@/types";

type Props = { topics: TopicType[]; title: string };

const TopicsSection = async ({ topics, title }: Props) => {
	return (
		<>
			<h1 className="text-2xl mx-auto pb-2 capitalize tracking-wider font-bold border-b-2 w-fit">
				{title}
			</h1>
			<div className="space-y-6 sm:columns-2 sm:gap-6 lg:columns-3">
				{topics.map((topic) => (
					<TopicCard key={topic._id} topic={topic} />
				))}
			</div>
		</>
	);
};

export default TopicsSection;
