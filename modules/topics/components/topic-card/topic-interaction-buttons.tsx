"use client";

import {
  getIsLikedTopic,
  toggleLikeAction,
} from "@/actions/topics/like-actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { UserSessionType } from "@/modules/user/types";
import { MessageCircle, Repeat2, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { Topic } from "../../types";
import AddComment from "../comments/add-comment";

type TopicsInteractionButtonsProps = {
  topic: Topic;
  userSession: UserSessionType;
};

type TopicInteractionButtonProps = {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function TopicInteractionButton({
  title,
  icon,
  onClick,
  className,
  ...props
}: TopicInteractionButtonProps) {
  return (
    <Button
      {...props}
      variant="ghost"
      className={cn(
        "flex h-auto flex-1 items-center gap-2 py-3 capitalize dark:hover:bg-muted",
        className
      )}
      aria-label={`${title} button`}
      onClick={onClick}
    >
      {icon}
      <span className="hidden sm:inline-block">{title}</span>
    </Button>
  );
}

export default function TopicInteractionButtons({
  topic,
  userSession,
}: TopicsInteractionButtonsProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = async () => {
    setIsLoading(true);

    await toggleLikeAction({ topicId: topic.id, userId: userSession.id });

    setIsLiked(!isLiked);
    setIsLoading(false);
    router.refresh();
  };

  useEffect(() => {
    setIsLoading(true);
    getIsLikedTopic({ topicId: topic.id, userId: userSession?.id })
      .then((isLiked) => {
        setIsLiked(isLiked);
      })
      .catch(() => setIsLiked(false))
      .finally(() => setIsLoading(false));
  }, [topic.id, userSession?.id]);

  return (
    <div className="mt-4 p-8 pt-0">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="">
          <span>{topic.totalLikes} likes</span>
        </div>
        <div className="ml-auto flex items-center gap-2 capitalize">
          <span>{topic.totalApprovedComments} comments</span>
          <Separator orientation="vertical" className="h-4" />
          <span>{topic.totalRepost} repost</span>
        </div>
      </div>
      {userSession && (
        <>
          <Separator className="my-6" />
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-6">
              <TopicInteractionButton
                title={isLiked ? "Unlike" : "Like"}
                className={isLiked ? "text-primary" : ""}
                icon={<ThumbsUp size={20} />}
                onClick={handleToggleLike}
                disabled={isLoading}
              />
              <TopicInteractionButton
                title="Comment"
                icon={<MessageCircle size={20} />}
                onClick={() => setIsAddCommentOpen(!isAddCommentOpen)}
                disabled={isLoading}
              />
              <TopicInteractionButton
                title="Repost"
                icon={<Repeat2 size={20} />}
                onClick={() => {}}
                disabled
              />
            </div>
            <AddComment
              topic={topic}
              userSession={userSession}
              autoFocus
              isOpen={isAddCommentOpen}
              onClose={() => setIsAddCommentOpen(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}
