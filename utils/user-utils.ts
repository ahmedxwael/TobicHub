import prisma from "@/prisma";
import { UserType } from "@/types";

export const getUsers = async (): Promise<UserType[] | undefined> => {
  try {
    const users = await prisma.user.findMany({});

    return users;
  } catch (error) {
    return undefined;
  }
};

export const getUser = async (
  id: string
): Promise<UserType | null | undefined> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return undefined;
  }
};
