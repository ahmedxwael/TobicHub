import TopicsSection from "@/components/topics/topics-section";
import { getTopics } from "@/utils/topicUtils";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
	title: "Topics",
	description:
		"Topics page that contains general information about popular topics.",
};

const TopicsPage = async () => {
	const topics = await getTopics();
	// const topics: TopicType[] = [];

	return (
		<section className="flex flex-col gap-10">
			<TopicsSection topics={topics || []} title="all topics" />
		</section>
	);
};

export default TopicsPage;
