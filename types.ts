import { ReactNode } from "react";

export type ParamsType = {
  params: { id: string };
};

export type creatorType = {
  _id: string;
  name: string;
  image: string;
  admin?: boolean;
};

export type NewTopicType = {
  creator: string;
  title: string;
  description: string;
  link?: string;
  approved?: boolean;
};

export type TopicType = {
  _id: string;
  creator: creatorType;
  title: string;
  description: string;
  updatedAt?: string;
  createdAt?: string;
  link?: string;
  approved?: boolean;
};

export type FeatureType = {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
};
