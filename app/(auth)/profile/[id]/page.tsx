import ComponentLoader from "@/components/component-loader";
import { ProfileCard } from "@/components/profile-card";
import TopicsSection from "@/components/topics/topics-section";
import { ParamsType } from "@/types";
import { getUserTopics } from "@/utils/topicUtils";
import { getUser, getUsers } from "@/utils/user-utils";
import { Metadata } from "next";
import React, { Suspense } from "react";

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
	const user = await getUser(id);
	const topics = await getUserTopics(id);
	const topicsNumber = topics.length;

	return (
		<section className="flex flex-col gap-12">
			<ProfileCard topicsNumber={topicsNumber} user={user} />
			<div className="flex flex-col gap-12">
				<Suspense fallback={<ComponentLoader />}>
					<TopicsSection topics={topics} title="topics" />
				</Suspense>
			</div>
		</section>
	);
};

export default Profile;
