"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const CreateTodo = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const [todo, setTodo] = useState<Partial<TodoType>>({
		userId: 1,
		title: "",
		completed: false,
	});

	const [submitting, setSubmitting] = useState<boolean>(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitting(true);
		console.log(todo);

		if (!!id) {
			updateTodo();
		} else {
			addTodo();
		}

		setSubmitting(false);
		router.push("/");
	};

	async function addTodo() {
		await fetch(`/api/todos`, {
			method: "POST",
			body: JSON.stringify(todo),
		}).then((res) => res.json());
	}

	async function updateTodo() {
		await fetch(`/api/todos`, {
			method: "PATCH",
			body: JSON.stringify(todo),
		}).then((res) => res.json());
	}

	useEffect(() => {
		if (id) {
			getTodo();
		}
	}, []);

	async function getTodo() {
		const todo = await fetch(`/api/todos/${id}`).then((res) => res.json());
		setTodo(todo);
	}

	return (
		<main className="min-h-[calc(100vh-72.8px)] grid place-content-center">
			<form
				action=""
				onSubmit={handleSubmit}
				className="flex-col flex gap-6 border p-6 border-white/10 rounded-lg w-[500px] max-w-full mx-auto"
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="title">Todo</label>
					<input
						type="text"
						name="title"
						id="title"
						placeholder="Enter your todo"
						className="py-2 px-4 rounded-lg w-full text-black"
						value={todo.title}
						required={true}
						onChange={(e) =>
							setTodo((curr) => ({ ...curr, title: e.target.value }))
						}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="userId">User Id</label>
					<input
						className="py-2 px-4 rounded-lg w-full text-black"
						type="number"
						name="userId"
						id="userId"
						min={1}
						required={true}
						value={todo.userId}
						onChange={(e) =>
							setTodo((curr) => ({ ...curr, userId: e.target.valueAsNumber }))
						}
					/>
				</div>
				<button
					disabled={submitting}
					className="text-black font-semibold disabled:cursor-not-allowed disabled:opacity-70 rounded-lg py-4 px-6 bg-white"
				>
					{submitting ? "Submitting..." : "Submit"}
				</button>
			</form>
		</main>
	);
};

export default CreateTodo;
