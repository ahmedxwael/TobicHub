"use client";

import { UserSessionType } from "@/shared/types";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "../toggle-mode-button";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import NavLinks from "./nav-links";
import UserButtons from "./user-buttons";

type SideBarProps = {
  userSession: UserSessionType;
};

export default function SideBar({ userSession }: SideBarProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function handleSheetToggle() {
    setIsSheetOpen(!isSheetOpen);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          onClick={() => setIsSheetOpen(true)}
          variant="outline"
          className="default-shadow block p-2 md:hidden"
        >
          <AlignJustify />
        </Button>
      </SheetTrigger>
      {isSheetOpen && (
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-primary">TopicHub</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-4 text-muted-foreground">
            <NavLinks
              closeMenu={handleSheetToggle}
              isAdmin={userSession.admin}
            />
          </div>
          <SheetFooter className="mt-auto flex w-full flex-row items-center gap-4 border-t-2 pt-6">
            <ModeToggle />
            <UserButtons
              onClose={handleSheetToggle}
              userSession={userSession}
            />
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
}
