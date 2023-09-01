"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
	closeMenu?: () => void;
};

const UserButtons = ({ closeMenu }: Props) => {
	const { data: session }: any = useSession();
	return (
		<>
			{session ? (
				<div className="flex items-center gap-4">
					<button
						className="btn py-2.5 btn-alt rounded-full"
						onClick={() => {
							if (closeMenu) {
								closeMenu();
							}
							signOut({ callbackUrl: process.env.NEXTAUTH_URL! });
						}}
					>
						Sign out
					</button>
					<Link
						href={`/profile/${session.user?.id}`}
						onClick={() => closeMenu && closeMenu()}
						className="inline-block"
					>
						<Image
							src={session.user?.image || ""}
							alt="User image"
							width={40}
							height={40}
							className="rounded-full"
						/>
					</Link>
				</div>
			) : (
				<Link
					href="/register"
					onClick={() => closeMenu && closeMenu()}
					className="bg-white  text-center block py-2 px-6 rounded-full text-black font-semibold"
				>
					Sign in
				</Link>
			)}
		</>
	);
};

export default UserButtons;
