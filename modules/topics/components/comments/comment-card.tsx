import { UserSessionType } from "@/modules/user/types";
import Image from "next/image";
import { Comment, Topic } from "../../types";
import CommentControlMenu from "./comment-control-menu";

type CommentCardProps = {
  comment: Comment;
  userSession: UserSessionType;
  topic: Topic;
};

export default function CommentCard({
  comment,
  topic,
  userSession,
}: CommentCardProps) {
  return (
    <div className="rounded-xl bg-muted p-6 text-foreground dark:bg-muted/50">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 flex-shrink-0">
          <Image
            src={comment.user.image || "/images/avatar.png"}
            alt="user image"
            width={400}
            height={400}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm">{comment.user.name}</span>
          <span className="text-xs">{comment.createdAt.toDateString()}</span>
        </div>
        <CommentControlMenu
          comment={comment}
          userSession={userSession}
          topic={topic}
          className="ml-auto"
        />
      </div>
      <p className="mt-6">{comment.content}</p>
    </div>
  );
}
