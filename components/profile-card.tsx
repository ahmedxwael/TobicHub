import { PubCreatorType } from "@/types";
import Image from "next/image";

type Props = { topicsNumber: number; user: PubCreatorType };

export const ProfileCard = ({ topicsNumber, user }: Props) => {
	return (
		<div className="flex gap-8 items-center flex-col sm:flex-row text-center sm:text-start border-b-2 pb-6 border-white/10">
			<div className="bg-white/10 rounded-full w-[150px] h-[150px]">
				<Image
					src={user?.image!}
					alt="User Profile image"
					width={150}
					height={150}
					quality={100}
					className="rounded-full"
				/>
			</div>
			<div className="space-y-3">
				<h1 className="text-3xl font-bold text-center capitalize tracking-wide">
					{user?.name}
				</h1>
				<p className="text-neutral-400">Total posts: {topicsNumber || 0} </p>
			</div>
		</div>
	);
};
