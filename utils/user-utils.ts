import { CreatorType } from "@/types";

export const getUsers = async (): Promise<CreatorType[] | undefined> => {
	const res = await fetch(`${process.env.BASE_URL}/api/users`);

	if (!res.ok) {
		return undefined;
	}

	return res.json();
};

export const getUser = async (id: string): Promise<CreatorType | undefined> => {
	const res = await fetch(`${process.env.BASE_URL}/api/users/${id}`);

	if (!res.ok) {
		return undefined;
	}

	return res.json();
};
