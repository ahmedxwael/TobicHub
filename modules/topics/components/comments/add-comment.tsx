"use client";

import { addNewComment, NewCommentType } from "@/actions/topics/topic-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import UserAvatar from "@/modules/user/components/profile/user-avatar";
import { validString } from "@/utils/utils";
import { Topic, User } from "@prisma/client";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AddCommentProps = {
  topic: Topic & {
    author: User;
  };
  userSession: User;
  isOpen?: boolean;
  onClose?: (value: boolean) => void;
  autoFocus?: boolean;
};

export default function AddComment({
  topic,
  userSession,
  isOpen,
  onClose,
  autoFocus,
}: AddCommentProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();

    const validComment = validString(comment);

    if (!validComment) {
      toast({
        title: "Not valid comment",
        description: "Your comment is not valid. Please try again.",
        variant: "destructive",
      });

      return;
    }

    setIsLoading(true);

    const commentBody: NewCommentType = {
      content: comment,
      userId: userSession.id,
      topicId: topic.id,
    };

    await addNewComment(commentBody);

    toast({
      title: "Comment added successfully.",
      description: "Your comment will appear after it has been approved.",
      variant: "success",
    });

    setComment("");
    setIsLoading(false);
    onClose?.(false);
    router.refresh();
  };

  return (
    (isOpen || typeof isOpen === "undefined") && (
      <form
        onSubmit={handleAddComment}
        className="relative flex items-center gap-4"
      >
        <UserAvatar
          src={userSession?.avatar || ""}
          className="h-[50px] w-[50px]"
        />
        <Input
          type="text"
          placeholder="Add a comment..."
          className="h-auto flex-1 border-none p-4"
          autoFocus={autoFocus}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isLoading}
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          disabled={isLoading}
        >
          <Send size={20} />
        </Button>
      </form>
    )
  );
}
