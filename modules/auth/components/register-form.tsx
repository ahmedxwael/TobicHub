"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon, GoogleIcon } from "@/shared/icons";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";

type RegisterFormProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null;
};

export function RegisterForm({ providers }: RegisterFormProps) {
  return (
    <Card className="default-shadow mx-auto w-[400px] max-w-full pb-6">
      <CardHeader className="space-y-1">
        <CardTitle className="mb-1 text-2xl md:text-3xl">Join us now</CardTitle>
        <CardDescription className="">
          You can join our community using your google or github accounts.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-4">
          <Button
            disabled={!providers?.google}
            onClick={() => signIn(providers?.google?.id)}
            variant="outline"
            className="default-shadow flex h-auto items-center gap-2 py-3"
          >
            Google <GoogleIcon />
          </Button>
          <Button
            disabled={!providers?.github}
            onClick={() => signIn(providers?.github?.id)}
            variant="outline"
            className="default-shadow flex h-auto items-center gap-2 py-3"
          >
            Github <GithubIcon />
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
    </Card>
  );
}