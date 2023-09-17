"use client";

import { PubCreatorType, TopicType } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const TopicCard = ({ topic }: { topic: TopicType }) => {
	const { data: session } = useSession();
	const user = session?.user as { id: string } & Omit<PubCreatorType, "_id">;

	const updatedAtDate = topic.updatedAt ? new Date(topic.updatedAt) : null;

	const date = updatedAtDate
		? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
				updatedAtDate
		  )
		: null;

	const router = useRouter();

	const hasControl = user && (user?.id === topic.creator._id || user?.admin);

	const [toggleControlMenu, setToggleControlMenu] = useState<boolean>(false);

	const handleControlMenu = () => {
		setToggleControlMenu((currState) => !currState);
	};

	const deleteTopic = async () => {
		handleControlMenu();
		const isConfirmed = confirm("Are you sure you want to delete this topic?");

		if (isConfirmed) {
			await fetch(`/api/topics/${topic._id}`, {
				method: "DELETE",
			});

			router.refresh();
		}
	};

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
				{hasControl ? (
					<div className="flex gap-2 items-center relative">
						<button onClick={handleControlMenu} className="text-xl">
							<BsThreeDots />
						</button>
						{toggleControlMenu ? (
							<div className="absolute top-0 right-6 rounded-xl py-3 px-4 tracking-wide text-white/60 text-sm flex flex-col gap-2 bg-neutral-800 text-start">
								<button
									className="hover:text-white transition-colors"
									onClick={deleteTopic}
								>
									Delete
								</button>
								<button
									onClick={() => {
										handleControlMenu();
										router.push(`/edit-topic/${topic._id}`);
									}}
									className="hover:text-white transition-colors"
								>
									Edit
								</button>
							</div>
						) : null}
					</div>
				) : null}
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
