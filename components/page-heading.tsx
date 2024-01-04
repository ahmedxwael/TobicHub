import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type PageHeadingProps = {
  children: ReactNode;
  shadow?: boolean;
};

export default function PageHeading({ children, shadow }: PageHeadingProps) {
  return (
    <div className="relative w-fit">
      <span
        className={cn(
          "absolute left-0 top-1/2 h-0 w-0 -translate-y-1/2 rounded-full",
          shadow && "shadow-[0_0_120px_40px_rgb(10,143,132)]"
        )}
      ></span>
      <h1 className="w-fit text-3xl font-extrabold capitalize tracking-wider text-primary">
        {children}
      </h1>
    </div>
  );
}
