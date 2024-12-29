import UserAvatar from "@/modules/user/components/profile/user-avatar";
import { urls } from "@/shared/urls";
import { Comment, Topic, User } from "@prisma/client";
import Link from "next/link";
import CommentControlMenu from "./comment-control-menu";

type CommentCardProps = {
  comment: Comment & {
    user: User;
  };
  userSession: User;
  topic: Topic & {
    author: User;
  };
};

export default function CommentCard({
  comment,
  topic,
  userSession,
}: CommentCardProps) {
  return (
    <div className="rounded-3xl bg-muted p-6 text-foreground dark:bg-muted/40">
      <div className="flex items-center justify-between gap-4">
        <Link
          href={urls.profile.view(comment.userId)}
          className="flex items-center gap-4"
        >
          <UserAvatar image={comment.user.avatar || ""} />
          <div className="flex flex-col gap-1">
            <span className="text-sm">{comment.user.name}</span>
            <span className="text-xs">{comment.createdAt.toDateString()}</span>
          </div>
        </Link>
        <CommentControlMenu
          comment={comment}
          userSession={userSession}
          topic={topic}
        />
      </div>
      <p className="mt-6">{comment.content}</p>
    </div>
  );
}
