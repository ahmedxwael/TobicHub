import { ReactNode } from "react";

export type ParamsType = {
  params: { id: string };
};

export type UserType = {
  id: string;
  email: string;
  name: string;
  image: string | null;
  admin: boolean;
  created_at: Date;
  updated_at: Date;
};

export type NewTopicType = {
  title: string;
  description: string;
  link?: string;
  userId: string;
  approved?: boolean;
};

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

export type FeatureType = {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
};
