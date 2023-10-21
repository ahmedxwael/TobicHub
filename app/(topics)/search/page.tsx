import TopicsSection from "@/components/topics/topics-section";
import { getSearchTopics } from "@/utils/topic-utils";
import React from "react";

// export const revalidate = 0;

type Props = {
	searchParams: { q: string };
};

const SearchPage = async ({ searchParams: { q } }: Props) => {
	const topics = await getSearchTopics(q);

	return (
		<section className="flex flex-col gap-8">
			<TopicsSection topics={topics || []} title={`Results for ${q}`} />
		</section>
	);
};

export default SearchPage;
