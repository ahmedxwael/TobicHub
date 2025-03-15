import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionHeading({
  className,
  children,
}: SectionHeadingProps) {
  return (
    <h2 className={cn("mb-16 text-center text-2xl font-bold", className)}>
      {children}
    </h2>
  );
}
