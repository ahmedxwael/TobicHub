import prisma from "@/prisma";
import { User } from "@prisma/client";
import axios from "axios";

export const getUsers = async (
  inDashboard?: boolean
): Promise<User[] | undefined> => {
  try {
    const users = await prisma.user.findMany({
      include: inDashboard ? { topics: true } : null,
    });

    return users;
  } catch (error) {
    return undefined;
  }
};

export const getUser = async (id: string): Promise<User | null | undefined> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user as User;
  } catch (error) {
    return undefined;
  }
};

export const updateUser = async (id: string, data: Partial<User>) => {
  await axios.patch(`/api/users/${id}`, data).catch(() => {
    throw new Error("Something went wrong.");
  });
};

export const deleteUser = async (id: string) => {
  await axios.delete(`/api/users/${id}`).catch(() => {
    throw new Error("Something went wrong.");
  });
};
