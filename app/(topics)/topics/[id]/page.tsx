import BackButton from "@/components/back-button";
import NotFound from "@/components/not-found";
import { Separator } from "@/components/ui/separator";
import CommentsSection from "@/modules/topics/components/comments/comments-section";
import { getTopic, getTopics } from "@/modules/topics/services/topics-services";
import UserAvatar from "@/modules/user/components/profile/user-avatar";
import { ParamsType } from "@/shared/types";
import { URLS } from "@/shared/urls";
import { Metadata } from "next";
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
    <section className="mx-auto my-20 max-w-[800px]">
      <BackButton />
      <div className="space-y-8">
        <div className="border-b pb-6 md:pb-8">
          <Link
            href={URLS.profile.view(topic.authorId)}
            className="flex w-fit items-center gap-4"
          >
            <UserAvatar image={topic.author?.image || ""} />
            <div className="flex flex-col">
              <h2 className="text-sm font-medium">{topic.author.name}</h2>
              {!!date && (
                <span className="inline-block text-xs text-muted-foreground">
                  {date}
                </span>
              )}
            </div>
          </Link>
        </div>
        <h1 className="text-2xl font-bold capitalize md:text-3xl">
          {topic.title}
        </h1>
        <p className="whitespace-break-spaces leading-7 text-muted-foreground">
          {topic.description}
        </p>
        {topic.resource && (
          <div className="mt-4 space-y-2">
            <h3>Recourses:</h3>
            <Link
              href={topic.resource}
              className="block text-blue-500"
              target="_blank"
            >
              {topic.resource}
            </Link>
          </div>
        )}
      </div>
      <Separator className="my-6" />
      <CommentsSection topic={topic} />
    </section>
  );
}
