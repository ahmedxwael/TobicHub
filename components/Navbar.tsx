"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const { data: session } = useSession();
	const pathname = usePathname();

	const links = [
		{ href: "/", name: "Home" },
		{ href: "/topics", name: "Topics" },
		{ href: "/create-topic", name: "Create Topic" },
	];

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
				<div className="flex items-center gap-4 text-white/50">
					{links.map((link, idx) => {
						const activeLink = link.href === pathname;
						return (
							<Link
								key={idx}
								href={link.href}
								className={`${
									activeLink ? "text-white" : ""
								} hover:text-white transition-colors`}
							>
								{link.name}
							</Link>
						);
					})}
				</div>
				{session ? (
					<Image
						src={session.user?.image || ""}
						alt="User image"
						width={30}
						height={30}
						className="rounded-full"
					/>
				) : (
					<Link
						href="/register"
						className="bg-white py-2 px-6 rounded-full text-black font-semibold"
					>
						Register
					</Link>
				)}
			</nav>
		</header>
	);
};

export default Navbar;
