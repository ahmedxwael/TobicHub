import TopicsSection from "@/components/topics/topics-section";

export const revalidate = 0;

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col gap-10">
      <TopicsSection title="topics" type="admin" />
    </div>
  );
}
