import { Button } from "@/components/ui/button";
import { CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { urls } from "@/shared/urls";
import { Topic } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

type TopicCardContentProps = {
  topic: Topic;
};

export default function TopicCardContent({ topic }: TopicCardContentProps) {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <CardContent className="sm:px-8">
      <Link
        href={urls.topics.view(topic.id)}
        className="line-clamp-1 block w-fit text-xl font-semibold capitalize"
      >
        {topic.title}
      </Link>
      <div className="flex flex-col gap-2">
        <Link href={urls.topics.view(topic.id)}>
          <CardDescription
            className={cn(
              "mt-2 line-clamp-5 whitespace-break-spaces leading-6",
              isReadMore && "line-clamp-none"
            )}
          >
            {topic.description}
          </CardDescription>
        </Link>
        <Button
          onClick={() => setIsReadMore(!isReadMore)}
          variant="link"
          className="w-fit p-0"
        >
          {isReadMore ? "Read Less" : "Read More"}
        </Button>
      </div>
      {topic.resources && (
        <div className="mt-6 space-y-2 text-sm">
          <h3>Resources:</h3>
          {topic.resources.map((resource, index) => (
            <Link
              key={index}
              href={resource}
              className="block w-fit max-w-full truncate text-sky-600"
              target="_blank"
            >
              {resource}
            </Link>
          ))}
        </div>
      )}
    </CardContent>
  );
}
