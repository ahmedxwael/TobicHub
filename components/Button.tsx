"use client";

import { useRouter } from "next/navigation";

const Button = ({ id }: { id: string }) => {
	const router = useRouter();

	const deleteTopic = async () => {
		const isConfirmed = confirm("Are you sure you want to delete this topic?");

		if (isConfirmed) {
			await fetch(`/api/topics?id=${id}`, {
				method: "DELETE",
			});

			router.refresh();
		}
	};

	return (
		<button
			className="rounded-lg py-1.5 px-2.5 text-sm font-medium hover:bg-gray-800 border border-white/20 transition-colors"
			onClick={deleteTopic}
		>
			Delete
		</button>
	);
};

export default Button;
