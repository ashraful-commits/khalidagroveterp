import { Skeleton } from '../ui/skeleton';

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export function TableSkeleton({ rows = 5, cols = 4 }: TableSkeletonProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-8 py-4 bg-surface-1/50">
        <Skeleton className="h-8 w-64 rounded-xl" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-xl" />
          <Skeleton className="h-8 w-20 rounded-xl" />
        </div>
      </div>
      <div className="divide-y divide-border px-8">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-6 py-5">
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <div className="flex-1 grid grid-cols-4 gap-6">
              <div className="space-y-2 col-span-2">
                <Skeleton className="h-4 w-3/4 rounded-lg" />
                <Skeleton className="h-3 w-1/2 rounded-lg opacity-60" />
              </div>
              <Skeleton className="h-4 w-24 rounded-lg" />
              <Skeleton className="h-4 w-16 rounded-lg ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
