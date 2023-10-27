import { creatorType } from "@/types";

export const getUsers = async (): Promise<creatorType[]> => {
  const res = await fetch(`${process.env.BASE_URL}/api/users`);

  if (!res.ok) {
    throw new Error("Could not fetch users.");
  }

  return res.json();
};

export const getUser = async (id: string): Promise<creatorType> => {
  const res = await fetch(`${process.env.BASE_URL}/api/users/${id}`);

  if (!res.ok) {
    throw new Error("Could not fetch user.");
  }

  return res.json();
};
