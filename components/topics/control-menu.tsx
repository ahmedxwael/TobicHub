"use client";

import { TopicType } from "@/types";
import { deleteTopic, editTopic } from "@/utils/topic-utils";
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import CustomAlertDialog from "../custom-alert-dialog";
import { UserType } from "../nav-bar/user-buttons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
  topic: TopicType;
  user: UserType | undefined;
};

const ControlMenu = ({ topic, user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hasControl = user && (user?.id === topic.User.id || user?.admin);

  async function handleTopicApprovement(topicId: string) {
    setIsLoading(true);
    await editTopic(topicId, { approved: true });
    router.refresh();
    setIsLoading(false);
  }

  async function handleTopicUnApprovement(topicId: string) {
    setIsLoading(true);
    await editTopic(topicId, { approved: false });
    router.refresh();
    setIsLoading(false);
  }

  const handleTopicDelete = async () => {
    setIsLoading(true);
    await deleteTopic(topic.id);

    setIsLoading(false);
    setIsDropdownOpen(false);
    router.refresh();
  };

  return (
    <>
      {hasControl && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              onClick={() => setIsDropdownOpen(true)}
              className="h-fit w-fit px-2"
              variant="outline"
            >
              <MoreHorizontal size={15} />
            </Button>
          </DropdownMenuTrigger>
          {isDropdownOpen && (
            <DropdownMenuContent align="end" className="w-[170px]">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user?.admin &&
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
                    Un approve
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
