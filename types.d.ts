import { ReactNode } from "react";

type ParamsType = {
	params: { id: string };
};

type PubCreatorType = {
	_id: string;
	name: string;
	image: string;
	admin?: boolean;
};

type TopicType = {
	_id: string;
	creator: PubCreatorType;
	title: string;
	description: string;
};

type FeatureType = {
	id: number;
	icon: ReactNode;
	title: string;
	description: string;
};
