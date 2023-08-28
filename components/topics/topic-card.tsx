import { TopicType } from "@/types";
import Link from "next/link";
import React from "react";
import Button from "../Button";

const TopicCard = ({ topic }: { topic: TopicType }) => {
	return (
		<article
			key={topic._id}
			className="p-4 border-2 border-white/10 rounded-xl flex flex-col gap-2"
		>
			<h2 className="font-medium text-lg">{topic.title}</h2>
			<p className="text-gray-400 text-sm">{topic.description}</p>

			{/* <div className="flex gap-2 items-center justify-end mt-auto">
				<Button id={topic._id} />
				<Link
					href={`/edit-topic/${topic._id}`}
					className="rounded-lg py-1.5 px-2.5 text-sm font-medium bg-white text-black hover:bg-gray-200 transition-colors"
				>
					Edit
				</Link>
			</div> */}
		</article>
	);
};

export default TopicCard;
