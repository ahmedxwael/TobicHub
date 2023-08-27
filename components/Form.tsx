"use client";

import { addTopic, editTopic } from "@/utils/topicUtils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {
	type: "create" | "edit";
	currentTopic?: TopicType;
};

const Form = ({ type, currentTopic }: Props) => {
	const router = useRouter();

	const intialTopicValue =
		type === "create"
			? { title: "", description: "" }
			: (currentTopic as TopicType);

	const [topic, setTopic] = useState<Partial<TopicType>>(intialTopicValue);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setSubmitting(true);

			if (type === "create") {
				addTopic(topic);
			}

			if (type === "edit") {
				editTopic(currentTopic?._id!, topic);
			}

			setSubmitting(false);
			router.refresh();
			router.push("/topics");
		} catch (error) {
			throw new Error("Something went wrong");
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="flex-col flex gap-6 border-2 p-6 border-white/10 rounded-lg w-[500px] max-w-full"
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					placeholder="Enter a topic"
					className="py-2 px-4 rounded-lg w-full text-black"
					value={topic.title}
					required={true}
					onChange={(e) =>
						setTopic((curr) => ({ ...curr, title: e.target.value }))
					}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="userId">Description</label>
				<textarea
					id="description"
					name="description"
					className="py-2 px-4 rounded-lg w-full text-black"
					placeholder="Enter a description"
					rows={6}
					required={true}
					value={topic.description}
					onChange={(e) =>
						setTopic((curr) => ({ ...curr, description: e.target.value }))
					}
				/>
			</div>
			<button
				disabled={submitting}
				className="text-black capitalize font-semibold disabled:cursor-not-allowed disabled:opacity-70 rounded-lg py-4 px-6 bg-white"
			>
				{submitting ? `${type}ting...` : `${type}`}
			</button>
		</form>
	);
};

export default Form;
