import { authOptions } from "@/app/api/auth/options";
import NotFound from "@/components/not-found";
import ProfileSideNav from "@/modules/user/components/profile-sidenav";
import { getUser, getUsers } from "@/modules/user/services/profile-services";
import { UserSessionType } from "@/modules/user/types";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

type ProfileLayoutProps = {
  children: ReactNode;
  params: {
    id: string;
  };
};

export const generateStaticParams = async () => {
  const users = await getUsers();

  if (!users) {
    return [];
  }

  return users.map((user) => ({ id: user.id }));
};

export const revalidate = 0;

export default async function ProfileLayout({
  children,
  params,
}: ProfileLayoutProps) {
  const user = await getUser(params.id);
  const session = await getServerSession(authOptions);

  if (!user) {
    return <NotFound message="Couldn't get user's data." />;
  }

  return (
    <section className="container relative w-full space-y-6 py-20">
      <section className="flex w-full flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <ProfileSideNav
          id={params.id}
          userSession={session?.user as UserSessionType}
        />
        {children}
      </section>
    </section>
  );
}
