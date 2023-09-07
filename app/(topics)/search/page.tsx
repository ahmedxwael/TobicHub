import TopicsSection from "@/components/topics/topics-section";
import React from "react";

type Props = {
	searchParams: { q: string };
};

const SearchPage = async ({ searchParams: { q } }: Props) => {
	const res = await fetch(`${process.env.BASE_URL}/api/topics/search?q=${q}`);
	const topics = await res.json();
	return (
		<section className="flex flex-col gap-8">
			<TopicsSection topics={topics} title={`Results for ${q}`} />
		</section>
	);
};

export default SearchPage;
