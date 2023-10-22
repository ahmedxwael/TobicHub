import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
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
import SideBar from "./side-bar";
import UserButtons from "./user-buttons";

const Navbar = async () => {
	const session = await getServerSession(authOptions);

	return (
		<header className="border-b border-b-input sticky top-0 z-10 bg-transparent backdrop-blur-lg">
			<nav className="flex items-center gap-4 justify-between py-4 container px-8 mx-auto">
				<Link
					href="/"
					className="font-bold text-xl"
					title="Talking about general and useful stuff"
				>
					TopicHub
				</Link>

				<div className="hidden md:flex items-center gap-6 text-muted-foreground text-sm">
					<NavLinks />
				</div>
				<div className="hidden md:flex items-center gap-4 shrink-0">
					<ModeToggle />
					<UserButtons session={session} />
				</div>

				<SideBar session={session} />
			</nav>
		</header>
	);
};

export default Navbar;
