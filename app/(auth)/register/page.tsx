import { authOptions } from "@/app/api/auth/options";
import { RegisterForm } from "@/modules/auth/components/register-form";
import { UserSessionType } from "@/modules/user/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register",
  description: "TopicHub register page.",
};

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    const user = session.user as UserSessionType;
    const userId = user.id as string;

    redirect(`/profile/${userId}`);
  }

  const providers = await getProviders();

  return (
    <section className="my-auto flex items-center justify-center">
      <RegisterForm providers={providers} />
    </section>
  );
}
