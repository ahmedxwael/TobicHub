import NotFound from "@/components/not-found";
import UserCard from "@/components/user/user-card";
import { getUsers } from "@/utils/user-utils";
import React from "react";

export const revalidate = 0;

export default async function UsersPage() {
  const users = await getUsers();

  if (!users) {
    return <NotFound message="Could not get the list of users." />;
  }

  return (
    <>
      <h1 className="w-fit text-2xl font-bold capitalize tracking-wider">
        Users
      </h1>
      {users.length > 0 ? (
        <div className="mt-12 flex flex-col gap-y-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="px-6 py-10 text-center text-xl font-bold">
          There is no topics to show.
        </div>
      )}
    </>
  );
}
