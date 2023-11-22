import BackButton from "@/components/back-button";
import ComponentLoader from "@/components/component-loader";
import NotFound from "@/components/not-found";
import PageHeading from "@/components/page-heading";
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
  const topicsPromise = getTopics({ where: { userId: id } });

  if (!user) {
    return <NotFound message="Couldn't get user's data." />;
  }

  return (
    <section className="flex flex-col">
      <BackButton />
      <ProfileCard user={user} />
      <div className="mt-20 flex flex-col gap-12">
        <PageHeading>Topics</PageHeading>
        <Suspense fallback={<ComponentLoader />}>
          <TopicsSection topicsPromise={topicsPromise} />
        </Suspense>
      </div>
    </section>
  );
}

Profile;
