import { UserType } from "../user/types";

export type TopicType = {
  id: string;
  title: string;
  description: string;
  link: string | undefined;
  approved: boolean;
  created_at: Date;
  updated_at: Date;
  User: UserType;
  userId: string;
};

export type NewTopicType = {
  title: string;
  description: string;
  link?: string;
  userId: string;
  approved?: boolean;
};