import { getComments } from "@/actions/topics/comment-actions";
import { authOptions } from "@/app/api/auth/options";
import NoData from "@/components/no-data";
import NotFound from "@/components/not-found";
import { Separator } from "@/components/ui/separator";
import { UserSessionType } from "@/modules/user/types";
import { getServerSession } from "next-auth";
import { Comment, Topic } from "../../types";
import AddComment from "./add-comment";
import CommentCard from "./comment-card";

type CommentsSectionProps = {
  topic: Topic;
};

export default async function CommentsSection({ topic }: CommentsSectionProps) {
  const session = await getServerSession(authOptions);
  const userSession = session?.user as UserSessionType;

  const comments = await getComments({
    topicId: topic.id,
    isApproved: true,
  });

  if (!comments) {
    return <NotFound message="Couldn't get topic's comments." />;
  }

  return (
    <div>
      {userSession && (
        <>
          <AddComment topic={topic} userSession={userSession} />
          <Separator className="mb-8 mt-4" />
        </>
      )}
      {comments.length > 0 ? (
        <div className="flex max-h-[800px] flex-col gap-8 overflow-auto rounded-3xl">
          {comments.map((comment: Comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              topic={topic}
              userSession={userSession}
            />
          ))}
        </div>
      ) : (
        <NoData message="No comments yet." />
      )}
    </div>
  );
}
