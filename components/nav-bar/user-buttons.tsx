"use client";

import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomAlertDialog from "../custom-alert-dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { buttonVariants } from "../ui/button";

export type UserType = {
	name: string;
	email: string;
	image: string;
	id: string;
	admin?: boolean;
};

const UserButtons = ({ session }: any) => {
	const user = session?.user;

	return (
		<>
			{session ? (
				<div className="flex items-center gap-4 justify-between md:justify-normal">
					<CustomAlertDialog
						action={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL! })}
						variant="outline"
						title="Sign out"
						description="Are you sure that you want to sign out?"
					/>
					<Link
						href={`/profile/${user?.id}`}
						className="inline-block"
						title={user?.name}
					>
						<Avatar>
							<Image
								priority
								src={
									user?.image ||
									"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
								}
								alt="user"
								width={40}
								height={40}
								className="rounded-full w-auto h-auto border-2 bg-muted"
							/>

							<AvatarFallback>{user?.name[0]}</AvatarFallback>
						</Avatar>
					</Link>
				</div>
			) : (
				<Link
					href="/register"
					className={cn(
						buttonVariants({ variant: "default", size: "lg" }),
						"w-full"
					)}
				>
					Sign in
				</Link>
			)}
		</>
	);
};

export default UserButtons;
