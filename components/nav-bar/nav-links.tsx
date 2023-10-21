"use client";

import { cn } from "@/lib/utils";
import { links } from "@/shared/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
	closeMenu?: () => void;
};

const NavLinks = ({ closeMenu }: Props) => {
	const pathname = usePathname();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname]);

	return (
		<>
			{links.map((link, idx) => {
				const activeLink = link.href === pathname;
				return (
					<Link
						key={idx}
						href={link.href}
						onClick={() => closeMenu?.()}
						className={cn(
							activeLink ? "text-black dark:text-white" : "",
							"hover:text-black dark:hover:text-white transition-colors inline-block font-medium"
						)}
					>
						{link.name}
					</Link>
				);
			})}
		</>
	);
};

export default NavLinks;
