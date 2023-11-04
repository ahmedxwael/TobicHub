import prisma from "@/prisma";
import { UserType } from "@/types";
import axios from "axios";

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

export const updateUser = async (id: string, data: Partial<UserType>) => {
  try {
    await axios.patch(`/api/users/${id}`, data).catch(() => {
      throw new Error("Something went wrong.");
    });
  } catch (error) {
    throw new Error("Couldn't update user.");
  }
};
