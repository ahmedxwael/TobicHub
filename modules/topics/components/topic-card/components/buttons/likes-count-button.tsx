import { getTopicLikes } from "@/actions/topics/topic-actions";
import NoData from "@/components/no-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Like } from "@/modules/topics/types";
import UserAvatar from "@/modules/user/components/profile/user-avatar";
import { UsersListSkeleton } from "@/modules/user/components/user-skeletons";
import { urls } from "@/shared/urls";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";
import { useEffect, useState } from "react";

type LikesCountButtonProps = {
  likesCount: number;
  topicId: string;
};

type LikesObject = {
  loading: boolean;
  likes: Like[];
};

export function LikesCountButton({
  likesCount = 0,
  topicId,
}: LikesCountButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [likesObject, setLikesObject] = useState<LikesObject>({
    likes: [],
    loading: true,
  });

  useEffect(() => {
    if (dialogOpen) {
      // setLikesObject((prev) => ({ ...prev, loading: true }));

      getTopicLikes(topicId)
        .then(({ likes }) => {
          setLikesObject((prev) => ({ ...prev, likes }));
        })
        .catch()
        .finally(() => setLikesObject((prev) => ({ ...prev, loading: false })));
    }
  }, [dialogOpen, topicId]);

  return (
    <Dialog onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="ml-auto p-0 font-normal text-muted-foreground hover:text-primary"
        >
          <span>{likesCount} likes</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Total likes</DialogTitle>
        <Separator />
        <DialogDescription className="flex max-h-80 flex-col">
          {likesObject.loading ? (
            <UsersListSkeleton />
          ) : likesObject.likes.length > 0 ? (
            likesObject.likes.map((like, index) => {
              const { id, user } = like;
              return (
                <>
                  <Link
                    href={urls.profile.view(user.id)}
                    key={id}
                    className="flex items-center gap-3 p-3 transition-colors hover:bg-muted"
                  >
                    <UserAvatar
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8"
                    />
                    <span className="text-sm">{user.name}</span>
                  </Link>
                  {likesObject.likes.length - 1 !== index && <Separator />}
                </>
              );
            })
          ) : (
            <NoData />
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
