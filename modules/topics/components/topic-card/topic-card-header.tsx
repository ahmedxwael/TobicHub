"use client";

import CardBadge from "@/components/card-badge";
import { CardHeader } from "@/components/ui/card";
import UserAvatar from "@/modules/user/components/profile/user-avatar";
import { urls } from "@/shared/urls";
import { Topic, User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import TopicControlMenu from "./topic-control-menu";

type TopicCardHeaderProps = {
  topic: Topic & { author: User };
  userSession: User;
};

export default function TopicCardHeader({
  topic,
  userSession,
}: TopicCardHeaderProps) {
  const pathname = usePathname();

  const [isApproved, setIsApproved] = useState(topic.approved);

  const updatedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(topic.updatedAt);

  return (
    <CardHeader className="relative flex flex-row items-center justify-between sm:px-8 sm:pt-8">
      <div className="flex w-fit flex-wrap items-center gap-4">
        <Link
          href={urls.profile.view(topic.authorId)}
          className="flex items-center gap-4"
        >
          <UserAvatar image={topic.author?.avatar || ""} />
          <div className="flex flex-col">
            <h2 className="font-medium">{topic.author.name}</h2>
            <span className="inline-block text-xs text-muted-foreground">
              Updated at: <span className="font-medium">{updatedAt}</span>
            </span>
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
