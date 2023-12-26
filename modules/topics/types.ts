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
  comments: Comment[];
  totalComments: number;
  totalLikes: number;
};

export type Comment = {
  id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  topicId: string;
  Topic: TopicType;
  userId: string;
  User: UserType;
};

export type NewTopic = {
  title: string;
  description: string;
  link?: string;
  userId: string;
  approved?: boolean;
};
