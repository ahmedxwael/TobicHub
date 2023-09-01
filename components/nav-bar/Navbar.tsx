import Link from "next/link";
import NavLinks from "./nav-links";
import UserButtons from "./user-buttons";

const Navbar = () => {
	return (
		<header className="border-b border-b-white/10">
			<nav className="flex items-center flex-col sm:flex-row gap-4 justify-between py-6 container px-8 mx-auto">
				<Link
					href="/"
					className="font-bold text-xl"
					title="Talking about general and usefull stuff"
				>
					TopicHub
				</Link>
				<NavLinks />
				<UserButtons />
			</nav>
		</header>
	);
};

export default Navbar;
