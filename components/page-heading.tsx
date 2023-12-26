import { ReactNode } from "react";

type PageHeadingProps = {
  children: ReactNode;
};

export default function PageHeading({ children }: PageHeadingProps) {
  return (
    <h1 className="w-fit bg-primary bg-clip-text text-3xl font-extrabold capitalize tracking-wider text-transparent backdrop-blur">
      {children}
    </h1>
  );
}
