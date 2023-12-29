"use client";

import CustomAlertDialog from "@/components/custom-alert-dialog";
import { ModeToggle } from "@/components/toggle-mode-button";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UserSessionType } from "@/modules/user/types";
import { URLS } from "@/shared/urls";
import { AlignJustify } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import NavLinks from "./nav-links";
import { userLinks } from "./user-actions";

type SideBarProps = {
  userSession: UserSessionType | undefined;
};

export default function SideBar({ userSession }: SideBarProps) {
  const { toast } = useToast();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function handleSheetToggle() {
    setIsSheetOpen(!isSheetOpen);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetToggle}>
      <ModeToggle className="ml-auto md:hidden" />
      <SheetTrigger asChild>
        <Button
          onClick={() => setIsSheetOpen(true)}
          variant="outline"
          className="block p-2 md:hidden"
        >
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-primary">TopicHub</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4 text-muted-foreground">
          <NavLinks
            closeMenu={handleSheetToggle}
            isAdmin={userSession?.admin}
          />
        </div>
        <ul className="mt-auto flex flex-col gap-1 border-t-2 pt-6">
          {userSession ? (
            <>
              {userLinks.map((link, index) => {
                const href =
                  typeof link.href === "function"
                    ? link.href(userSession.id)
                    : link.href;

                return (
                  <Link
                    key={index}
                    href={href}
                    className="rounded-md p-2 text-sm leading-normal text-muted-foreground hover:text-primary"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <CustomAlertDialog
                action={async () => {
                  await signOut({ callbackUrl: process.env.NEXTAUTH_URL! });

                  toast({ title: "Signed out successfully." });
                  setIsSheetOpen(false);
                }}
                variant="ghost"
                title="Sign out"
                description="Are you sure that you want to sign out?"
                className="justify-start p-2 text-destructive hover:bg-destructive hover:text-white"
              />
            </>
          ) : (
            <Link
              onClick={() => setIsSheetOpen(false)}
              href={URLS.register}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full"
              )}
            >
              Sign in
            </Link>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
