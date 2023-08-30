"use client";

import Link from "next/link";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<section className="flex items-center justify-center gap-6 flex-col">
			<h2>Something went wrong!</h2>
			<div className="flex gap-4">
				<button className="btn btn-alt" onClick={() => reset()}>
					Try again
				</button>
				<Link href="/" className="btn btn-primary">
					Back to home
				</Link>
			</div>
		</section>
	);
}
