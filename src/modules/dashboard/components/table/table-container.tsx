import { memo } from "react";

interface TableContainerProps {
  children: React.ReactNode;
  isLoading?: boolean;
  skeletonRows?: number;
}

export const TableContainer = memo<TableContainerProps>(
  ({ children, isLoading = false, skeletonRows = 10 }) => {
    if (isLoading) {
      return (
        <div className="max-h-[28rem] min-h-[28rem] w-full overflow-y-auto rounded-md border">
          <div className="border-b">
            <div className="flex items-center space-x-4 p-4">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
          <div className="divide-y">
            {Array.from({ length: skeletonRows }, (_, index) => (
              <div key={index} className="flex items-center space-x-4 p-4">
                <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
                <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="max-h-[28rem] min-h-[28rem] w-full overflow-y-auto rounded-md border">
        {children}
      </div>
    );
  }
);

TableContainer.displayName = "TableContainer";
