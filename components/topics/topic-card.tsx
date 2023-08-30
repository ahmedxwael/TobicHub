"use client";

import { TopicType } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const TopicCard = ({ topic }: { topic: TopicType }) => {
	const { data: session }: any = useSession();

	const pathname = usePathname();
	const router = useRouter();

	const deleteTopic = async () => {
		const isConfirmed = confirm("Are you sure you want to delete this topic?");

		if (isConfirmed) {
			await fetch(`/api/topics?id=${topic._id}`, {
				method: "DELETE",
			});
			router.refresh();
		}
	};

	return (
		<article
			key={topic._id}
			className="p-4 border-2 border-white/10 rounded-xl flex flex-col gap-2 break-inside-avoid"
		>
			{/* convert it to a link to direct users to the author page. */}

			<div className="flex items-center gap-4">
				<Image
					src={topic.creator.image}
					alt="user image"
					width={30}
					height={30}
					className="rounded-full "
				/>
				<h2 className="font-medium text-sm">{topic.creator.name}</h2>
			</div>
			<h3 className="font-semibold line-clamp-1 text-lg">{topic.title}</h3>
			<p className="text-neutral-400 text-sm leading-6">{topic.description}</p>

			{session?.user?.id === topic.creator._id && pathname === "/profile" ? (
				<div className="flex gap-2 items-center justify-end mt-auto">
					<button className="btn-small btn-alt" onClick={deleteTopic}>
						Delete
					</button>
					<button
						onClick={() => router.push(`/edit-topic/${topic._id}`)}
						className="btn-small btn-primary"
					>
						Edit
					</button>
				</div>
			) : null}
		</article>
	);
};

export default TopicCard;
