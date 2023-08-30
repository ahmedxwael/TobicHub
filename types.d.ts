import { ReactNode } from "react";

type ParamsType = {
	params: { id: string };
};

type CreatorType = {
	_id: string;
	name: string;
	image: string;
	email: string;
};

type TopicType = {
	_id: string;
	creator: CreatorType;
	title: string;
	description: string;
};

type FeatureType = {
	id: number;
	icon: ReactNode;
	title: string;
	description: string;
};
