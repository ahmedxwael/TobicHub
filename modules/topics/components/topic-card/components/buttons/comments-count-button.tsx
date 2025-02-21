import { getTopicComments } from "@/actions/topics/topic-actions";
import NoData from "@/components/no-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Comment } from "@/modules/topics/types";
import UserAvatar from "@/modules/user/components/profile/user-avatar";
import { UsersListSkeleton } from "@/modules/user/components/user-skeletons";
import { urls } from "@/shared/urls";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link } from "lucide-react";
import { useEffect, useState } from "react";

type CommentsCountButtonProps = {
  commentsCount: number;
  topicId: string;
};

type CommentsObject = {
  loading: boolean;
  comments: Comment[];
};

export function CommentsCountButton({
  commentsCount = 0,
  topicId,
}: CommentsCountButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [commentsObject, setCommentsObject] = useState<CommentsObject>({
    comments: [],
    loading: true,
  });

  useEffect(() => {
    if (dialogOpen) {
      // setLikesObject((prev) => ({ ...prev, loading: true }));

      getTopicComments(topicId)
        .then(({ comments }) => {
          setCommentsObject((prev) => ({ ...prev, comments }));
        })
        .catch()
        .finally(() =>
          setCommentsObject((prev) => ({ ...prev, loading: false }))
        );
    }
  }, [dialogOpen, topicId]);

  return (
    <Dialog onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="p-0 font-normal text-muted-foreground hover:text-primary"
        >
          <span>{commentsCount} comments</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Total comments</DialogTitle>
        <Separator />
        <DialogDescription className="flex max-h-80 flex-col">
          {commentsObject.loading ? (
            <UsersListSkeleton />
          ) : commentsObject.comments.length > 0 ? (
            commentsObject.comments.map((comment, index) => {
              const { id, user } = comment;
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
                  {commentsObject.comments.length - 1 !== index && (
                    <Separator />
                  )}
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
