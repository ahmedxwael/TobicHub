import ProvidersList from "@/components/providers-list";
import { getProviders } from "next-auth/react";

const page = async () => {
	const providers = await getProviders();

	return (
		<section className="flex items-center justify-center">
			<form className="flex-col flex gap-6 border-2 p-6 border-white/10 rounded-lg w-[500px] max-w-full">
				<h1 className="capitalize text-center font-bold text-2xl">
					TopicHub Registration form
				</h1>
				<ProvidersList providers={providers} />
			</form>
		</section>
	);
};

export default page;
