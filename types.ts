import { ReactNode } from "react";

export type ParamsType = {
	params: { id: string };
};

export type PubCreatorType = {
	_id: string;
	name: string;
	image: string;
	admin?: boolean;
};

export type TopicType = {
	_id: string;
	creator: PubCreatorType;
	title: string;
	description: string;
	updatedAt?: string;
	createdAt?: string;
	link?: string;
};

export type FeatureType = {
	id: number;
	icon: ReactNode;
	title: string;
	description: string;
};
