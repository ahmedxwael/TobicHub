import { TopicType } from "@/types";
import { getTopics, getUserTopics } from "@/utils/topic-utils";
import React from "react";
import TopicCard from "./topic-card";

type Props = {
	topics?: TopicType[];
	userId?: string;
};

const TopicsList = async ({ userId }: Props) => {
	const topics = userId ? await getUserTopics(userId) : await getTopics();

	if (!topics || topics.length === 0) {
		return (
			<p className="text-xl font-bold text-center p-6">
				There is no topics to show
			</p>
		);
	}

	return (
		<div className="space-y-6">
			{topics.map((topic) => (
				<TopicCard key={topic._id} topic={topic} />
			))}
		</div>
	);
};

export default TopicsList;
