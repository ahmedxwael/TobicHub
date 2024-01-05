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
  comments?: Comment[];
  totalComments: number;
  totalApprovedComments: number;
  totalLikes: number;
  totalRepost: number;
  likes?: Like[];
};

export type NewComment = {
  content: string;
  topicId: string;
  userId: string;
  parentCommentId?: string;
  isApproved?: boolean;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  topicId: string;
  userId: string;
  user: UserType;
  topic: Topic;
  parentComment?: Comment;
  parentCommentId?: string;
  replies?: Comment[];
  totalReplies: number;
  isApproved: boolean;
};

export type Like = {
  id: string;
  userId: string;
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserType;
  topic: Topic;
};

export type NewTopic = {
  title: string;
  description: string;
  resource?: string;
  authorId: string;
  isApproved?: boolean;
};
