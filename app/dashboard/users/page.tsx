import { authOptions } from "@/app/api/auth/options";
import NoData from "@/components/no-data";
import NotFound from "@/components/not-found";
import PageHeading from "@/components/page-heading";
import UserCard from "@/modules/dashboard/components/user-card";
import { getUsers } from "@/modules/user/services/profile-services";
import { UserSessionType } from "@/modules/user/types";
import { getServerSession } from "next-auth";
import React from "react";

export const revalidate = 0;

export default async function UsersPage() {
  const users = await getUsers(true);
  const session = await getServerSession(authOptions);
  const userSession = session?.user as UserSessionType;

  if (!users) {
    return <NotFound message="Could not get the list of users." />;
  }

  return (
    <section className="w-full flex-col gap-10">
      <PageHeading>Users</PageHeading>
      {users.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {users.map((user) => (
            <UserCard key={user.id} user={user} userSession={userSession} />
          ))}
        </div>
      ) : (
        <NoData message="No users to show." />
      )}
    </section>
  );
}
