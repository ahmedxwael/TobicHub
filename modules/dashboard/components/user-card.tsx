import CardBadge from "@/components/card-badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserAvatar from "@/modules/user/components/profile/user-avatar";
import UserControlMenus from "@/modules/user/components/profile/user-control-menu";
import { URLS } from "@/shared/urls";
import Link from "next/link";
import { UserSessionType, UserType } from "../../user/types";

type UserCardProps = {
  user: UserType;
  userSession: UserSessionType;
};

export default function UserCard({ user, userSession }: UserCardProps) {
  const joinDate = new Date(user.createdAt);
  const joinDateFormat = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(joinDate);

  return (
    <Card className="relative animate-show-card border-0 p-4 sm:p-6">
      <div className="flex w-fit flex-col flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Link href={URLS.profile.view(user.id)}>
            <UserAvatar image={user.image || ""} />
          </Link>
          <CardBadge
            isDestructive={user.isAdmin}
            label={user.isAdmin ? "Admin" : "User"}
          />
        </div>
        <Link href={URLS.profile.view(user.id)} className="block">
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </Link>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              {user?.topics?.length || 0} Topic(s)
            </TooltipTrigger>
            <TooltipContent>
              <div>{user?.topics?.length || 0} Topic(s)</div>
              <div>
                {user?.topics?.filter((topic) => !topic.isApproved).length || 0}{" "}
                Un approved
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="ml-auto text-muted-foreground">
          Joined at: {joinDateFormat}
        </div>
      </div>
      {userSession.admin && !user.isOwner && (
        <UserControlMenus user={user} className="absolute right-6 top-5" />
      )}
    </Card>
  );
}
