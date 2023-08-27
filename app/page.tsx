import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
	description: "The home page for this REST-API application.",
};

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between py-24">
			<h1 className="text-3xl font-bold">Home page</h1>
		</main>
	);
}
