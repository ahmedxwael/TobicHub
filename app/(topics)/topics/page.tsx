import TopicCard from "@/components/topics/topic-card";
import { getTopics } from "@/utils/topicUtils";
import { Metadata } from "next";

// export const revalidate = 0;

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

			<div className="space-y-6 sm:columns-2 sm:gap-6 lg:columns-3">
				{topics.map((topic) => (
					<TopicCard key={topic._id} topic={topic} />
				))}
			</div>
		</section>
	);
};

export default TopicsPage;
