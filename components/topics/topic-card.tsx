import { TopicType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import ControlMenu from "../control-menu";

const TopicCard = ({ topic }: { topic: TopicType }) => {
	const updatedAtDate = topic.updatedAt ? new Date(topic.updatedAt) : null;
	const date = updatedAtDate
		? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
				updatedAtDate
		  )
		: null;

	return (
		<article
			key={topic._id}
			className="p-4 border-2 border-white/10 rounded-xl flex flex-col gap-4 break-inside-avoid"
		>
			<div className="flex justify-between gap-4 items-center">
				<Link
					href={`/profile/${topic.creator._id}`}
					className="flex items-center gap-4 w-fit"
				>
					<Image
						src={topic.creator.image}
						alt="user image"
						width={35}
						height={35}
						className="rounded-full border-2 border-white/10"
					/>
					<div className="flex flex-col">
						<h2 className="font-medium text-sm">{topic.creator.name}</h2>
						{date ? (
							<span className="inline-block text-xs text-white/60">{date}</span>
						) : null}
					</div>
				</Link>
				<ControlMenu topic={topic} />
			</div>
			<div className="flex gap-2 flex-col">
				<h3 className="font-semibold line-clamp-1 text-xl capitalize">
					{topic.title}
				</h3>

				<p className="text-neutral-400 leading-6">{topic.description}</p>
			</div>
		</article>
	);
};

export default memo(TopicCard);
