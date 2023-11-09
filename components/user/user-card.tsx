import { Card } from "@/components/ui/card";
import UserControlMenus from "@/components/user/user-control-menu";
import { UserType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import CardBadge from "../card-badge";

type UserCardProps = {
  user: UserType;
};

export default function UserCard({ user }: UserCardProps) {
  const joinDate = new Date(user.created_at);
  const joinDateFormat = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(joinDate);

  return (
    <Card className="default-shadow">
      <div className="relative p-4 sm:p-6">
        <Link
          href={`/profile/${user.id}`}
          className="flex w-fit flex-col flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <Image
              src={user.image ?? "images/avatar.jpg"}
              alt="user image"
              width={40}
              height={40}
              loading="lazy"
              className="borders rounded-full"
            />
            <CardBadge
              isValid={user.admin}
              validLabel="Admin"
              inValidLabel="User"
              isMaster={user.owner}
              masterLabel="Owner"
            />
          </div>
          <div className="block">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </Link>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="inline-block w-fit text-muted-foreground">
            {user?.topics?.length || 0} Topic(s)
          </span>
          <div className="text-muted-foreground">
            Joined at: {joinDateFormat}
          </div>
        </div>
        {!user.owner && (
          <UserControlMenus user={user} className="absolute right-6 top-5" />
        )}
      </div>
    </Card>
  );
}
