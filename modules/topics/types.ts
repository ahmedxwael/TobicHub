// export type Topic = {
//   id: string;
//   title: string;
//   description: string;
//   resources: string[];
//   approved: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   author: UserType;
//   authorId: string;
//   comments: Comment[];
//   commentsCount: number;
//   likes: Like[];
//   likesCount: number;
//   savedBy: UserType;
//   category: Category;
//   categoryId: string;
// };

import { Topic } from "@prisma/client";
import { PublicUser } from "../user/types";

// export type Category = {
//   id: string;
//   name: string;
//   slug: string;
//   description: string;
//   topics: Topic[];
//   topicsCount: number;
//   createdAt: Date;
//   updatedAt: Date;
// };

// export type NewComment = {
//   content: string;
//   topicId: string;
//   userId: string;
//   parentCommentId?: string;
//   isApproved?: boolean;
// };

export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: PublicUser;
  userId: string;
  topic: Topic;
  topicId: string;
  approved: boolean;
  repliesCount: number;
};

export type Like = {
  id: string;
  user: PublicUser;
  userId: string;
  topic: Topic;
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
};

// export type NewTopic = {
//   title: string;
//   description: string;
//   resource?: string;
//   authorId: string;
//   isApproved?: boolean;
// };
