import { memo } from "react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import type {
  SortField,
  SortConfig,
  SortDirection,
} from "@/modules/dashboard/types/table";
import { SORT_OPTIONS } from "@/modules/dashboard/constants/table";

interface SortDropdownProps {
  sortConfig: SortConfig;
  onSortChange: (config: SortConfig) => void;
}

export const SortDropdown = memo<SortDropdownProps>(
  ({ sortConfig, onSortChange }) => {
    const handleSortChange = (field: SortField) => {
      const newDirection: SortDirection =
        sortConfig.field === field && sortConfig.direction === "asc"
          ? "desc"
          : "asc";

      onSortChange({ field, direction: newDirection });
    };

    const getSortLabel = () => {
      const option = SORT_OPTIONS.find((opt) => opt.field === sortConfig.field);
      return option ? option.label : "Sort";
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5 text-sm font-medium text-gray-500">
            Sort by {getSortLabel()}
          </div>
          <DropdownMenuSeparator />
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.field}
              onClick={() => handleSortChange(option.field)}
              className="flex items-center justify-between"
            >
              <span>{option.label}</span>
              {sortConfig.field === option.field && (
                <span className="text-xs text-gray-500">
                  {sortConfig.direction === "asc" ? "↑" : "↓"}
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

SortDropdown.displayName = "SortDropdown";
