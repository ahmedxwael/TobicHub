import { creatorType } from "@/types";

export const getUsers = async (): Promise<creatorType[] | undefined> => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/users`);

    if (!response.ok) {
      return undefined;
    }

    return response.json();
  } catch (error) {
    throw new Error("Couldn't get the users.");
  }
};

export const getUser = async (id: string): Promise<creatorType | undefined> => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/users/${id}`);

    if (!response.ok) {
      return undefined;
    }

    return response.json();
  } catch (error) {
    throw new Error("Couldn't get the user.");
  }
};
