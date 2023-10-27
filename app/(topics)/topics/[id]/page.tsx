import { getTopic } from "@/utils/topic-utils";
import { MoveLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TopicPageProps = {
	params: { id: string };
};

export const generateMetadata = async ({
	params: { id },
}: TopicPageProps): Promise<Metadata> => {
	const topic = await getTopic(id);

	if (!topic) {
		return { title: "Undefined | TopicHub", description: "" };
	}

	return {
		title: `${topic.title} | TopicHub`,
		description: topic.description,
	};
};

export default async function TopicPage({ params: { id } }: TopicPageProps) {
	const topic = await getTopic(id);

	if (!topic) {
		return <div className=""></div>;
	}

	const updatedAtDate = topic.updatedAt ? new Date(topic.updatedAt) : null;
	const date = updatedAtDate
		? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
				updatedAtDate
		  )
		: null;

	return (
		<section>
			<Link href="/topics" className="flex items-center gap-3 text-base mb-8">
				<MoveLeft />
				Back to topics
			</Link>
			<div className="space-y-8">
				<div className="space-y-4 pb-6 md:pb-8 border-b">
					<h1 className="text-2xl md:text-3xl font-bold first-letter:uppercase">
						{topic.title}
					</h1>
					<Link
						href={`/profile/${topic.creator._id}`}
						className="flex items-center gap-4 w-fit"
					>
						<Image
							src={topic.creator.image}
							alt="user image"
							width={35}
							height={35}
							loading="lazy"
							className="rounded-full border"
						/>
						<div className="flex flex-col">
							<h2 className="font-medium text-sm">{topic.creator.name}</h2>
							{!!date && (
								<span className="inline-block text-xs text-muted-foreground">
									{date}
								</span>
							)}
						</div>
					</Link>
				</div>
				<p className="whitespace-break-spaces leading-7">{topic.description}</p>
				{topic.link && (
					<div className="mt-4 text-sm border-t pt-4 space-y-2">
						<h3>Recourses:</h3>
						<Link
							href={topic.link}
							className="text-blue-500 block"
							target="_blank"
						>
							{topic.link}
						</Link>
					</div>
				)}
			</div>
		</section>
	);
}
