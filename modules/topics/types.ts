import { UserType } from "../user/types";

export type Topic = {
  id: string;
  title: string;
  description: string;
  resource: string | undefined;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: UserType;
  authorId: string;
  comments: Comment[];
  totalComments: number;
  totalLikes: number;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  topicId: string;
  Topic: Topic;
  userId: string;
  User: UserType;
  user: UserType;
  topic: Topic;
  isAuthorApproved: boolean;
  isAdminApproved: boolean;
  parentComment: Comment;
  parentCommentId: string;
  replies: Comment[];
};

export type NewTopic = {
  title: string;
  description: string;
  resource?: string;
  authorId: string;
  isApproved?: boolean;
};
