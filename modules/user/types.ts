import { User } from "@prisma/client";

export type UserSessionType = User;

export type PublicUser = {
  id: string;
  name: string;
  avatar: string;
};

// export type Task = {
//   id: string;
//   title: string;
//   description: string;
//   updatedAt: Date;
//   label: string;
//   completed: boolean;
//   important: boolean;
//   createdAt: Date;
//   userId: string;
//   user: UserType;
// };
