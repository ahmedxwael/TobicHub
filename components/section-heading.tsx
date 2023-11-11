import React, { ReactNode } from "react";

export default function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-16 text-center text-2xl font-bold">{children}</h2>;
}
