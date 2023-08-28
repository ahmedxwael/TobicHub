import FeaturesList from "@/components/features/features-list";
import SectionHeading from "@/components/section-heading";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
	description: "The home page for this TopicHub application.",
};

const Home = () => {
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
				<h2 className="text-xl font-bold">Ready to get started?</h2>
				<button
					disabled={true}
					className="mt-6 inline-block px-6 py-3 bg-white bg-opacity-40 text-black disabled:cursor-not-allowed transition-colors rounded-xl font-semibold"
				>
					{/* Create an Account */}
					Comming soon
				</button>
			</section>
		</>
	);
};

export default Home;
