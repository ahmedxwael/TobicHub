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

// export type Comment = {
//   id: string;
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
//   user: UserType;
//   userId: string;
//   topic: Topic;
//   topicId: string;
//   approved: boolean;
//   parentComment: Comment | null;
//   parentCommentId: string | null;
//   replies: Comment[];
//   repliesCount: number;
//   likes: Like[];
// };

// export type Like = {
//   id: string;
//   userId: string;
//   topicId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   user: UserType;
//   topic: Topic;
// };

// export type NewTopic = {
//   title: string;
//   description: string;
//   resource?: string;
//   authorId: string;
//   isApproved?: boolean;
// };
