import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function TopicsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {new Array(3).fill(0).map((_, index) => (
        <div
          key={index}
          className="mx-auto w-full max-w-full rounded-lg border"
        >
          <div className="flex flex-row items-center gap-4 p-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-4 w-1/4 rounded" />
            </div>
          </div>
          <div className="flex-1 space-y-6 px-6 pb-6">
            <div className="grid grid-cols-4 gap-4">
              <Skeleton className="col-span-2 h-4 rounded" />
              <Skeleton className="col-span-2 h-4 rounded" />
              <Skeleton className="col-span-3 h-4 rounded" />
              <Skeleton className="col-span-1 h-4 rounded" />
              <Skeleton className="col-span-1 h-4 rounded" />
              <Skeleton className="col-span-3 h-4 rounded" />
              <Skeleton className="col-span-2 h-4 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
