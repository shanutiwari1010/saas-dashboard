import { memo, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationContent,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  isLoading?: boolean;
}

export const TablePagination = memo<TablePaginationProps>(
  ({
    currentPage,
    totalPages,
    onPageChange,
    onPrevious,
    onNext,
    isLoading = false,
  }) => {
    const paginationItems = useMemo(() => {
      if (totalPages <= 1) return [];

      const items = [];
      const maxVisible = 5;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        // Always show first page
        items.push(1);

        if (currentPage > 3) {
          items.push("ellipsis-start");
        }

        // Show pages around current page
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
          if (i !== 1 && i !== totalPages) {
            items.push(i);
          }
        }

        if (currentPage < totalPages - 2) {
          items.push("ellipsis-end");
        }

        // Always show last page
        if (totalPages > 1) {
          items.push(totalPages);
        }
      }

      return items;
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    return (
      <div className="mt-2 w-full p-2">
        <Pagination>
          <PaginationContent className="flex w-full items-center justify-end">
            <PaginationItem>
              <Button
                size="icon"
                variant="ghost"
                className={
                  currentPage === 1 || isLoading
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                onClick={onPrevious}
                disabled={isLoading}
              >
                <ChevronLeft size={20} />
              </Button>
            </PaginationItem>

            {paginationItems.map((item, index) => {
              if (item === "ellipsis-start" || item === "ellipsis-end") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              const pageNumber = item as number;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => onPageChange(pageNumber)}
                    isActive={currentPage === pageNumber}
                    className="cursor-pointer"
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <Button
                size="icon"
                variant="ghost"
                className={
                  currentPage === totalPages || isLoading
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                onClick={onNext}
                disabled={isLoading}
              >
                <ChevronRight size={20} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
);

TablePagination.displayName = "TablePagination";
