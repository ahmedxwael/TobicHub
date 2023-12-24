import TopicForm from "@/components/topic-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics | Create topic",
  description: "This page contains a form to create a new topic.",
};

const CreateTopic = async () => {
  return (
    <section className="center py-20">
      <TopicForm type="create" />
    </section>
  );
};

export default CreateTopic;
