import { Card, CardHeader } from "@/components/ui/card";
import UserControlMenus from "@/components/user/user-control-menu";
import { UserType } from "@/types";
import Image from "next/image";
import Link from "next/link";

type UserCardProps = {
  user: UserType;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="">
      <CardHeader className="flex flex-row justify-between gap-4 p-4 sm:items-center sm:p-6">
        <Link
          href={`/profile/${user.id}`}
          className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center"
        >
          <Image
            src={user.image ?? "images/avatar.jpg"}
            alt="user image"
            width={40}
            height={40}
            loading="lazy"
            className="borders rounded-full"
          />
          <div>
            <div>{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </Link>
        <UserControlMenus user={user} />
      </CardHeader>
    </Card>
  );
}
