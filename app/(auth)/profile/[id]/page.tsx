import ComponentLoader from "@/components/component-loader";
import { ProfileCard } from "@/components/profile-card";
import TopicsList from "@/components/topics/topics-list";
import { ParamsType } from "@/types";
import { getUserTopics } from "@/utils/topicUtils";
import { getUser, getUsers } from "@/utils/user-utils";
import { Metadata } from "next";
import React, { Suspense } from "react";

// export const revalidate = 0;

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
				<h1 className="text-2xl pb-2 first-letter:uppercase tracking-wider font-bold border-b-2 w-fit">
					Topics
				</h1>
				<Suspense fallback={<ComponentLoader />}>
					<TopicsList topics={topics} />
				</Suspense>
			</div>
		</section>
	);
};

export default Profile;
