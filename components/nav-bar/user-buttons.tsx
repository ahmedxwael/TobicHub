"use client";

import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomAlertDialog from "../custom-alert-dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { buttonVariants } from "../ui/button";

export type UserType = {
  name: string;
  email: string;
  image: string;
  id: string;
  admin?: boolean;
};

type UserButtonsProps = {
  onClose?: () => void;
  user: UserType | undefined;
};

const UserButtons = ({ user, onClose }: UserButtonsProps) => {
  return (
    <>
      {user ? (
        <div className="flex w-full items-center justify-between gap-4 md:justify-normal">
          <CustomAlertDialog
            action={() => {
              onClose?.();
              signOut({ callbackUrl: process.env.NEXTAUTH_URL! });
            }}
            variant="outline"
            title="Sign out"
            description="Are you sure that you want to sign out?"
            className="w-full"
          />
          <Link
            href={`/profile/${user?.id}`}
            onClick={onClose}
            className="inline-block"
            title={user?.name}
          >
            <Avatar>
              <Image
                priority
                src={
                  user?.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
                }
                alt="user"
                width={40}
                height={40}
                className="h-auto w-auto rounded-full border-2 bg-muted"
              />

              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      ) : (
        <Link
          onClick={onClose}
          href="/register"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "w-full"
          )}
        >
          Sign in
        </Link>
      )}
    </>
  );
};

export default UserButtons;
