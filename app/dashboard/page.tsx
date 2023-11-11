import NotFound from "@/components/not-found";
import TopicsSection from "@/modules/topics/components/topics-section";
import { TopicType } from "@/modules/topics/types";

export const revalidate = 0;

export default async function DashboardPage() {
  const topics: TopicType[] = [];

  if (!topics) {
    return <NotFound message="Could not retrieve the list of topics." />;
  }

  return (
    <section className="flex w-full flex-1 flex-col gap-10 lg:max-w-2xl">
      <TopicsSection title="topics" type="admin" />
    </section>
  );
}
