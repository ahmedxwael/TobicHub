import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

const TodosPage = async () => {
	const todos: TodoType[] = await fetch(
		`${process.env.NEXTAUTH_URL}/api/todos`
	).then((response) => response.json());

	return (
		<main className="container px-8 mx-auto flex flex-col gap-8 py-10">
			<h1 className="text-3xl font-bold">Todos</h1>

			<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
				{todos.map((todo) => (
					<article
						key={todo.id}
						className="p-4 border border-white/20 rounded-lg flex flex-col gap-2"
					>
						{<h2>{todo.title}</h2>}
						<div className="flex gap-2 items-center justify-end mt-auto">
							<Button todo={todo} />
							<Link
								href={`/create-todo?id=${todo.id}`}
								className="rounded-lg py-1.5 px-2.5 text-sm font-medium bg-white text-black hover:bg-gray-200 transition-colors"
							>
								Edit
							</Link>
						</div>
					</article>
				))}
			</div>
		</main>
	);
};

export default TodosPage;
