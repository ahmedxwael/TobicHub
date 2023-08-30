import { Topic } from "@/models/Topic";
import { connectToDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params: { id } }: { params: { id: string } }
) => {
	try {
		await connectToDB();

		const [topic] = await Topic.find({ _id: id }).populate("creator");

		return NextResponse.json(topic, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
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

		return NextResponse.json(topic, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error }, { status: 500 });
	}
};
