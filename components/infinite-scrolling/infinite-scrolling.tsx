"use client";

import { useEffect } from "react";

type InfiniteScrollingProps = {
  length: number;
};

export function InfiniteScrolling({ length }: InfiniteScrollingProps) {
  useEffect(() => {}, []);

  return (
    length > 10 && <div className="flex items-center justify-between"></div>
  );
}
