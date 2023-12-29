import { Card, CardContent } from "@/components/ui/card";
import { URLS } from "@/shared/urls";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Topic } from "../types";

type SearchItemProps = {
  topic: Topic;
};

export default function SearchItem({ topic }: SearchItemProps) {
  const router = useRouter();

  return (
    <Card>
      <CardContent className="space-y-3 py-4">
        <Link
          href={URLS.profile.view(topic?.authorId)}
          className="flex w-fit items-center gap-3"
        >
          <Image
            priority
            src={topic?.author.image || "/images/avatar.png"}
            alt="user"
            width={500}
            height={500}
            className="h-8 w-8 rounded-full border-2 bg-muted object-cover"
          />
          <div className="text-sm text-muted-foreground">
            {topic?.author.name}
          </div>
        </Link>
        <div
          onClick={() => router.push(URLS.topics.view(topic?.id))}
          className="cursor-pointer space-y-1"
        >
          <div className="line-clamp-1 font-semibold">{topic?.title}</div>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {topic?.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
