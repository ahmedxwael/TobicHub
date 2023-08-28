import { ReactNode } from "react";

type TopicType = {
	_id: string;
	title: string;
	description: string;
};

type FeatureType = {
	id: number;
	icon: ReactNode;
	title: string;
	description: string;
};
