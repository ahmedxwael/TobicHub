import Form from "@/components/Form";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Topics | Create topic",
	description: "This page contains a form to create a new topic.",
};

const CreateTopic = async () => {
	const session = await getServerSession();

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
