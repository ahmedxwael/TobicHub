"use client";

import CustomAlertDialog from "@/components/custom-alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UserSessionType } from "@/modules/user/types";
import { ArrowDownIcon } from "@/shared/icons";
import { URLS } from "@/shared/urls";
import { Play } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type UserButtonsProps = {
  onClose?: () => void;
  userSession: UserSessionType | undefined;
};

export const userLinks = [
  {
    label: "Profile",
    href: URLS.profile.view,
  },
  {
    label: "Tasks",
    href: URLS.profile.tasks,
  },
  {
    label: "Create Topic",
    href: URLS.createTopic,
  },
];

const UserActions = ({ userSession, onClose }: UserButtonsProps) => {
  const { toast } = useToast();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {userSession ? (
        <div className="flex w-full items-center justify-between gap-4 md:justify-normal">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger
              onClick={() => setIsDropdownOpen(true)}
              className="flex shrink-0 items-center gap-2 rounded-full bg-muted"
            >
              <Image
                priority
                src={userSession?.image || "/images/avatar.png"}
                alt="user"
                width={500}
                height={500}
                className="h-10 w-10 rounded-full border-2 bg-muted object-cover"
              />
              <ArrowDownIcon
                className={cn(
                  "mr-2 text-muted-foreground transition-transform",
                  isDropdownOpen && "rotate-180"
                )}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px] p-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="mb-2" />
              <ul className="flex flex-col gap-1">
                {userLinks.map((link, index) => {
                  const href =
                    typeof link.href === "function"
                      ? link.href(userSession.id)
                      : link.href;

                  return (
                    <Link
                      key={index}
                      href={href}
                      className="rounded-md p-2 text-sm leading-normal hover:bg-primary"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <CustomAlertDialog
                  action={async () => {
                    await signOut({ callbackUrl: process.env.NEXTAUTH_URL! });

                    toast({ title: "Signed out successfully." });
                    setIsDropdownOpen(false);
                  }}
                  variant="ghost"
                  title="Sign out"
                  description="Are you sure that you want to sign out?"
                  className="justify-start p-2 text-destructive hover:bg-destructive hover:text-white"
                />
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
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

export default UserActions;
