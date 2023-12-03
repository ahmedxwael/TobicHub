import { Contact } from "@/modules/dashboard/types";
import prisma from "@/prisma";
import axios from "axios";

export const getContacts = async (): Promise<Contact[] | undefined> => {
  try {
    const contacts = await prisma.contact.findMany();

    return contacts;
  } catch (error) {
    return undefined;
  }
};

export const sendContactMessage = async (data: Partial<Contact>) => {
  await axios.post("/api/contacts", data).catch(() => {
    throw new Error("Couldn't send the contact message.");
  });
};

export const deleteContactMessage = async (id: string) => {
  await axios.delete(`/api/contacts/${id}`).catch(() => {
    throw new Error("Couldn't delete the contact message.");
  });
};
