"use client";

import CardBadge from "@/components/card-badge";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Topic } from "@/modules/topics/types";
import { UserSessionType } from "@/modules/user/types";
import { URLS } from "@/shared/urls";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import TopicControlMenu from "./topic-control-menu";

type TopicCardProps = {
  topic: Topic;
  session: Session | null;
};

export default function TopicCard({ topic, session }: TopicCardProps) {
  const userSession = session?.user as UserSessionType;
  const pathname = usePathname();

  const [isApproved, setIsApproved] = useState(topic.isApproved);

  const updatedAtDate = new Date(topic.updatedAt);
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    updatedAtDate
  );

  return (
    <Card
      key={topic.id}
      className="mx-auto max-w-full animate-show-card space-y-5 border-0"
    >
      <CardHeader className="relative flex flex-row items-center justify-between">
        <div className="flex w-fit flex-wrap items-center gap-4">
          <Link
            href={URLS.profile.topics(topic.authorId)}
            className="flex items-center gap-4"
          >
            <Image
              src={topic.author.image || "/images/avatar.png"}
              alt="user image"
              width={500}
              height={500}
              loading="lazy"
              className="h-10 w-10 rounded-full border object-cover"
            />
            <div className="flex flex-col">
              <h2 className="text-sm font-medium">
                {topic.author.displayName || topic.author.name}
              </h2>
              {!!date && (
                <span className="inline-block text-xs text-muted-foreground">
                  {date}
                </span>
              )}
            </div>
          </Link>
          {userSession && pathname.includes(userSession.id) && (
            <CardBadge
              isPrimary={isApproved}
              label={isApproved ? "Approved" : "Not Approved"}
            />
          )}
        </div>
        <TopicControlMenu
          userSession={userSession}
          topic={topic}
          toggleApproved={() => setIsApproved(!isApproved)}
          isApproved={isApproved}
          className="absolute right-6 top-5"
        />
      </CardHeader>
      <CardContent>
        <Link
          href={URLS.topics.view(topic.id)}
          className="line-clamp-1 w-fit text-xl font-semibold capitalize"
        >
          {topic.title}
        </Link>
        <CardDescription className="mt-2 line-clamp-5 leading-6">
          {topic.description}
        </CardDescription>
        {topic.resource && (
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <h3>Recourses:</h3>
            <Link
              href={topic.resource}
              className="block w-fit max-w-full truncate text-sky-600"
              target="_blank"
            >
              {topic.resource}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
