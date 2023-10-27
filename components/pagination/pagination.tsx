import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";

type PaginationProps = {};

export function Pagination({}: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        className="flex min-w-[120px] shrink-0 items-center gap-3"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        <span className="mx-auto inline-block">Previous</span>
      </Button>
      <Button
        variant="outline"
        className="flex min-w-[120px] shrink-0 items-center gap-3"
      >
        <span className="mx-auto inline-block">Next</span>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
