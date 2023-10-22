"use client";

import FeaturesList from "@/components/features/features-list";
import SectionHeading from "@/components/section-heading";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Home = () => {
	const router = useRouter();

	const clickHandler = () => {
		router.push("/register");
	};

	return (
		<>
			<section className="text-center">
				<h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-normal">
					Welcome to TopicHub!
				</h1>
				<p className="text-muted-foreground sm:text-lg">
					Empower Your Ideas with Engaging Topics
				</p>
			</section>

			<section className="mt-20 w-full">
				<SectionHeading>Features</SectionHeading>
				<FeaturesList />
			</section>

			<section className="mt-20 text-center">
				<h2 className="text-xl font-bold mb-6">Ready to get started?</h2>

				<Link href="/register" className={cn(buttonVariants({ size: "lg" }))}>
					Join us now
				</Link>
			</section>
		</>
	);
};

export default Home;
