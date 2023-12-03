import CardBadge from "@/components/card-badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserControlMenus from "@/modules/user/components/user-control-menu";
import Image from "next/image";
import Link from "next/link";
import { UserSessionType, UserType } from "../../user/types";

type UserCardProps = {
  user: UserType;
  userSession: UserSessionType;
};

export default function UserCard({ user, userSession }: UserCardProps) {
  const joinDate = new Date(user.created_at);
  const joinDateFormat = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(joinDate);

  return (
    <Card className="relative animate-show-card p-4 sm:p-6">
      <div className="flex w-fit flex-col flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${user.id}`}>
            <Image
              src={user.image || "/images/avatar.png"}
              alt="user image"
              width={500}
              height={500}
              loading="lazy"
              className="h-10 w-10 rounded-full border object-cover"
            />
          </Link>
          <CardBadge
            isValid={user.admin}
            validLabel="Admin"
            inValidLabel="User"
            isMaster={user.owner}
            masterLabel="Owner"
          />
        </div>
        <Link href={`/profile/${user.id}`} className="block">
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              {user?.topics?.length || 0} Topic(s)
            </TooltipTrigger>
            <TooltipContent>
              <div>{user?.topics?.length || 0} Topic(s)</div>
              <div>
                {user?.topics?.filter((topic) => !topic.approved).length || 0}{" "}
                Un approved
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="ml-auto text-muted-foreground">
          Joined at: {joinDateFormat}
        </div>
      </div>
      {userSession.admin && !user.owner && (
        <UserControlMenus user={user} className="absolute right-6 top-5" />
      )}
    </Card>
  );
}
