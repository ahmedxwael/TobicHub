import TopicsSection from "@/components/topics/topics-section";

export const revalidate = 0;

export default function DashboardPage() {
  return (
    <section className="flex w-full flex-1 flex-col gap-10 lg:max-w-2xl">
      <TopicsSection title="topics" type="admin" />
    </section>
  );
}
