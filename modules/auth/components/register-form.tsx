"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { GithubIcon, GoogleIcon } from "@/shared/icons";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

type RegisterFormProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null;
};

export function RegisterForm({ providers }: RegisterFormProps) {
  const [isAgree, setIsAgree] = useState(true);

  return (
    <Card className="mx-auto w-[400px] max-w-full pb-6">
      <CardHeader className="space-y-1">
        <CardTitle className="mb-1 text-2xl md:text-3xl">Join us now</CardTitle>
        <CardDescription>
          You can join our community using your google or github accounts.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-4">
          <Button
            disabled={!providers?.google || !isAgree}
            onClick={() => signIn(providers?.google?.id)}
            variant="ghost"
            className="flex h-auto items-center gap-2 bg-gradient-to-tr from-primary/10 py-3 hover:bg-primary/10 dark:from-muted/60 dark:hover:bg-muted dark:hover:from-muted dark:hover:to-transparent"
          >
            Google <GoogleIcon />
          </Button>
          <Button
            disabled={!providers?.github || !isAgree}
            onClick={() => signIn(providers?.github?.id)}
            variant="ghost"
            className="flex h-auto items-center gap-2 bg-gradient-to-tr from-primary/10 py-3 hover:bg-primary/10 dark:from-muted/60 dark:hover:bg-muted dark:hover:from-muted dark:hover:to-transparent"
          >
            Github <GithubIcon />
          </Button>
        </div>
        <div className="flex items-start gap-2 text-xs">
          <Checkbox
            id="privacy"
            checked={isAgree}
            onCheckedChange={() => setIsAgree(!isAgree)}
          />
          <label htmlFor="privacy" className="text-muted-foreground">
            By signing in to our website, you confirm that you have read and
            agree to our{" "}
            <Link
              href="/privacy-policy"
              className="font-medium underline transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
