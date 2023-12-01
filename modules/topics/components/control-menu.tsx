"use client";

import CustomAlertDialog from "@/components/custom-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { TopicType } from "@/modules/topics/types";
import { UserSessionType } from "@/modules/user/types";
import { deleteTopic, editTopic } from "@/utils/topic-utils";
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type ControlMenuProps = {
  topic: TopicType;
  className?: string;
  userSession: UserSessionType;
  toggleApproved: () => void;
  isApproved: boolean;
};

export default function ControlMenu({
  topic,
  userSession,
  className,
  toggleApproved,
  isApproved,
}: ControlMenuProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hasControl =
    userSession && (userSession?.id === topic.User.id || userSession?.admin);

  async function handleTopicApprovement(topicId: string) {
    setIsLoading(true);

    // const emailBody: EmailRequestBodyType = {
    //   sender: OWNER_EMAIL!,
    //   receiver: topic.User.email!,
    //   subject: "Topic Updates",
    //   message: "Your topic has been approved.",
    // };

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
    // const emailBody: EmailRequestBodyType = {
    //   sender: OWNER_EMAIL!,
    //   receiver: topic.User.email!,
    //   subject: "Topic Updates",
    //   message: "Your topic has been un approved.",
    // };

    await editTopic(topicId, { approved: false });
    toggleApproved();

    toast({
      title: "Topic has been un approved.",
    });

    router.refresh();
    setIsLoading(false);
  }

  const handleTopicDelete = async () => {
    setIsLoading(true);
    // const emailBody: EmailRequestBodyType = {
    //   sender: OWNER_EMAIL!,
    //   receiver: topic.User.email!,
    //   subject: "Topic Updates",
    //   message: "Your topic has been deleted.",
    // };
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
              variant="outline"
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
