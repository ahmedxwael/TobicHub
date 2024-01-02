import { Button } from "@/components/ui/button";
import { CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { URLS } from "@/shared/urls";
import Link from "next/link";
import { useState } from "react";
import { Topic } from "../../types";

type TopicCardContentProps = {
  topic: Topic;
};

export default function TopicCardContent({ topic }: TopicCardContentProps) {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <CardContent>
      <Link
        href={URLS.topics.view(topic.id)}
        className="line-clamp-1 block w-fit text-xl font-semibold capitalize"
      >
        {topic.title}
      </Link>
      <div className="flex flex-col gap-2">
        <Link href={URLS.topics.view(topic.id)}>
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
      {topic.resource && (
        <div className="mt-6 space-y-2 text-sm">
          <h3>Recourses:</h3>
          <Link
            href={topic.resource}
            className="block w-fit max-w-full truncate text-sky-600"
            target="_blank"
          >
            {topic.resource}
          </Link>
        </div>
      )}
    </CardContent>
  );
}
