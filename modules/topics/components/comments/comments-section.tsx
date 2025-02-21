import { getComments } from "@/actions/topics/topic-actions";
import { authOptions } from "@/app/api/auth/options";
import NoData from "@/components/no-data";
import NotFound from "@/components/not-found";
import { Separator } from "@/components/ui/separator";
import { Comment, Topic, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import AddComment from "./add-comment";
import CommentCard from "./comment-card";

type CommentsSectionProps = {
  topic: Topic & {
    author: User;
  };
};

export default async function CommentsSection({ topic }: CommentsSectionProps) {
  const session = await getServerSession(authOptions);
  const userSession = session?.user as User;

  const comments = await getComments({
    topicId: topic.id,
    approved: true,
  });

  if (!comments) {
    return <NotFound message="Couldn't get topic's comments." />;
  }

  return (
    <div id="comments-sections" className="">
      {userSession && (
        <div>
          <AddComment topic={topic} userSession={userSession} />
          <Separator className="mt-4" />
        </div>
      )}
      {comments.length > 0 ? (
        <div className="flex max-h-[800px] flex-col gap-4 overflow-auto bg-muted/40 p-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment as Comment & { user: User }}
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
