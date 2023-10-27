"use client";

import useGetUserTopics from "@/hooks/useGetTopics";
import { TopicType } from "@/types";
import { getUserTopics } from "@/utils/topic-utils";
import { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";

type PostsNumberProps = {
	userId: string;
};

export default function PostsNumber({ userId }: PostsNumberProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [topics, setTopics] = useState<TopicType[] | null>([]);

	async function getTopics(userId: string) {
		setIsLoading(true);

		try {
			const topics = await getUserTopics(userId);
			setTopics(topics);
		} catch (error) {
			throw new Error("Could not get user topics.");
		}

		setIsLoading(false);
	}

	useEffect(() => {
		getTopics(userId);
	}, [userId]);

	return (
		<div className="text-neutral-400 flex items-center gap-2">
			Total posts:
			{isLoading ? (
				<span className="animate-spin text-base">
					<BiLoader />
				</span>
			) : (
				<span className="inline-block">{topics?.length || 0}</span>
			)}
		</div>
	);
}
