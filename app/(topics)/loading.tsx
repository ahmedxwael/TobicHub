import React from "react";
import { BiLoader } from "react-icons/bi";

const loading = () => {
	return (
		<section className="container mx-auto min-h-[calc(100vh-117px-12rem)] sm:min-h-[calc(100vh-76.8px-12rem)] flex items-center justify-center">
			<span className="animate-spin text-3xl">
				<BiLoader />
			</span>
		</section>
	);
};

export default loading;
