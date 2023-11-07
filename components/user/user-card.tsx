import { Card, CardHeader } from "@/components/ui/card";
import UserControlMenus from "@/components/user/user-control-menu";
import { UserType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import CardBadge from "../card-badge";
import { Badge } from "../ui/badge";

type UserCardProps = {
  user: UserType;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="default-shadow">
      <CardHeader className="relative flex gap-2 p-4 sm:p-6">
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
            />
          </div>
          <div className="block">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </Link>
        <span className="inline-block w-fit text-sm text-muted-foreground">
          {user?.topics?.length || 0} Topic(s)
        </span>
        <UserControlMenus user={user} className="absolute right-6 top-5" />
      </CardHeader>
    </Card>
  );
}