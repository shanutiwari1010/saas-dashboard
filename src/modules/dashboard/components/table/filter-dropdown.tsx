import { memo } from "react";
import { X } from "lucide-react";
import { FunnelSimple } from "phosphor-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import type {
  FilterStatus,
  FilterConfig,
} from "@/modules/dashboard/types/table";
import { FILTER_OPTIONS } from "@/modules/dashboard/constants/table";

interface FilterDropdownProps {
  totalCount: number;
  filteredCount: number;
  filterConfig: FilterConfig;
  onResetFilters: () => void;
  onFilterChange: (config: FilterConfig) => void;
}

export const FilterDropdown = memo<FilterDropdownProps>(
  ({
    filterConfig,
    onFilterChange,
    onResetFilters,
    filteredCount,
    totalCount,
  }) => {
    const handleFilterChange = (status: FilterStatus) => {
      onFilterChange({ status });
    };

    const hasActiveFilter = filterConfig.status !== "all";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${hasActiveFilter ? "bg-dashboard-revenue" : ""}`}
          >
            <FunnelSimple className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5 text-sm font-medium text-gray-500">
            Filter Orders
          </div>
          <div className="px-2 py-1 text-xs text-gray-400">
            {filteredCount} of {totalCount} orders
          </div>
          <DropdownMenuSeparator />

          {FILTER_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleFilterChange(option.value)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {option.color && (
                  <div className={`h-2 w-2 rounded-full ${option.color}`} />
                )}
                <span>{option.label}</span>
              </div>
              {filterConfig.status === option.value && (
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              )}
            </DropdownMenuItem>
          ))}

          {hasActiveFilter && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onResetFilters}
                className="flex items-center gap-2 text-red-600 focus:text-red-600"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

FilterDropdown.displayName = "FilterDropdown";
