import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/modules/user/components/profile/user-avatar";
import { urls } from "@/shared/urls";
import { Topic, User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SearchItemProps = {
  topic: Topic & {
    author: User;
  };
};

export default function SearchItem({ topic }: SearchItemProps) {
  const router = useRouter();

  return (
    <Card>
      <CardContent className="space-y-3 py-4">
        <Link
          href={urls.profile.view(topic?.authorId)}
          className="flex w-fit items-center gap-3"
        >
          <UserAvatar image={topic?.author.avatar || ""} />
          <div className="text-sm text-muted-foreground">
            {topic?.author.name}
          </div>
        </Link>
        <div
          onClick={() => router.push(urls.topics.view(topic?.id))}
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
