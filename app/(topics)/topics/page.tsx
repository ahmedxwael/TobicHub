import TopicCard from "@/components/topics/topic-card";
import { getTopics } from "@/utils/topicUtils";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Topics",
	description:
		"Topics page that contains general information about popular topics.",
};

const TopicsPage = async () => {
	const topics = await getTopics();

	return (
		<section className="container mx-auto flex flex-col gap-8">
			<h1 className="text-3xl font-bold">Topics</h1>

			<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
				{topics.map((topic) => (
					<TopicCard key={topic._id} topic={topic} />
				))}
			</div>
		</section>
	);
};

export default TopicsPage;
