import { Card, CardFooter } from "@/components/ui/card";
import { Topic } from "@/modules/topics/types";
import { UserSessionType } from "@/modules/user/types";
import type { Session } from "next-auth";
import TopicCardContent from "./topic-card-content";
import TopicCardHeader from "./topic-card-header";
import TopicInteractionButtons from "./topic-interaction-buttons";

type TopicCardProps = {
  topic: Topic;
  session: Session | null;
};

export default function TopicCard({ topic, session }: TopicCardProps) {
  const userSession = session?.user as UserSessionType;

  return (
    <Card
      key={topic.id}
      className="mx-auto max-w-full animate-show-card space-y-5 border-0"
    >
      <TopicCardHeader topic={topic} userSession={userSession} />
      <TopicCardContent topic={topic} />
      {userSession && (
        <TopicInteractionButtons topic={topic} userSession={userSession} />
      )}
    </Card>
  );
}
