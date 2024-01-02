import { authOptions } from "@/app/api/auth/options";
import NoData from "@/components/no-data";
import NotFound from "@/components/not-found";
import { UserSessionType } from "@/modules/user/types";
import { getServerSession } from "next-auth";
import { getTopicComments } from "../../services/topics-services";
import { Comment, Topic } from "../../types";
import CommentCard from "./comment-card";

type CommentsSectionProps = {
  topic: Topic;
};

export default async function CommentsSection({ topic }: CommentsSectionProps) {
  const session = await getServerSession(authOptions);
  const userSession = session?.user as UserSessionType;

  const comments = await getTopicComments({
    topicId: topic.id,
    isApproved: true,
  });

  if (!comments) {
    return <NotFound message="Couldn't get topic's comments." />;
  }

  return comments.length > 0 ? (
    <div className="flex flex-col gap-6">
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
  );
}
