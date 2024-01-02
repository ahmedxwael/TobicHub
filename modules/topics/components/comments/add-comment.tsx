import { addNewComment } from "@/actions/topics/comment-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserSessionType } from "@/modules/user/types";
import { Send } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Topic } from "../../types";

type AddCommentProps = {
  topic: Topic;
  userSession: UserSessionType;
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

export default function AddComment({
  topic,
  userSession,
  isOpen,
  onClose,
}: AddCommentProps) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    setIsLoading(true);

    const commentBody = {
      content: comment,
      topicId: topic.id,
      userId: userSession.id,
    };

    await addNewComment(commentBody);

    toast({
      title: "Comment added successfully.",
      description: "Your comment will appear after it has been approved.",
      variant: "success",
    });

    setComment("");
    setIsLoading(false);
    onClose(false);
  };

  return (
    isOpen && (
      <form
        onSubmit={handleAddComment}
        className="relative flex items-center gap-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Image
            src={userSession.image || "/images/avatar.png"}
            alt="user image"
            width={50}
            height={50}
            className="h-full w-full rounded-full border object-cover"
          />
        </div>
        <Input
          type="text"
          placeholder="Add a comment..."
          className="h-auto flex-1 border-none p-4"
          autoFocus
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
