import { NextRequest, NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

export const GET = async () => {
	try {
		const response = await fetch(`${DATA_SOURCE_URL}`, { cache: "no-store" });
		const todos: TodoType[] = await response.json();
		return NextResponse.json(todos, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};

export const POST = async (request: NextRequest) => {
	try {
		const data = await request.json();

		const response = await fetch(`${DATA_SOURCE_URL}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then((res) => res.json());

		return NextResponse.json(response, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};

export const PATCH = async (request: NextRequest) => {
	try {
		const todo: TodoType = await request.json();

		const response = await fetch(`${DATA_SOURCE_URL}/${todo.id}`, {
			method: "PATCH",
			body: JSON.stringify({ title: todo.title }),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		}).then((res) => res.json());

		return NextResponse.json(response, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};

export const DELETE = async (request: NextRequest) => {
	try {
		const todo: TodoType = await request.json();

		await fetch(`${DATA_SOURCE_URL}/${todo.id}`, {
			method: "DELETE",
		});

		return NextResponse.json(
			{ message: "Deleted successfully!" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
