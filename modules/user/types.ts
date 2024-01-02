import { Like, Topic } from "../topics/types";

export type UserType = {
  id: string;
  email: string | null;
  name: string | null;
  displayName: string | null;
  image: string | null;
  isAdmin: boolean;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
  topics?: Topic[];
  comments?: Comment[];
  tasks: Task[];
  following: UserType[];
  followers: UserType[];
  totalTopics: number;
  totalComments: number;
  totalLikes: number;
  totalTasks: number;
  totalFollowers: number;
  totalFollowing: number;
  followingId: string | null;
  likes?: Like[];
};

export type UserSessionType = {
  name: string;
  email: string;
  image: string;
  id: string;
  admin: boolean;
  owner?: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
