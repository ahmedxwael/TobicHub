"use client";

import { TopicType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import CustomAlertDialog from "./custom-alert-dialog";
import { UserType } from "./nav-bar/user-buttons";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  topic: TopicType;
  session: any;
};

const ControlMenu = ({ topic, session }: Props) => {
  const user = session?.user as UserType;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();

  const hasControl = user && (user?.id === topic.creator._id || user?.admin);

  const deleteTopic = async () => {
    await fetch(`/api/topics/${topic._id}`, {
      method: "DELETE",
    });

    setIsDropdownOpen(false);
    router.refresh();
  };

  return (
    <>
      {hasControl && (
        <DropdownMenu open={isDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              onClick={() => setIsDropdownOpen(true)}
              className="w-fit"
              variant="outline"
            >
              <BsThreeDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-max">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Button
              variant="ghost"
              className="w-full cursor-pointer"
              onClick={() => {
                router.push(`/edit-topic/${topic._id}`);
                setIsDropdownOpen(false);
              }}
            >
              Edit
            </Button>

            <CustomAlertDialog
              action={deleteTopic}
              title="Delete"
              variant="ghost"
              description="This action cannot be undone. Are you sure that you want to delete this topic?"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default ControlMenu;
