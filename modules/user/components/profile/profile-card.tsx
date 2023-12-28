import { authOptions } from "@/app/api/auth/options";
import { getServerSession } from "next-auth";
import { UserSessionType, UserType } from "../../types";
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
        <div className="flex items-center gap-2 text-neutral-400">
          <span className="inline-block">{user.totalTopics}</span>
          Topic(s)
        </div>
      </div>
    </div>
  );
}
