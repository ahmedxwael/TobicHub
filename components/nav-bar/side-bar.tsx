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
				className="md:hidden block"
			>
				<HiMenuAlt3 />
			</Button>
			<SheetContent className="flex flex-col">
				<SheetHeader>
					<SheetTitle>TopicHub</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col gap-4 text-muted-foreground mt-6">
					<NavLinks closeMenu={handleSheetToggle} />
				</div>
				<SheetFooter className="w-full mt-auto border-t-2 pt-6 flex flex-row gap-4 items-center">
					<ModeToggle />
					<UserButtons onClose={handleSheetToggle} session={session} />
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
