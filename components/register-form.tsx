"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function RegisterForm() {
	return (
		<Card className="w-[400px] max-w-full mx-auto">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Join us now</CardTitle>
				<CardDescription>
					You can join our community using your google or github accounts.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="grid grid-cols-1 gap-6">
					<Button
						onClick={() => signIn("google")}
						variant="outline"
						className="flex items-center gap-2"
					>
						Google <FcGoogle />
					</Button>
					<Button
						onClick={() => signIn("github")}
						variant="outline"
						className="flex items-center gap-2"
					>
						Github <FaGithub />
					</Button>
				</div>
				{/* <div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div> 
				<div className="grid gap-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" placeholder="password" />
				</div> */}
			</CardContent>
			{/* <CardFooter>
				<Button className="w-full">Create account</Button>
			</CardFooter> */}
		</Card>
	);
}
