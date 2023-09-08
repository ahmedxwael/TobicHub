import { TopicType } from "@/types";
import React from "react";
import TopicCard from "./topic-card";

type Props = {
	topics: TopicType[];
};

const TopicsList = ({ topics }: Props) => {
	return (
		<div className="space-y-6 sm:columns-2 sm:gap-6 lg:columns-3">
			{topics.map((topic) => (
				<TopicCard key={topic._id} topic={topic} />
			))}
		</div>
	);
};

export default TopicsList;
