import { TopicType } from "../topics/types";

export type UserType = {
  id: string;
  email: string | null;
  name: string | null;
  display_name: string | null;
  image: string | null;
  admin: boolean;
  owner: boolean;
  created_at: Date;
  updated_at: Date;
  topics?: TopicType[];
  totalTopics: number;
  totalComments: number;
  totalLikes: number;
  totalTasks: number;
  totalFollowers: number;
  totalFollowing: number;
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
  created_at: Date;
  updated_at: Date;
  userId: string;
};
