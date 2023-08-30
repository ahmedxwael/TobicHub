import ProvidersList from "@/components/providers-list";
import { Metadata } from "next";
import { getProviders } from "next-auth/react";

export const metadata: Metadata = {
	title: "Sign in",
	description: "TopicHub sign in page.",
};

const page = async () => {
	const providers = await getProviders();

	return (
		<section className="flex items-center justify-center">
			<ProvidersList providers={providers} />
		</section>
	);
};

export default page;
