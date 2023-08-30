"use client";

import Button from "@/components/button";
import FeaturesList from "@/components/features/features-list";
import SectionHeading from "@/components/section-heading";
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
				<p className="text-white/60 sm:text-lg">
					Empower Your Ideas with Engaging Topics
				</p>
			</section>

			<section className="mt-20">
				<SectionHeading>Features</SectionHeading>
				<FeaturesList />
			</section>

			<section className="mt-20 text-center">
				<h2 className="text-xl font-bold mb-4">Ready to get started?</h2>

				<Button type="primary" handler={clickHandler}>
					Join us now
				</Button>
			</section>
		</>
	);
};

export default Home;
