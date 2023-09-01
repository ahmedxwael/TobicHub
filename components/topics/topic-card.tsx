"use client";

import { TopicType } from "@/types";
import { revalidatePath } from "@/utils/revalidate";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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

			revalidatePath(["/topics", `/profile/${session?.user?.id}`]);

			router.refresh();
		}
	};

	return (
		<article
			key={topic._id}
			className="p-4 border-2 border-white/10 rounded-xl flex flex-col gap-4 break-inside-avoid"
		>
			<Link
				href={`/profile/${topic.creator._id}`}
				className="flex items-center gap-4 w-fit"
			>
				<Image
					src={topic.creator.image}
					alt="user image"
					width={30}
					height={30}
					className="rounded-full "
				/>
				<h2 className="font-medium text-sm">{topic.creator.name}</h2>
			</Link>
			<div className="flex gap-2 flex-col">
				<h3 className="font-semibold line-clamp-1 text-xl capitalize">
					{topic.title}
				</h3>
				<p className="text-neutral-400 leading-6">{topic.description}</p>
			</div>

			{session?.user?.id === topic.creator._id &&
			pathname === `/profile/${session?.user?.id}` ? (
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
