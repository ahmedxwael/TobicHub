import React, { ReactNode } from "react";

type PageHeadingProps = {
  children: ReactNode;
};

export default function PageHeading({ children }: PageHeadingProps) {
  return (
    <h1 className="w-fit text-2xl font-bold capitalize tracking-wider">
      {children}
    </h1>
  );
}
