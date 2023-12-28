import { authOptions } from "@/app/api/auth/options";
import NotFound from "@/components/not-found";
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
      <h1 className="w-fit text-2xl font-bold capitalize tracking-wider">
        Users
      </h1>
      {users.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {users.map((user) => (
            <UserCard key={user.id} user={user} userSession={userSession} />
          ))}
        </div>
      ) : (
        <div className="px-6 py-10 text-center text-xl font-bold">
          No users to show.
        </div>
      )}
    </section>
  );
}
