import { authOptions } from "@/app/api/auth/options";
import AddTopic from "@/app/dashboard/components/add-topic";
import NotFound from "@/components/not-found";
import PageHeading from "@/components/page-heading";
import { Pagination } from "@/components/pagination";
import SearchTopic from "@/modules/topics/components/search-topic";
import TopicsList from "@/modules/topics/components/topics-list";
import { getTopics } from "@/modules/topics/services/topics-services";
import { getUser } from "@/modules/user/services/profile-services";
import { UserSessionType } from "@/modules/user/types";
import { GenericObject, ParamsType } from "@/shared/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

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

type UserTopicsPageProps = {
  params: {
    id: string;
  };
  searchParams: GenericObject;
};

export default async function UserTopicsPage({
  params,
  searchParams,
}: UserTopicsPageProps) {
  const skip = Number(searchParams.skip) || 0;

  const session = await getServerSession(authOptions);
  const userSession = session?.user as UserSessionType | undefined;

  const isTheLoggedInUser = !userSession || userSession.id !== params.id;
  const where = isTheLoggedInUser
    ? {
        authorId: params.id,
      }
    : {
        authorId: params.id,
        isApproved: true,
      };

  const topics = await getTopics({
    where,
    skip,
  });

  if (!topics) {
    return <NotFound message="Could not retrieve the list of topics." />;
  }

  return (
    <section className="relative flex w-[800px] max-w-full flex-col">
      <div className="flex flex-col gap-12">
        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <PageHeading>topics</PageHeading>
          </div>

          <SearchTopic userId={params.id} />
          <AddTopic userId={params.id} userSession={userSession} />
        </div>
        <TopicsList session={session} topicsList={topics} />
        <Pagination
          paginationInfo={{
            dataCount: topics.length,
            skip,
            limit: 5,
          }}
        />
      </div>
    </section>
  );
}

UserTopicsPage;
