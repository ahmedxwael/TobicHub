export type UserSessionType = {
  name: string;
  email: string;
  image: string;
  id: string;
  admin: boolean;
  owner?: boolean;
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
