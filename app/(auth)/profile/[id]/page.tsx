import TopicCard from "@/components/topics/topic-card";
import { getUserTopics } from "@/utils/topicUtils";
import React from "react";

const Profile = async ({ params: { id } }: { params: { id: string } }) => {
	const topics = await getUserTopics(id);

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

export default Profile;
