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

				<div className="hidden md:flex items-center gap-4 text-muted-foreground text-sm">
					<NavLinks />
				</div>
				<div className="hidden md:flex items-center gap-4 shrink-0">
					<ModeToggle />
					<UserButtons session={session} />
				</div>

				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" className="md:hidden block">
							<HiMenuAlt3 />
						</Button>
					</SheetTrigger>
					<SheetContent className="flex flex-col">
						<SheetHeader>
							<SheetTitle>TopicHub</SheetTitle>
						</SheetHeader>
						<div className="flex flex-col gap-4 text-muted-foreground mt-6">
							<NavLinks />
						</div>
						<SheetFooter className="w-full mt-auto border-t-2 pt-6">
							<UserButtons session={session} />
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
};

export default Navbar;
