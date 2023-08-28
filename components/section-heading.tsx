import React, { ReactNode } from "react";

const SectionHeading = ({ children }: { children: ReactNode }) => {
	return <h2 className="font-bold text-2xl text-center mb-16">{children}</h2>;
};

export default SectionHeading;
