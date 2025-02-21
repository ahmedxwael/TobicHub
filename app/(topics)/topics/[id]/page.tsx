import { authOptions } from "@/app/api/auth/options";
import EditTopic from "@/app/dashboard/components/table/edit-topic";
import BackButton from "@/components/back-button";
import CardBadge from "@/components/card-badge";
import NotFound from "@/components/not-found";
import { Separator } from "@/components/ui/separator";
import CommentsSection from "@/modules/topics/components/comments/comments-section";
import { getTopic, getTopics } from "@/modules/topics/services/topics-services";
import UserAvatar from "@/modules/user/components/profile/user-avatar";
import { UserSessionType } from "@/modules/user/types";
import { ParamsType } from "@/shared/types";
import { urls } from "@/shared/urls";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const generateMetadata = async ({
  params: { id },
}: ParamsType): Promise<Metadata> => {
  const topic = await getTopic(id);

  if (!topic) {
    return { title: "Undefined | TopicHub", description: "" };
  }

  return {
    title: `${topic.title} | TopicHub`,
    description: topic.description,
  };
};

export const generateStaticParams = async () => {
  const topics = await getTopics();

  if (!topics || topics.length === 0) {
    return [];
  }

  return topics.map((topic) => ({ id: topic.id }));
};

export const revalidate = 0;

export default async function TopicPage({ params: { id } }: ParamsType) {
  const topic = await getTopic(id);
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as UserSessionType;

  if (!topic) {
    return <NotFound message="Couldn't get your topic." />;
  }

  const updatedAtDate = topic.updatedAt ? new Date(topic.updatedAt) : null;
  const date = updatedAtDate
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        updatedAtDate
      )
    : null;

  return (
    <section className="mx-auto my-20 w-[800px] max-w-full">
      <BackButton />
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b pb-6 md:pb-8">
          <div className="flex items-center gap-4 ">
            <Link
              href={urls.profile.view(topic.authorId)}
              className="flex w-fit items-center gap-4"
            >
              <UserAvatar src={topic.author.avatar || ""} />
              <div className="flex flex-col">
                <h2 className="text-sm font-medium">{topic.author.name}</h2>
                {!!date && (
                  <span className="inline-block text-xs text-muted-foreground">
                    {date}
                  </span>
                )}
              </div>
            </Link>
            {sessionUser && topic.authorId === sessionUser.id && (
              <CardBadge
                isPrimary={topic.approved}
                label={topic.approved ? "Approved" : "Not Approved"}
              />
            )}
          </div>
          {sessionUser && topic.authorId === sessionUser.id && (
            <EditTopic topic={topic} user={sessionUser} />
          )}
        </div>
        <h1 className="text-2xl font-bold capitalize md:text-3xl">
          {topic.title}
        </h1>
        <p className="whitespace-break-spaces leading-7 text-muted-foreground">
          {topic.description}
        </p>
        {topic.resources.map((resource, index) => (
          <div key={index} className="mt-4 space-y-2">
            <h3>Resources:</h3>
            <Link
              href={resource}
              className="block text-blue-500"
              target="_blank"
            >
              {resource}
            </Link>
          </div>
        ))}
      </div>
      <Separator className="mb-4 mt-6" />
      <CommentsSection topic={topic} />
    </section>
  );
}
