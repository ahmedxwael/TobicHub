import TopicCard from "@/components/topics/topic-card";
import TopicsSection from "@/components/topics/topics-section";
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
		<section className="flex flex-col gap-10">
			<div className="flex flex-col gap-6">
				<TopicsSection topics={topics} />
			</div>
		</section>
	);
};

export default Profile;
