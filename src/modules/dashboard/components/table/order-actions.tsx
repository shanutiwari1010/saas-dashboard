import { memo, useState } from "react";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface OrderActionsProps {
  orderId: string;
  isVisible: boolean;
  onDelete: (orderId: string) => void;
}

export const OrderActions = memo<OrderActionsProps>(
  ({ orderId, isVisible, onDelete }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (!isVisible && !isDropdownOpen) {
      return <div className="h-8 w-8" />;
    }

    return (
      <div className="flex items-center justify-center">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(orderId)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

OrderActions.displayName = "OrderActions";
