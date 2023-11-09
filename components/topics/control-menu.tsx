"use client";

import { ownerEmail } from "@/shared/flags";
import { EmailRequestBodyType, UserSessionType } from "@/shared/types";
import { TopicType } from "@/types";
import { sendEmail } from "@/utils/email";
import { deleteTopic, editTopic } from "@/utils/topic-utils";
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import CustomAlertDialog from "../custom-alert-dialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useToast } from "../ui/use-toast";

type ControlMenuProps = {
  topic: TopicType;
  className?: string;
  userSession: UserSessionType;
};

const ControlMenu = ({ topic, userSession, className }: ControlMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hasControl =
    userSession && (userSession?.id === topic.User.id || userSession?.admin);

  async function handleTopicApprovement(topicId: string) {
    setIsLoading(true);

    const emailBody: EmailRequestBodyType = {
      sender: ownerEmail!,
      receiver: topic.User.email!,
      subject: "Your topic has been approved.",
    };

    await editTopic(topicId, { approved: true });

    toast({
      title: "Topic has been approved successfully.",
      variant: "success",
    });

    sendEmail(emailBody);
    router.refresh();
    setIsLoading(false);
  }

  async function handleTopicUnApprovement(topicId: string) {
    setIsLoading(true);
    const emailBody: EmailRequestBodyType = {
      sender: ownerEmail!,
      receiver: topic.User.email!,
      subject: "Your topic has been un approved.",
    };

    await editTopic(topicId, { approved: false });

    toast({
      title: "Topic has been un approved.",
    });

    sendEmail(emailBody);
    router.refresh();
    setIsLoading(false);
  }

  const handleTopicDelete = async () => {
    setIsLoading(true);
    const emailBody: EmailRequestBodyType = {
      sender: ownerEmail!,
      receiver: topic.User.email!,
      subject: "Your topic has been deleted.",
    };
    await deleteTopic(topic.id);

    toast({
      title: "Topic has been deleted.",
    });

    sendEmail(emailBody);
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
              className="h-fit w-fit px-2 hover:text-primary"
              variant="outline"
            >
              <MoreHorizontal size={15} />
            </Button>
          </DropdownMenuTrigger>
          {isDropdownOpen && (
            <DropdownMenuContent align="end" className="w-[170px]">
              <DropdownMenuSeparator />
              {userSession?.admin &&
                pathname.endsWith("/dashboard") &&
                (!topic.approved ? (
                  <Button
                    disabled={isLoading}
                    variant="ghost"
                    className="w-full cursor-pointer hover:bg-primary hover:text-white"
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
                    Un Approve
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
};

export default ControlMenu;
