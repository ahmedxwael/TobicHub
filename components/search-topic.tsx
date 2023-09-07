"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LuSearch } from "react-icons/lu";

const SearchTopic = () => {
	const router = useRouter();
	const [queryString, setQueryString] = useState<string>("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const encodedQueryString = encodeURI(queryString);

		router.push(`/search?q=${encodedQueryString}`);
	};

	return (
		<form className="relative" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Search for a spesific topic"
				className="py-3 px-6 rounded-xl placeholder:text-sm text-black"
				required={true}
				value={queryString}
				onChange={(e) => setQueryString(e.target.value)}
			/>
			<button className="absolute top-1/2 right-4 text-xl -translate-y-1/2 text-black hover:scale-110 transition-transform">
				<LuSearch />
			</button>
		</form>
	);
};

export default SearchTopic;
