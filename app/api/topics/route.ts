import { Topic } from "@/models/Topic";
import { connectToDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	try {
		await connectToDB();

		const topics = await Topic.find({}).populate("creator").sort({ _id: -1 });

		return NextResponse.json(topics, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};

export const POST = async (request: NextRequest) => {
	const data = await request.json();

	try {
		await connectToDB();

		await Topic.create(data);

		return NextResponse.json(
			{ message: "Topic created successfuly" },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Couldn't get the topic" },
			{ status: 500 }
		);
	}
};

export const DELETE = async (request: NextRequest) => {
	try {
		const id = request.nextUrl.searchParams.get("id");

		await connectToDB();

		await Topic.findByIdAndDelete(id);

		return NextResponse.json(
			{ message: "Deleted successfully!" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
