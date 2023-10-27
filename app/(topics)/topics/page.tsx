import TopicsSection from "@/components/topics/topics-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics | TopicHub",
  description:
    "Topics page that contains general information about popular topics.",
};

const TopicsPage = async () => {
  return (
    <section className="flex flex-col gap-10">
      <TopicsSection title="all topics" />
    </section>
  );
};

export default TopicsPage;
