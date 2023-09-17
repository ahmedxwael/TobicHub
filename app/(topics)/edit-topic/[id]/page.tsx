import Form from "@/components/Form";
import { getTopic, getTopics } from "@/utils/topicUtils";
import { Metadata } from "next";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Topics | Edit topic",
	description: "This page contains a form to update an exesting topic.",
};

export const generateStaticParams = async () => {
	const topics = await getTopics();

	if (!topics) {
		return [];
	}

	return topics.map((topic) => {
		id: topic._id;
	});
};

const EditTopic = async ({ params: { id } }: { params: { id: string } }) => {
	const session = await getSession();

	if (!session?.user) {
		redirect("/register");
	}

	const topic = await getTopic(id);

	return (
		<main className="center">
			<Form type="edit" currentTopic={topic} />
		</main>
	);
};

export default EditTopic;
