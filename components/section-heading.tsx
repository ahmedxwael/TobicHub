import React, { ReactNode } from "react";

const SectionHeading = ({ children }: { children: ReactNode }) => {
  return <h2 className="mb-16 text-center text-2xl font-bold">{children}</h2>;
};

export default SectionHeading;
