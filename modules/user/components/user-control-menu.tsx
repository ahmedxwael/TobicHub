"use client";

import CustomAlertDialog from "@/components/custom-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { deleteUser, updateUser } from "@/utils/user-utils";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { UserType } from "../types";

type UserControlMenusProps = {
  user: UserType;
  className?: string;
};

export default function UserControlMenus({
  user,
  className,
}: UserControlMenusProps) {
  const router = useRouter();

  const { toast } = useToast();

  const isAdmin = user?.admin;

  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  async function handleDeleteUser() {
    setIsLoading(true);

    await deleteUser(user.id);

    toast({ description: "User deleted successfully" });
    router.refresh();
    setIsLoading(false);
  }

  async function updateUserRole() {
    setIsLoading(true);

    await updateUser(user.id, { admin: isAdmin ? false : true });

    router.refresh();
    setIsLoading(false);
  }

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
            <DropdownMenuSeparator />
            <Button
              variant="ghost"
              className="w-full cursor-pointer"
              disabled={isLoading}
              onClick={updateUserRole}
            >
              {isAdmin ? "Demote" : "Promote"}
            </Button>
            {!isAdmin && (
              <CustomAlertDialog
                title="Delete"
                variant="ghost"
                description="This action cannot be undone. Are you sure that you want to delete all user's data?"
                className="text-red-600 hover:bg-red-600 hover:text-white"
                action={handleDeleteUser}
                disabled={isLoading}
              />
            )}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
}
