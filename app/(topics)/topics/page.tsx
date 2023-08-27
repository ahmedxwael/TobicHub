import Button from "@/components/Button";
import { getTopics } from "@/utils/topicUtils";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 0;

export const metadata: Metadata = {
	title: "Topics",
	description:
		"Topics page that contains general information about popular topics.",
};

const TopicsPage = async () => {
	const topics = await getTopics();

	return (
		<main className="container px-8 mx-auto flex flex-col gap-8 py-10">
			<h1 className="text-3xl font-bold">Topics</h1>

			<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
				{topics.map((topic) => (
					<article
						key={topic._id}
						className="p-4 border-2 border-white/10 rounded-xl flex flex-col gap-2"
					>
						<h2 className="font-medium text-lg">{topic.title}</h2>
						<p className="text-gray-400 text-sm">{topic.description}</p>

						<div className="flex gap-2 items-center justify-end mt-auto">
							<Button id={topic._id} />
							<Link
								href={`/edit-topic/${topic._id}`}
								className="rounded-lg py-1.5 px-2.5 text-sm font-medium bg-white text-black hover:bg-gray-200 transition-colors"
							>
								Edit
							</Link>
						</div>
					</article>
				))}
			</div>
		</main>
	);
};

export default TopicsPage;
