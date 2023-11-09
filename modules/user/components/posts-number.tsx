import { getUserTopics } from "@/utils/topic-utils";

type PostsNumberProps = {
  userId: string;
};

export default async function PostsNumber({ userId }: PostsNumberProps) {
  const topics = await getUserTopics(userId);

  return (
    <div className="flex items-center gap-2 text-neutral-400">
      <span className="inline-block">{topics?.length}</span>
      Topic(s)
    </div>
  );
}
