import Form from "@/components/Form";
import { getAllTopics, getTopic } from "@/utils/topic-utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics | Edit topic",
  description: "This page contains a form to update an existing topic.",
};

export const generateStaticParams = async () => {
  const topics = await getAllTopics();

  if (!topics) {
    return [];
  }

  return topics.map((topic) => ({ id: topic.id }));
};

export const revalidate = 0;

const EditTopic = async ({ params: { id } }: { params: { id: string } }) => {
  const topic = await getTopic(id, true);

  return (
    <main className="center">
      <Form type="edit" currentTopic={topic} />
    </main>
  );
};

export default EditTopic;
