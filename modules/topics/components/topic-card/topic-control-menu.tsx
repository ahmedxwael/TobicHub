"use client";

import EditTopic from "@/app/dashboard/components/table/edit-topic";
import CustomAlertDialog from "@/components/custom-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Topic, User } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { deleteTopic, editTopic } from "../../services/topics-services";

type TopicControlMenuProps = {
  topic: Topic & {
    author: User;
  };
  className?: string;
  userSession: User;
  toggleApproved: () => void;
  isApproved: boolean;
};

export default function TopicControlMenu({
  topic,
  userSession,
  className,
  toggleApproved,
  isApproved,
}: TopicControlMenuProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hasControl =
    userSession &&
    (userSession?.id === topic.author.id || userSession?.moderator);

  async function handleTopicApprovement(topicId: string) {
    setIsLoading(true);
    await editTopic(topicId, { approved: true });

    toggleApproved();
    toast({
      title: "Topic has been approved successfully.",
      variant: "success",
    });

    router.refresh();
    setIsLoading(false);
  }

  async function handleTopicUnApprovement(topicId: string) {
    setIsLoading(true);
    await editTopic(topicId, { approved: false });

    toggleApproved();
    toast({
      title: "Topic has been unapproved.",
    });

    router.refresh();
    setIsLoading(false);
  }

  const handleTopicDelete = async () => {
    setIsLoading(true);
    await deleteTopic(topic.id, topic.authorId);

    toast({
      title: "Topic has been deleted.",
    });

    setIsLoading(false);
    setIsDropdownOpen(false);
    router.refresh();
  };

  return (
    <>
      {hasControl && (
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
            {userSession?.moderator &&
              pathname.endsWith("/dashboard") &&
              (!isApproved ? (
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
              ))}
            <EditTopic className="w-full" topic={topic} title="Edit" />
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
      )}
    </>
  );
}
