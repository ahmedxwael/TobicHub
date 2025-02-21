import { Skeleton } from "@/components/ui/skeleton";

export function UsersListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <UserSkeleton />
      <UserSkeleton />
    </div>
  );
}

export function UserSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-4 w-32 max-w-full rounded-full" />
    </div>
  );
}
