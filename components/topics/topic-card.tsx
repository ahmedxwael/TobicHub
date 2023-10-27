import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TopicType } from "@/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import ControlMenu from "../control-menu";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

const TopicCard = async ({ topic }: { topic: TopicType }) => {
  const session = await getServerSession(authOptions);

  const updatedAtDate = topic.updatedAt ? new Date(topic.updatedAt) : null;
  const date = updatedAtDate
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        updatedAtDate
      )
    : null;

  return (
    <Card
      key={topic._id}
      className="space-y-5 dark:shadow-[0_8px_16px_0_rgba(0,0,0,0.04),8px_0_16px_0_rgba(0,0,0,0.04)]"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <Link
          href={`/profile/${topic.creator._id}`}
          className="flex w-fit items-center gap-4"
        >
          <Image
            src={topic.creator.image}
            alt="user image"
            width={35}
            height={35}
            loading="lazy"
            className="rounded-full border  "
          />
          <div className="flex flex-col">
            <h2 className="text-sm font-medium">{topic.creator.name}</h2>
            {!!date && (
              <span className="inline-block text-xs text-muted-foreground">
                {date}
              </span>
            )}
          </div>
        </Link>
        <ControlMenu session={session} topic={topic} />
      </CardHeader>
      <CardContent>
        <Link
          href={`/topics/${topic._id}`}
          className="line-clamp-1 w-fit text-xl font-semibold capitalize"
        >
          {topic.title}
        </Link>
        <CardDescription className="mt-2 line-clamp-6 leading-6">
          {topic.description}
        </CardDescription>
        {topic.link && (
          <div className="mt-4 space-y-2 border-t pt-4 text-sm">
            <h3>Recourses:</h3>
            <Link
              href={topic.link}
              className="block w-fit truncate text-blue-500"
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
