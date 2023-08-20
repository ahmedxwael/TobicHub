import { NextRequest, NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

export const GET = async (
	req: NextRequest,
	{ params: { id } }: { params: { id: string } }
) => {
	try {
		const response = await fetch(`${DATA_SOURCE_URL}/${id}`);
		const todo: TodoType = await response.json();
		return NextResponse.json(todo, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
