import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Form from "@/components/Form";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Topics | Create topic",
	description: "This page contains a form to create a new topic.",
};

const CreateTopic = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return redirect("/register");
	}

	return (
		<section className="center">
			<Form type="create" />
		</section>
	);
};

export default CreateTopic;
