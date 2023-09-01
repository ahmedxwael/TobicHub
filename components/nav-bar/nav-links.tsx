"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
	closeMenu?: () => void;
};

const NavLinks = ({ closeMenu }: Props) => {
	const pathname = usePathname();

	const links = [
		{ href: "/", name: "Home" },
		{ href: "/topics", name: "Topics" },
		{ href: "/create-topic", name: "Create Topic" },
	];
	return (
		<>
			{links.map((link, idx) => {
				const activeLink = link.href === pathname;
				return (
					<Link
						key={idx}
						href={link.href}
						onClick={() => closeMenu && closeMenu()}
						className={`${
							activeLink ? "text-white" : ""
						} hover:text-white transition-colors inline-block`}
					>
						{link.name}
					</Link>
				);
			})}
		</>
	);
};

export default NavLinks;
