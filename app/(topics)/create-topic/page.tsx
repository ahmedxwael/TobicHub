import Form from "@/components/Form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Topics | Create topic",
	description: "This page contains a form to create a new topic.",
};

const CreateTopic = () => {
	return (
		<main className="min-h-[calc(100vh-72.8px)] grid place-content-center">
			<Form type="create" />
		</main>
	);
};

export default CreateTopic;
