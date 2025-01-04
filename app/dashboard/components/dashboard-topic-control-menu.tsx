import { deleteTopicAction } from "@/actions/topics/topic-actions/delete-topic";
import { editTopicAction } from "@/actions/topics/topic-actions/edit-topic";
import CustomAlertDialog from "@/components/custom-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Topic } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DashboardTopicControlMenuProps = {
  topic: Topic;
  className?: string;
};

export default function DashboardTopicControlMenu({
  topic,
  className,
}: DashboardTopicControlMenuProps) {
  const router = useRouter();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  async function handleTopicApprovement(topicId: string) {
    setIsLoading(true);
    await editTopicAction(topicId, { approved: true });

    toast({
      title: "Topic has been approved successfully.",
      variant: "success",
    });

    router.refresh();
    setIsLoading(false);
  }

  async function handleTopicUnApprovement(topicId: string) {
    setIsLoading(true);
    await editTopicAction(topicId, { approved: false });

    toast({
      title: "Topic has been unapproved.",
    });

    router.refresh();
    setIsLoading(false);
  }

  const handleTopicDelete = async () => {
    setIsLoading(true);
    await deleteTopicAction({
      topicId: topic.id,
      authorId: topic.authorId,
    });

    toast({
      title: "Topic has been deleted.",
    });

    setIsLoading(false);
    setIsDropdownOpen(false);
    router.refresh();
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild className={className}>
          <Button
            onClick={() => setIsDropdownOpen(true)}
            className="h-fit w-fit px-2"
            variant="ghost"
            aria-label="options"
          >
            <MoreHorizontal size={15} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[170px]">
          {!topic.approved ? (
            <Button
              disabled={isLoading}
              variant="ghost"
              className="w-full cursor-pointer hover:text-white"
              onClick={() => handleTopicApprovement(topic.id)}
            >
              Approve
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="w-full cursor-pointer"
              disabled={isLoading}
              onClick={() => handleTopicUnApprovement(topic.id)}
            >
              Unapproved
            </Button>
          )}
          <CustomAlertDialog
            action={handleTopicDelete}
            title="Delete"
            variant="ghost"
            description="This action cannot be undone. Are you sure that you want to delete this topic?"
            className="text-red-600 hover:bg-red-600 hover:text-white"
            disabled={isLoading}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
