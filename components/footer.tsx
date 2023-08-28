export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mb-20 px-4 text-center text-white/50 max-w-[30rem] sm:max-w-[50rem] mx-auto">
			<small className="mb-2 block text-xs">
				&copy; {year} Ahmed Wael. All rights reserved.
			</small>
			<p className="text-xs leading-6">
				<span className="font-semibold">About this website:</span> built with
				React & Next.js (App Router), TypeScript, Tailwind CSS, Resend and
				Vercel hosting.
			</p>
		</footer>
	);
}
