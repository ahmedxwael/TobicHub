import { TopicType } from "@/types";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { UserType } from "../nav-bar/user-buttons";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import ControlMenu from "./control-menu";

type TopicCardProps = {
  topic: TopicType;
  session: Session | null;
};

const TopicCard = ({ topic, session }: TopicCardProps) => {
  const user = session?.user as UserType | undefined;

  const updatedAtDate = topic.updated_at ? new Date(topic.updated_at) : null;
  const date = updatedAtDate
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        updatedAtDate
      )
    : null;

  return (
    <Card
      key={topic.id}
      className="space-y-5 dark:shadow-[0_8px_16px_0_rgba(0,0,0,0.04),8px_0_16px_0_rgba(0,0,0,0.04)]"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <Link
          href={`/profile/${topic.User.id}`}
          className="mr-auto flex w-fit items-center gap-4"
        >
          <Image
            src={topic.User.image ?? "images/avatar.jpg"}
            alt="user image"
            width={40}
            height={40}
            loading="lazy"
            className="rounded-full border  "
          />
          <div className="flex flex-col">
            <h2 className="text-sm font-medium">{topic.User.name}</h2>
            {!!date && (
              <span className="inline-block text-xs text-muted-foreground">
                {date}
              </span>
            )}
          </div>
        </Link>
        <ControlMenu user={user} topic={topic} />
      </CardHeader>
      <CardContent>
        <Link
          href={`/topics/${topic.id}`}
          className="line-clamp-1 w-fit text-xl font-semibold capitalize"
        >
          {topic.title}
        </Link>
        <CardDescription className="mt-2 line-clamp-5 leading-6">
          {topic.description}
        </CardDescription>
        {topic.link && (
          <div className="mt-4 space-y-2 border-t pt-4 text-sm">
            <h3>Recourses:</h3>
            <Link
              href={topic.link}
              className="block w-fit max-w-full truncate text-blue-500"
              target="_blank"
            >
              {topic.link}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(TopicCard);
