import TopicsSection from "@/components/topics/topics-section";
import React from "react";

type Props = {
	searchParams: { q: string };
};

const SearchPage = async ({ searchParams: { q } }: Props) => {
	return (
		<section className="flex flex-col gap-8">
			<TopicsSection title={`Results for ${q}`} query={q} />
		</section>
	);
};

export default SearchPage;
