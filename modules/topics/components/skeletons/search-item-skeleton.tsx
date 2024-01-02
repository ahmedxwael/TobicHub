import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SearchItemSkeleton() {
  return (
    <div className="mx-auto w-full max-w-full space-y-3">
      <div className="flex flex-row items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-4 gap-2">
          <Skeleton className="col-span-2 h-4 rounded" />
          <Skeleton className="col-span-4 h-4 rounded" />
        </div>
      </div>
    </div>
  );
}
