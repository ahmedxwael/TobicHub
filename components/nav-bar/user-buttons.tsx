"use client";

import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

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
						className="btn py-2.5 btn-alt rounded-full flex-1"
						onClick={() => {
							closeMenu?.();
							signOut({ callbackUrl: process.env.NEXTAUTH_URL! });
						}}
					>
						Sign out
					</button>
					<Link
						href={`/profile/${session?.user?.id}`}
						onClick={() => closeMenu?.()}
						className="inline-block"
					>
						<Image
							src={session?.user?.image || ""}
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
					onClick={() => closeMenu?.()}
					className={cn(buttonVariants({ variant: "default", size: "lg" }))}
				>
					Sign in
				</Link>
			)}
		</>
	);
};

export default UserButtons;
