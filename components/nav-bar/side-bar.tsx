"use client";

import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
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

export default function SideBar({ session }: any) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function handleSheetToggle() {
    setIsSheetOpen(!isSheetOpen);
  }

  return (
    <Sheet open={isSheetOpen}>
      <Button
        onClick={() => setIsSheetOpen(true)}
        variant="outline"
        className="block md:hidden"
      >
        <HiMenuAlt3 />
      </Button>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>TopicHub</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4 text-muted-foreground">
          <NavLinks closeMenu={handleSheetToggle} />
        </div>
        <SheetFooter className="mt-auto flex w-full flex-row items-center gap-4 border-t-2 pt-6">
          <ModeToggle />
          <UserButtons onClose={handleSheetToggle} session={session} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
