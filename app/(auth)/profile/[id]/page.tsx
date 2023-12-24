import PageHeading from "@/components/page-heading";
import TopicsSkeleton from "@/components/topics-skeleton";
import SearchTopic from "@/modules/topics/components/search-topic";
import TopicsSection from "@/modules/topics/components/topics-section";
import { getUser } from "@/modules/user/services/profile-services";
import { ParamsType } from "@/shared/types";
import { getTopics } from "@/utils/topic-utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = async ({
  params: { id },
}: ParamsType): Promise<Metadata> => {
  const user = await getUser(id);

  if (!user) {
    return {
      title: "Unknown user",
      description: `Unknown profile page.`,
    };
  }

  return {
    title: `${user?.name} | TopicHub`,
    description: `${user?.name} profile page.`,
  };
};

export default async function Profile({ params: { id } }: ParamsType) {
  const topicsPromise = getTopics({
    where: { userId: id, approved: true },
  });

  return (
    <section className="flex w-[800px] max-w-full flex-col">
      <div className="flex flex-col gap-12">
        <div className="flex w-full flex-wrap items-center justify-between gap-6">
          <PageHeading>Topics</PageHeading>
          <SearchTopic userId={id} />
        </div>
        <Suspense fallback={<TopicsSkeleton />}>
          <TopicsSection
            topicsPromise={topicsPromise}
            params={{ where: { userId: id, approved: true } }}
          />
        </Suspense>
      </div>
    </section>
  );
}

Profile;
