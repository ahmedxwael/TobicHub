"use client";

import CardBadge from "@/components/card-badge";
import { CardHeader } from "@/components/ui/card";
import { UserSessionType } from "@/modules/user/types";
import { URLS } from "@/shared/urls";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Topic } from "../../types";
import TopicControlMenu from "./topic-control-menu";

type TopicCardHeaderProps = {
  topic: Topic;
  userSession: UserSessionType;
};

export default function TopicCardHeader({
  topic,
  userSession,
}: TopicCardHeaderProps) {
  const pathname = usePathname();

  const [isApproved, setIsApproved] = useState(topic.isApproved);

  const updatedAtDate = new Date(topic.updatedAt);
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    updatedAtDate
  );

  return (
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
  );
}
