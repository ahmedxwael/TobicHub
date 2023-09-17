import Form from "@/components/Form";
import { Metadata } from "next";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Topics | Create topic",
	description: "This page contains a form to create a new topic.",
};

const CreateTopic = async () => {
	const session = await getSession();

	console.log("session: ", session);

	if (!session?.user) {
		redirect("/register");
	}

	return (
		<section className="center">
			<Form type="create" />
		</section>
	);
};

export default CreateTopic;
