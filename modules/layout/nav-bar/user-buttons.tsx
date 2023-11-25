"use client";

import CustomAlertDialog from "@/components/custom-alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UserSessionType } from "@/modules/user/types";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type UserButtonsProps = {
  onClose?: () => void;
  userSession: UserSessionType;
};

const UserButtons = ({ userSession, onClose }: UserButtonsProps) => {
  const { toast } = useToast();

  return (
    <>
      {userSession ? (
        <div className="flex w-full items-center justify-between gap-4 md:justify-normal">
          <CustomAlertDialog
            action={async () => {
              onClose?.();
              await signOut({ callbackUrl: process.env.NEXTAUTH_URL! });
              toast({ title: "Signed out successfully." });
            }}
            variant="outline"
            title="Sign out"
            description="Are you sure that you want to sign out?"
            className="w-full bg-transparent"
          />
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={`/profile/${userSession?.id}`}
                  onClick={onClose}
                  className="inline-block"
                >
                  <Avatar>
                    <Image
                      priority
                      src={userSession?.image || "/images/avatar.jpg"}
                      alt="user"
                      width={500}
                      height={500}
                      className="h-10 w-10 rounded-full border-2 bg-muted object-cover"
                    />
                    <AvatarFallback>{userSession?.name[0]}</AvatarFallback>
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent>{userSession?.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <Link
          onClick={onClose}
          href="/register"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "w-full text-black"
          )}
        >
          Sign in
        </Link>
      )}
    </>
  );
};

export default UserButtons;
