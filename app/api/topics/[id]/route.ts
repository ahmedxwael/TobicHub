import { Topic } from "@/models/Topic";
import { connectToDB } from "@/utils/db";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params: { id } }: { params: { id: string } }
) => {
	try {
		await connectToDB();

		const [topic] = await Topic.find({ _id: id }).populate("creator", {
			email: 0,
		});

		return Response.json(topic, { status: 200 });
	} catch (error: any) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};

export const PATCH = async (
	request: NextRequest,
	{ params: { id } }: { params: { id: string } }
) => {
	const { title, description } = await request.json();

	try {
		const topic = await Topic.findByIdAndUpdate(id, {
			title,
			description,
		});

		revalidateTag("topics");

		return Response.json(topic, { status: 200 });
	} catch (error: any) {
		return Response.json({ error }, { status: 500 });
	}
};

export const DELETE = async (
	request: NextRequest,
	{ params: { id } }: { params: { id: string } }
) => {
	try {
		await connectToDB();

		await Topic.findByIdAndDelete(id);
		revalidateTag("topics");

		return Response.json({ message: "Deleted successfully!" }, { status: 200 });
	} catch (error: any) {
		return Response.json({ error: error.message }, { status: 500 });
	}
};
