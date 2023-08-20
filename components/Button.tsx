"use client";

const Button = ({ todo }: { todo: TodoType }) => {
	return (
		<button
			className="rounded-lg py-1.5 px-2.5 text-sm font-medium hover:bg-gray-800 border border-white/20 transition-colors"
			onClick={async () => {
				const isConfirmed = confirm(
					"Are you sure you want to delete this todo?"
				);

				if (isConfirmed) {
					await fetch(`/api/todos`, {
						method: "DELETE",
						body: JSON.stringify(todo),
					});
					alert("Deleted successfully!");
				}
			}}
		>
			Delete
		</button>
	);
};

export default Button;
