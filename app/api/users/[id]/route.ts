import { User } from "@/models/User";
import { connectToDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
	req: NextRequest,
	{ params: { id } }: { params: { id: string } }
) => {
	try {
		await connectToDB();

		const user = await User.findById(id);

		return NextResponse.json(user, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
