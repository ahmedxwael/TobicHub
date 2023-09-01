"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
	const pathname = usePathname();

	const links = [
		{ href: "/", name: "Home" },
		{ href: "/topics", name: "Topics" },
		{ href: "/create-topic", name: "Create Topic" },
	];
	return (
		<div className="flex items-center gap-4 text-white/50">
			{links.map((link, idx) => {
				const activeLink = link.href === pathname;
				return (
					<Link
						key={idx}
						href={link.href}
						className={`${
							activeLink ? "text-white" : ""
						} hover:text-white transition-colors inline-block`}
					>
						{link.name}
					</Link>
				);
			})}
		</div>
	);
};

export default NavLinks;
