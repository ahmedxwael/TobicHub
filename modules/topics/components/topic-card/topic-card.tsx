import { Card } from "@/components/ui/card";
import { Topic, User } from "@prisma/client";
import type { Session } from "next-auth";
import TopicCardContent from "./topic-card-content";
import TopicCardHeader from "./topic-card-header";
import TopicInteractionButtons from "./topic-interaction-buttons";

type TopicCardProps = {
  topic: Topic & { author: User };
  session: Session | null;
};

export default function TopicCard({ topic, session }: TopicCardProps) {
  const userSession = session?.user as User;

  return (
    <Card
      key={topic.id}
      className="mx-auto max-w-full animate-show-card space-y-5 border-0"
    >
      <TopicCardHeader topic={topic} userSession={userSession} />
      <TopicCardContent topic={topic} />
      <TopicInteractionButtons topic={topic} userSession={userSession} />
    </Card>
  );
}
