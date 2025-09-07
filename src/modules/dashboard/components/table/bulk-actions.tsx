import { memo } from "react";
import { Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import type { Order } from "@/modules/dashboard/data/order";
import { STATUS_OPTIONS } from "@/modules/dashboard/constants/table";

interface BulkActionsProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onBulkUpdateStatus: (status: Order["status"]) => void;
  onClearSelection: () => void;
}

export const BulkActions = memo<BulkActionsProps>(
  ({
    selectedCount,
    onDeleteSelected,
    onBulkUpdateStatus,
    onClearSelection,
  }) => {
    if (selectedCount === 0) return null;

    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-sm">
          {selectedCount} selected
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              Bulk Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm font-medium text-gray-500">
              Update Status
            </div>
            <DropdownMenuSeparator />

            {STATUS_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onBulkUpdateStatus(option.value)}
                className="flex items-center gap-2"
              >
                <span className={option.color}>
                  <option.icon className="h-4 w-4" />
                </span>
                <span>{option.label}</span>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onDeleteSelected}
              className="flex items-center gap-2 text-red-600 focus:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onClearSelection}
              className="flex items-center gap-2 text-gray-600 focus:text-gray-600"
            >
              <X className="h-4 w-4" />
              Clear Selection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

BulkActions.displayName = "BulkActions";
