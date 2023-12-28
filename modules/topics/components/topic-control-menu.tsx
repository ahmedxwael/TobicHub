"use client";

import CustomAlertDialog from "@/components/custom-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { EmailRequestBodyType } from "@/emails/types";
import { Topic } from "@/modules/topics/types";
import { UserSessionType } from "@/modules/user/types";
import { OWNER_EMAIL } from "@/shared/flags";
import { sendEmail } from "@/utils/email";
import { deleteTopic, editTopic } from "@/utils/topic-utils";
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type TopicControlMenuProps = {
  topic: Topic;
  className?: string;
  userSession: UserSessionType;
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
    userSession && (userSession?.id === topic.author.id || userSession?.admin);

  async function handleTopicApprovement(topicId: string) {
    setIsLoading(true);
    await editTopic(topicId, { isApproved: true });

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
    await editTopic(topicId, { isApproved: false });

    toggleApproved();
    toast({
      title: "Topic has been unapproved.",
    });

    router.refresh();
    setIsLoading(false);
  }

  const handleTopicDelete = async () => {
    setIsLoading(true);
    await deleteTopic(topic.id);

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
        <DropdownMenu>
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
          {isDropdownOpen && (
            <DropdownMenuContent align="end" className="w-[170px]">
              {userSession?.admin &&
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
              <Button
                variant="ghost"
                className="w-full cursor-pointer"
                disabled={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  setIsDropdownOpen(false);
                  router.push(`/edit-topic/${topic.id}`);
                  setIsLoading(false);
                }}
              >
                Edit
              </Button>
              <CustomAlertDialog
                action={handleTopicDelete}
                title="Delete"
                variant="ghost"
                description="This action cannot be undone. Are you sure that you want to delete this topic?"
                className="text-red-600 hover:bg-red-600 hover:text-white"
                disabled={isLoading}
              />
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      )}
    </>
  );
}
