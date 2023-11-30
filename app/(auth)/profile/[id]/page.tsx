import BackButton from "@/components/back-button";
import NotFound from "@/components/not-found";
import PageHeading from "@/components/page-heading";
import TopicsSkeleton from "@/components/topics-skeleton";
import SearchTopic from "@/modules/topics/components/search-topic";
import TopicsSection from "@/modules/topics/components/topics-section";
import ProfileCard from "@/modules/user/components/profile-card";
import { ParamsType } from "@/shared/types";
import { getTopics } from "@/utils/topic-utils";
import { getUser, getUsers } from "@/utils/user-utils";
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

export const generateStaticParams = async () => {
  const users = await getUsers();

  if (!users) {
    return [];
  }

  return users.map((user) => ({ id: user.id }));
};

export const revalidate = 0;

export default async function Profile({ params: { id } }: ParamsType) {
  const user = await getUser(id);
  const topicsPromise = getTopics({
    where: { userId: id, approved: true },
  });

  if (!user) {
    return <NotFound message="Couldn't get user's data." />;
  }

  return (
    <section className="flex flex-col">
      <BackButton />
      <ProfileCard user={user} />
      <div className="mt-20 flex flex-col gap-12">
        <div className="flex w-full flex-wrap items-center justify-between gap-6">
          <PageHeading>Topics</PageHeading>
          <SearchTopic userId={user.id} />
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
