import BackButton from "@/components/back-button";
import NotFound from "@/components/not-found";
import { getTopic, getTopics } from "@/utils/topic-utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TopicPageProps = {
  params: { id: string };
};

export const generateMetadata = async ({
  params: { id },
}: TopicPageProps): Promise<Metadata> => {
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

export const revalidate = 10;

export default async function TopicPage({ params: { id } }: TopicPageProps) {
  const topic = await getTopic(id);

  if (!topic) {
    return <NotFound message="Couldn't get your topic." />;
  }

  const updatedAtDate = topic.updated_at ? new Date(topic.updated_at) : null;
  const date = updatedAtDate
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        updatedAtDate
      )
    : null;

  return (
    <section>
      <BackButton />
      <div className="space-y-8">
        <div className="border-b pb-6 md:pb-8">
          <Link
            href={`/profile/${topic.User.id}`}
            className="flex w-fit items-center gap-4"
          >
            <Image
              src={topic.User.image || "/images/avatar.jpg"}
              alt="user image"
              width={500}
              height={500}
              loading="lazy"
              className="h-14 w-14 rounded-full border object-cover"
            />
            <div className="flex flex-col">
              <h2 className="text-sm font-medium">{topic.User.name}</h2>
              {!!date && (
                <span className="inline-block text-xs text-muted-foreground">
                  {date}
                </span>
              )}
            </div>
          </Link>
        </div>
        <h1 className="text-2xl font-bold first-letter:uppercase md:text-3xl">
          {topic.title}
        </h1>
        <p className="whitespace-break-spaces leading-7">{topic.description}</p>
        {topic.link && (
          <div className="mt-4 space-y-2 border-t pt-4 text-sm">
            <h3>Recourses:</h3>
            <Link
              href={topic.link}
              className="block text-blue-500"
              target="_blank"
            >
              {topic.link}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
