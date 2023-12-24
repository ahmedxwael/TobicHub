import { authOptions } from "@/app/api/auth/options";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { UserSessionType, UserType } from "../../types";
import PostsNumber from "./posts-number";
import UserImage from "./user-image";
import UserName from "./user-name";

type ProfileCardProps = {
  user: UserType;
};

export default async function ProfileCard({ user }: ProfileCardProps) {
  const session = await getServerSession(authOptions);
  const userSession = session?.user as UserSessionType;

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center sm:flex-row sm:justify-normal">
      <UserImage user={user} userSession={userSession} />
      <div className="space-y-3">
        <UserName userSession={userSession} user={user} />
        <Suspense fallback={<Loader2 className="animate-spin text-base" />}>
          <PostsNumber userId={user.id} />
        </Suspense>
      </div>
    </div>
  );
}
