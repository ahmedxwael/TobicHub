import { Topic } from "@/models/Topic";
import { connectToDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const query = req.nextUrl.searchParams.get("q");
	try {
		await connectToDB();

		const topics = await Topic.find({
			$or: [
				{ title: { $regex: new RegExp(query || "", "i") } },
				{ description: { $regex: new RegExp(query || "", "i") } },
			],
		})
			.populate("creator", { email: 0 })
			.sort({ _id: -1 });

		return NextResponse.json(topics, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};