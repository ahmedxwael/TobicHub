"use client";

import { updateComment } from "@/actions/topics/comment-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Comment } from "../../types";

type UpdateCommentProps = {
  comment: Comment;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export default function UpdateComment({
  comment,
  isLoading,
  setIsLoading,
}: UpdateCommentProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [content, setContent] = useState(comment.content);

  const handleUpdateComment = async () => {
    setIsLoading(true);

    await updateComment({
      commentId: comment.id,
      content,
    });

    toast({
      title: "Comment updated successfully.",
      description: "Your comment will appear after it has been approved.",
      variant: "success",
    });

    setIsLoading(false);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleUpdateComment}
      className="relative flex items-center gap-4"
    >
      <Input
        type="text"
        placeholder="Add a comment..."
        className="h-auto flex-1 border-none p-4"
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
  );
}
