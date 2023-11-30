import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopicType } from "../types";

type SearchItemProps = {
  topic?: TopicType;
};

export default function SearchItem({ topic }: SearchItemProps) {
  const router = useRouter();

  return (
    <Card>
      <CardContent className="space-y-3 py-4">
        <Link
          href={`/profile/${topic?.User.id}`}
          className="flex w-fit items-center gap-3"
        >
          <Image
            priority
            src={topic?.User.image || "/images/avatar.png"}
            alt="user"
            width={500}
            height={500}
            className="h-8 w-8 rounded-full border-2 bg-muted object-cover"
          />
          <div className="text-sm text-muted-foreground">
            {topic?.User.name}
          </div>
        </Link>
        <div
          onClick={() => router.push(`/topics/${topic?.id}`)}
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
