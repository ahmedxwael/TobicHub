import { TopicType } from "@/types";
import React from "react";
import TopicCard from "./topic-card";

type Props = {
	topics: TopicType[];
};

const TopicsList = ({ topics }: Props) => {
	return (
		<div className="space-y-6 w-[800px] mx-auto max-w-full">
			{topics.map((topic) => (
				<TopicCard key={topic._id} topic={topic} />
			))}
		</div>
	);
};

export default TopicsList;
