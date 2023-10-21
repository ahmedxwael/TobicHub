"use client";

import useGetUserTopics from "@/hooks/useGetTopics";
import { BiLoader } from "react-icons/bi";

type PostsNumberProps = {
	userId: string;
};

export default function PostsNumber({ userId }: PostsNumberProps) {
	const { isLoading, topics } = useGetUserTopics(userId);

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
