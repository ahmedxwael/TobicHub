"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

type LoadMoreButtonProps = {
  loadMore: (skip: number) => Promise<void>;
};

export default function LoadMoreButton({ loadMore }: LoadMoreButtonProps) {
  const [skip, setSkip] = useState(5);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      onClick={() => {
        loadMore(skip);
        setSkip(skip + 5);
      }}
      className={cn()}
    >
      Load more
    </Button>
  );
}
