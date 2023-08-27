export async function addTopic(newTopic: Partial<TopicType>) {
	await fetch(`/api/topics`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(newTopic),
	}).then((res) => res.json());
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
	}).then((res) => res.json());
}

export const getTopic = async (id: string) => {
	const res = await fetch(`${process.env.NEXTAUTH_URL}/api/topics/${id}`);

	if (!res.ok) {
		throw new Error("Could not retrieve the topic.");
	}

	return res.json();
};

export const getTopics = async (): Promise<TopicType[]> => {
	const res = await fetch(`${process.env.NEXTAUTH_URL}/api/topics`);

	if (!res.ok) {
		throw new Error("Could not retrieve the list of topics.");
	}

	return res.json();
};
