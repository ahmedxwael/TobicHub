import TopicsSection from "@/components/topics/topics-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics | TopicHub",
  description:
    "Topics page that contains general information about popular topics.",
};

export const revalidate = 1;

const TopicsPage = async () => {
  return (
    <section className="flex flex-col gap-10">
      <TopicsSection title="all topics" type="approved" />
    </section>
  );
};

export default TopicsPage;
