import { UserType } from "@/modules/user/types";
import prisma from "@/prisma";
import axios from "axios";

export const getUsers = async (
  inDashboard?: boolean
): Promise<UserType[] | undefined> => {
  try {
    const users = await prisma.user.findMany({
      include: inDashboard ? { topics: true } : null,
    });

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

    console.log(user);
    return user;
  } catch (error) {
    return undefined;
  }
};

export const updateUser = async (id: string, data: Partial<UserType>) => {
  await axios.patch(`/api/users/${id}`, data).catch(() => {
    throw new Error("Something went wrong.");
  });
};

export const deleteUser = async (id: string) => {
  await axios.delete(`/api/users/${id}`).catch(() => {
    throw new Error("Something went wrong.");
  });
};
