import { InfiniteScrolling } from "@/components/infinite-scrolling/infinite-scrolling";
import NotFound from "@/components/not-found";
import TopicCard from "@/modules/topics/components/topic-card";
import TopicsSection from "@/modules/topics/components/topics-section";
import { TopicType } from "@/modules/topics/types";
import { getSomeTopics } from "@/utils/topic-utils";
import { getServerSession } from "next-auth";

export const revalidate = 0;

export default async function DashboardPage() {
  const topics: TopicType[] = [];
  const session = await getServerSession();

  if (!topics) {
    return <NotFound message="Could not retrieve the list of topics." />;
  }

  return (
    <section className="flex w-full flex-1 flex-col gap-10 lg:max-w-2xl">
      {/* <TopicsSection title="topics" type="admin" /> */}
      <div className="space-y-6 lg:space-y-10">
        {topics.map((topic) => (
          <TopicCard session={session} key={topic.id} topic={topic} />
        ))}
      </div>
      <InfiniteScrolling length={topics.length} />
    </section>
  );
}
