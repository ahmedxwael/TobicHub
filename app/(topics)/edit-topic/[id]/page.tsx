import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Form from "@/components/Form";
import { getTopic, getTopics } from "@/utils/topicUtils";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
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
	const topic = await getTopic(id);
	const session = await getServerSession(authOptions);

	if (!session) {
		return redirect("/register");
	}

	return (
		<main className="center">
			<Form type="edit" currentTopic={topic} />
		</main>
	);
};

export default EditTopic;
