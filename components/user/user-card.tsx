import { Card, CardHeader } from "@/components/ui/card";
import UserControlMenus from "@/components/user/user-control-menu";
import { UserType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

type UserCardProps = {
  user: UserType;
};

export default function UserCard({ user }: UserCardProps) {
  const rule = user.admin ? "Admin" : "User";

  return (
    <Card>
      <CardHeader className="relative flex gap-2 p-4 sm:p-6">
        <Link
          href={`/profile/${user.id}`}
          className="flex flex-col flex-wrap gap-4"
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
            <Badge
              variant={user.admin ? "default" : "outline"}
              className="w-fit"
            >
              {rule}
            </Badge>
          </div>
          <div className="block">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </Link>
        <Badge variant="secondary" className="w-fit">
          {user?.topics?.length || 0} Topic(s)
        </Badge>
        <UserControlMenus user={user} className="absolute right-6 top-5" />
      </CardHeader>
    </Card>
  );
}
