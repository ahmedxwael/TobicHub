"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import NavLinks from "./nav-links";
import SideMenu from "./side-menu";
import UserButtons from "./user-buttons";

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState<boolean>(false);

	const hadleMenuBtnClick = () => {
		setToggleMenu((currState) => !currState);
	};

	return (
		<header className="border-b border-b-white/10 sticky top-0 z-10 bg-black">
			<nav className="flex items-center gap-4 justify-between py-6 container px-8 mx-auto">
				<Link
					href="/"
					className="font-bold text-xl"
					title="Talking about general and usefull stuff"
				>
					TopicHub
				</Link>

				<div className="w-[calc(50%+94px)] hidden md:flex items-center justify-between">
					<div className="flex items-center gap-4 text-white/50">
						<NavLinks />
					</div>
					<UserButtons />
				</div>

				{toggleMenu ? <SideMenu menuHandler={hadleMenuBtnClick} /> : null}

				<button onClick={hadleMenuBtnClick} className="text-xl md:hidden">
					<HiMenuAlt3 />
				</button>
			</nav>
		</header>
	);
};

export default Navbar;
