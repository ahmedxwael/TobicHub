import Link from "next/link";
import React from "react";

const Navbar = () => {
	return (
		<nav className="flex items-center justify-between py-6 container px-8 mx-auto border-b border-b-white/10">
			<Link href="/" className="font-bold text-xl">
				REST-API
			</Link>
			<div className="flex items-center gap-4 text-gray-400">
				<Link href="/" className="hover:text-white transition-colors">
					Home
				</Link>
				<Link href="/todos" className="hover:text-white transition-colors">
					Todos
				</Link>
				<Link
					href="/create-todo"
					className="hover:text-white transition-colors"
				>
					Create todo
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
