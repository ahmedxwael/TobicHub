import UserAvatar from "@/modules/user/components/profile/user-avatar";
import { UserSessionType } from "@/modules/user/types";
import { URLS } from "@/shared/urls";
import Link from "next/link";
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
    <div className="rounded-3xl bg-muted p-6 text-foreground dark:bg-muted/40">
      <div className="flex items-center justify-between gap-4">
        <Link
          href={URLS.profile.view(comment.userId)}
          className="flex items-center gap-4"
        >
          <UserAvatar image={comment.user.image || ""} />
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
