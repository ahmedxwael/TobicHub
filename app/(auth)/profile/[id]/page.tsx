import TopicCard from "@/components/topics/topic-card";
import { ParamsType } from "@/types";
import { getUserTopics } from "@/utils/topicUtils";
import { getUser, getUsers } from "@/utils/user-utils";
import { Metadata } from "next";
import React from "react";

export const revalidate = 1;

export const generateMetadata = async ({
	params: { id },
}: ParamsType): Promise<Metadata> => {
	const user = await getUser(id);

	if (!user) {
		return {
			title: "Unknown user",
			description: `Unknown profile page.`,
		};
	}

	return {
		title: `TobicHub | ${user?.name}`,
		description: `${user?.name} profile page.`,
	};
};

export const generateStaticParams = async () => {
	const users = await getUsers();

	if (!users) {
		return [];
	}

	return users.map((user) => ({ id: user._id }));
};

const Profile = async ({ params: { id } }: ParamsType) => {
	const topics = await getUserTopics(id);

	return (
		<section className="container mx-auto flex flex-col gap-8">
			<h1 className="text-3xl font-bold">Topics</h1>
			{topics ? (
				<div className="space-y-6 sm:columns-2 sm:gap-6 lg:columns-3">
					{topics.map((topic) => (
						<TopicCard key={topic._id} topic={topic} />
					))}
				</div>
			) : (
				<p>No topics to display</p>
			)}
		</section>
	);
};

export default Profile;
