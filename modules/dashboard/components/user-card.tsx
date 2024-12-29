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
import { urls } from "@/shared/urls";
import { User } from "@prisma/client";
import Link from "next/link";

type UserCardProps = {
  user: User;
  userSession: User;
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
          <Link href={urls.profile.view(user.id)}>
            <UserAvatar image={user.avatar || ""} />
          </Link>
          <CardBadge
            isDestructive={user.moderator}
            label={user.moderator ? "Admin" : "User"}
          />
        </div>
        <Link href={urls.profile.view(user.id)} className="block">
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </Link>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>{user?.topicsCount} Topic(s)</TooltipTrigger>
            <TooltipContent>
              <div>{user?.topicsCount} Topic(s)</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="ml-auto text-muted-foreground">
          Joined at: {joinDateFormat}
        </div>
      </div>
      {userSession.moderator && !user.owner && (
        <UserControlMenus user={user} className="absolute right-6 top-5" />
      )}
    </Card>
  );
}
