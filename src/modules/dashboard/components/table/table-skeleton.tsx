import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  showHeader?: boolean;
}

export const TableSkeleton = memo<TableSkeletonProps>(
  ({ rows = 10, showHeader = true }) => {
    return (
      <div className="rounded-md border">
        <div className="border-b">
          {showHeader && (
            <div className="flex items-center space-x-4 p-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-8" />
            </div>
          )}
        </div>
        <div className="divide-y">
          {Array.from({ length: rows }, (_, index) => (
            <div key={index} className="flex items-center space-x-4 p-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-8 w-8" />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

TableSkeleton.displayName = "TableSkeleton";
