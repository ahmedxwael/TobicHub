"use client";

import { Button } from "@/components/ui/button";
import { PaginationInfo } from "@/shared/types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type DataTablePaginationProps = {
  paginationInfo: PaginationInfo;
};

let skip = 0;

export function DataTablePagination({
  paginationInfo,
}: DataTablePaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  skip = Number(searchParams.get("skip")) || 0;

  const handleNavigation = (value: number) => {
    skip = value;

    if (skip < 0) {
      return;
    }

    router.push(`${pathname}?skip=${skip}`);
  };

  return (
    <div className="mt-6 flex flex-col justify-center gap-2 px-2 sm:flex-row sm:items-center">
      <div className="flex flex-wrap items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="flex min-w-[120px] items-center gap-2"
            onClick={() => handleNavigation(skip - 10)}
            disabled={skip < 10}
            aria-label="Go to previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            className="flex min-w-[120px] items-center gap-2"
            onClick={() => handleNavigation(skip + 10)}
            disabled={paginationInfo.dataCount < 10}
            aria-label="Go to next page"
          >
            Next
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
