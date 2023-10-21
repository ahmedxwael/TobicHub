import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TopicType } from "@/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import ControlMenu from "../control-menu";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

const TopicCard = async ({ topic }: { topic: TopicType }) => {
	const session = await getServerSession(authOptions);

	const updatedAtDate = topic.updatedAt ? new Date(topic.updatedAt) : null;
	const date = updatedAtDate
		? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
				updatedAtDate
		  )
		: null;

	return (
		<Card
			key={topic._id}
			className="space-y-5 dark:shadow-[0_8px_16px_0_rgba(0,0,0,0.04),8px_0_16px_0_rgba(0,0,0,0.04)]"
		>
			<CardHeader className="flex items-center justify-between flex-row">
				<Link
					href={`/profile/${topic.creator._id}`}
					className="flex items-center gap-4 w-fit"
				>
					<Image
						src={topic.creator.image}
						alt="user image"
						width={35}
						height={35}
						className="rounded-full border  "
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
				<ControlMenu session={session} topic={topic} />
			</CardHeader>
			<CardContent>
				<h3 className="font-semibold line-clamp-1 text-xl capitalize">
					{topic.title}
				</h3>
				<CardDescription className="leading-6 line-clamp-6 mt-2">
					{topic.description}
				</CardDescription>
			</CardContent>
		</Card>
	);
};

export default memo(TopicCard);
