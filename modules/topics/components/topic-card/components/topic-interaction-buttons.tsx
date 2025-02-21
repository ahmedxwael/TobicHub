"use client";

import {
  getIsLikedTopic,
  toggleLikeAction,
} from "@/actions/topics/topic-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { urls } from "@/shared/urls";
import { Topic, User } from "@prisma/client";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
import AddComment from "../../comments/add-comment";
import { LikesCountButton } from "./buttons";

type TopicsInteractionButtonsProps = {
  topic: Topic & {
    author: User;
  };
  userSession: User;
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
  const [addComment, setAddComment] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleToggleLike = async () => {
    setIsLoading(true);

    await toggleLikeAction({ topicId: topic.id, userId: userSession.id });

    setLiked(!liked);
    setIsLoading(false);
    router.refresh();
  };

  useEffect(() => {
    setIsLoading(true);

    getIsLikedTopic({ topicId: topic.id, userId: userSession?.id })
      .then((isLiked) => {
        setLiked(isLiked);
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false));
  }, [topic.id, userSession?.id]);

  return (
    <div className="mt-4 p-8 pt-0">
      <div className="flex flex-wrap items-center gap-2">
        <LikesCountButton likesCount={topic.likesCount} topicId={topic.id} />
        <Separator orientation="vertical" className="h-4 w-px" />
        <Link
          href={`${urls.topics.view(topic.id)}#comments-sections`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "p-0 font-normal text-muted-foreground hover:text-primary"
          )}
        >
          <span>{topic.commentCount} comments</span>
        </Link>
      </div>
      {userSession && (
        <>
          <Separator className="mb-6" />
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-6">
              <TopicInteractionButton
                title={liked ? "Unlike" : "Like"}
                className={liked ? "text-primary" : ""}
                icon={<ThumbsUp size={20} />}
                onClick={handleToggleLike}
                disabled={isLoading}
              />
              <TopicInteractionButton
                title="Comment"
                icon={<MessageCircle size={20} />}
                onClick={() => setAddComment(!addComment)}
                disabled={isLoading}
              />
            </div>
            <AddComment
              topic={topic}
              userSession={userSession}
              autoFocus
              isOpen={addComment}
              onClose={() => setAddComment(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}
