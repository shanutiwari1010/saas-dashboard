import { memo, useCallback, useMemo } from "react";
import { CalendarBlank } from "phosphor-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import {
  STATUS_COLORS,
  STATUS_DOT_COLORS,
} from "@/modules/dashboard/constants/table";
import type { Order } from "@/modules/dashboard/data/order";
import { UserAvatar } from "@/modules/dashboard/components/table/user-avatar";
import { OrderActions } from "@/modules/dashboard/components/table/order-actions";
import { TableContainer } from "@/modules/dashboard/components/table/table-container";

export interface OrderTableProps {
  orders: Order[];
  selectedOrders: string[];
  hoveredOrderId: string | null;
  filteredOrdersCount: number;
  isLoading?: boolean;
  onSelectAll: () => void;
  onSelectOrder: (orderId: string) => void;
  onDeleteOrder: (orderId: string) => void;
  onHoverOrder: (orderId: string | null) => void;
}

export const OrderTable = memo<OrderTableProps>(
  ({
    orders,
    selectedOrders,
    hoveredOrderId,
    filteredOrdersCount,
    isLoading = false,
    onSelectOrder,
    onSelectAll,
    onDeleteOrder,
    onHoverOrder,
  }) => {
    const handleRowMouseEnter = useCallback(
      (orderId: string) => {
        onHoverOrder(orderId);
      },
      [onHoverOrder]
    );

    const handleRowMouseLeave = useCallback(() => {
      // Don't hide actions if dropdown is open for this row
      // The dropdown state is now managed internally by OrderActions
      onHoverOrder(null);
    }, [onHoverOrder]);

    const isAllSelected =
      selectedOrders.length === filteredOrdersCount && filteredOrdersCount > 0;

    // Memoize table content to prevent unnecessary re-renders
    const tableContent = useMemo(() => {
      if (orders.length === 0) {
        return (
          <TableRow>
            <TableCell colSpan={8} className="h-32">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  No orders found
                </h3>
                <p className="max-w-sm font-normal text-gray-500 dark:text-gray-500">
                  No orders available at the moment.
                </p>
              </div>
            </TableCell>
          </TableRow>
        );
      }

      return orders.map((order) => {
        const isHovered = hoveredOrderId === order.id;
        const isSelected = selectedOrders.includes(order.id);
        const showActions = isSelected || isHovered;

        return (
          <TableRow
            key={order.id}
            className="normal hover:bg-dashboard-revenue h-16"
            onMouseEnter={() => handleRowMouseEnter(order.id)}
            onMouseLeave={handleRowMouseLeave}
          >
            <TableCell className="h-16">
              <Checkbox
                className="border-black/40 shadow-none dark:border-white/40"
                checked={isSelected}
                onCheckedChange={() => onSelectOrder(order.id)}
              />
            </TableCell>
            <TableCell className="h-16 font-normal">{order.id}</TableCell>
            <TableCell className="h-16">
              <div className="flex items-center gap-3">
                <UserAvatar name={order.user.name} avatar={order.user.avatar} />
                <span className="font-normal">{order.user.name}</span>
              </div>
            </TableCell>
            <TableCell className="h-16 font-normal">{order.project}</TableCell>
            <TableCell className="h-16 font-normal">{order.address}</TableCell>
            <TableCell className="h-16">
              <div className="flex items-center gap-2 font-normal">
                <CalendarBlank size={24} />
                {order.date}
              </div>
            </TableCell>
            <TableCell className="h-16">
              <Badge
                variant="outline"
                className={`border-0 bg-transparent font-normal shadow-none ${STATUS_COLORS[order.status]}`}
              >
                <span
                  className={`mr-2 inline-block h-2 w-2 rounded-full ${STATUS_DOT_COLORS[order.status]}`}
                />
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="h-16">
              <OrderActions
                orderId={order.id}
                isVisible={showActions}
                onDelete={onDeleteOrder}
              />
            </TableCell>
          </TableRow>
        );
      });
    }, [
      orders,
      selectedOrders,
      hoveredOrderId,
      onSelectOrder,
      onDeleteOrder,
      handleRowMouseEnter,
      handleRowMouseLeave,
    ]);

    return (
      <TableContainer isLoading={isLoading} skeletonRows={10}>
        <Table>
          <TableHeader>
            <TableRow className="h-12 text-black/40 dark:text-white/40">
              <TableHead className="h-12 w-12">
                <Checkbox
                  className="border-black/40 shadow-none dark:border-white/40"
                  checked={isAllSelected}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead className="h-12 font-normal">Order ID</TableHead>
              <TableHead className="h-12 font-normal">User</TableHead>
              <TableHead className="h-12 font-normal">Project</TableHead>
              <TableHead className="h-12 font-normal">Address</TableHead>
              <TableHead className="h-12 font-normal">Date</TableHead>
              <TableHead className="h-12 font-normal">Status</TableHead>
              <TableHead className="h-12 w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
    );
  }
);

OrderTable.displayName = "OrderTable";
