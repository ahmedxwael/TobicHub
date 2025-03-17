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
import { urls } from "@/shared/urls";
import { User } from "@prisma/client";
import { AlignJustify } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import NavLinks from "./nav-links";
import { userLinks } from "./user-actions";

type SideBarProps = {
  userSession?: User;
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
          <NavLinks closeMenu={handleSheetToggle} userSession={userSession} />
        </div>
        <ul className="mt-auto flex flex-col gap-2 border-t-2 pt-4">
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
                    className="p-2 text-sm leading-normal text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
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
                className="justify-center bg-destructive p-2 text-white hover:bg-destructive/80"
              />
            </>
          ) : (
            <Link
              onClick={() => setIsSheetOpen(false)}
              href={urls.register}
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
