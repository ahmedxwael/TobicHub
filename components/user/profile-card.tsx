import { creatorType } from "@/types";
import Image from "next/image";
import PostsNumber from "./posts-number";

type Props = { user: creatorType };

export const ProfileCard = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-center gap-8 border-b-2 pb-6 text-center sm:flex-row sm:text-start">
      <div className="h-[150px] w-[150px] rounded-full bg-white/10">
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
        <h1 className="text-center text-3xl font-bold capitalize tracking-wide">
          {user?.name}
        </h1>
        <PostsNumber userId={user._id} />
      </div>
    </div>
  );
};
