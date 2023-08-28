import { FeatureType } from "@/types";
import React from "react";
import { BsFillClipboard2CheckFill, BsPeopleFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";

export const features: FeatureType[] = [
	{
		id: 1,
		icon: React.createElement(MdPlaylistAdd),
		title: "Create Topics",
		description:
			"Express your thoughts by creating topics that matter to you. Share your knowledge and opinions with others.",
	},
	{
		id: 2,
		icon: React.createElement(BsPeopleFill),
		title: "Engage with Community",
		description:
			"Connect with like-minded individuals, join discussions, and broaden your perspective by engaging in diverse conversations.",
	},
	{
		id: 3,
		icon: React.createElement(BsFillClipboard2CheckFill),
		title: "Personalize Experience",
		description:
			"Tailor your feed to your interests. Follow topics and users that resonate with you and curate a customized content stream.",
	},
];
