import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import NavLinks from "./nav-links";
import UserButtons from "./user-buttons";

const Navbar = () => {
	return (
		<header className="border-b border-b-white/10">
			<nav className="flex items-center gap-4 justify-between py-6 container px-8 mx-auto">
				<Link
					href="/"
					className="font-bold text-xl"
					title="Talking about general and usefull stuff"
				>
					TopicHub
				</Link>
				<NavLinks />
				<UserButtons />
				<button className="text-xl sm:hidden">
					<HiMenuAlt3 />
				</button>
			</nav>
		</header>
	);
};

export default Navbar;
