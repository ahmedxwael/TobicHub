import { Separator } from "@/components/ui/separator";
import { UserSessionType, UserType } from "../../types";
import UserImage from "./user-image";
import UserName from "./user-name";

type ProfileCardProps = {
  user: UserType;
  userSession: UserSessionType | undefined;
};

export default function ProfileCard({ user, userSession }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <UserImage user={user} userSession={userSession} />
      <div>
        <UserName userSession={userSession} user={user} />
        <div className="mt-2 flex items-center justify-center gap-2 capitalize text-muted-foreground">
          joined at:
          <span className="font-medium">{user.createdAt.toDateString()}</span>
        </div>
      </div>
      <Separator className="my-6" />
      <ul className="flex w-full flex-col items-start gap-2 capitalize">
        <li>
          topics: <span className="font-medium">{user.totalTopics}</span>
        </li>
        <li>
          comments: <span className="font-medium">{user.totalComments}</span>
        </li>
      </ul>
    </div>
  );
}
