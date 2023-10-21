import { TopicType } from "@/types";

export async function addTopic(newTopic: Partial<TopicType>) {
	await fetch(`/api/topics`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(newTopic),
	})
		.then((res) => res.json())
		.catch(() => {
			throw new Error("Something went wrong.");
		});
}

export async function editTopic(
	topicId: string,
	updatedTopic: Partial<TopicType>
) {
	await fetch(`/api/topics/${topicId}`, {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(updatedTopic),
	})
		.then((res) => res.json())
		.catch(() => {
			throw new Error("Something went wrong.");
		});
}

export const getTopic = async (id: string) => {
	const res = await fetch(`${process.env.BASE_URL}/api/topics/${id}`, {
		next: { tags: ["topics"] },
	});

	if (!res.ok) {
		throw new Error("Could not retrieve the topic.");
	}

	return res.json();
};

export const getTopics = async (): Promise<TopicType[]> => {
	const res = await fetch(`${process.env.BASE_URL}/api/topics`, {
		next: { tags: ["topics"] },
	});

	if (!res.ok) {
		throw new Error("Could not retrieve the list of topics.");
	}

	return res.json();
};

export const getUserTopics = async (id: string): Promise<TopicType[]> => {
	const BASE_URL = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;
	const res = await fetch(`${BASE_URL}/api/topics/user?id=${id}`, {
		next: { tags: ["topics"] },
	});

	if (!res.ok) {
		throw new Error("Could not retrieve the list of topics.");
	}

	return res.json();
};

export const getSearchTopics = async (query: string): Promise<TopicType[]> => {
	const res = await fetch(
		`${process.env.BASE_URL}/api/topics/search?q=${query}`,
		{ next: { tags: ["topics"] } }
	);

	if (!res.ok) {
		throw new Error("Could not retrieve the list of topics.");
	}

	return res.json();
};
