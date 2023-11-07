"use client";

import { UserType } from "@/types";
import { updateUser } from "@/utils/user-utils";
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomAlertDialog from "../custom-alert-dialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type UserControlMenusProps = {
  user: UserType;
  className?: string;
};

export default function UserControlMenus({
  user,
  className,
}: UserControlMenusProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = user?.admin;

  console.log(isAdmin);

  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function deleteUser() {}

  async function updateUserRole() {
    setIsLoading(true);
    await updateUser(user.id, { admin: isAdmin ? false : true });
    router.refresh();
    setIsLoading(false);
  }

  console.log(user);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={className}>
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
            {/* <Button
              variant="ghost"
              className="w-full cursor-pointer"
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                setIsDropdownOpen(false);

                setIsLoading(false);
              }}
            >
              Edit
            </Button> */}
            <Button
              variant="ghost"
              className="w-full cursor-pointer"
              disabled={isLoading}
              onClick={updateUserRole}
            >
              {isAdmin ? "Demote" : "Promote"}
            </Button>
            <CustomAlertDialog
              title="Delete"
              variant="ghost"
              description="This action cannot be undone. Are you sure that you want to delete this topic?"
              className="text-red-600 hover:bg-red-600 hover:text-white"
              disabled={isLoading}
            />
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
}
