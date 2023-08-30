import { User } from "@/models/User";
import { connectToDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	try {
		await connectToDB();

		const users = await User.find({});

		return NextResponse.json(users, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
