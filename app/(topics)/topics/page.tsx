import TopicCard from "@/components/topics/topic-card";
import TopicsSection from "@/components/topics/topics-section";
import { getTopics } from "@/utils/topicUtils";
import { Metadata } from "next";

export const revalidate = 1;

export const metadata: Metadata = {
	title: "Topics",
	description:
		"Topics page that contains general information about popular topics.",
};

const TopicsPage = async () => {
	const topics = await getTopics();

	return (
		<section className="flex flex-col gap-10">
			<TopicsSection topics={topics} />
		</section>
	);
};

export default TopicsPage;
