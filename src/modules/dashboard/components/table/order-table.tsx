import { memo, useCallback } from "react";
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
import { UserAvatar } from "@/modules/dashboard/components/table/user-avatar";
import { OrderActions } from "@/modules/dashboard/components/table/order-actions";
import type { OrderTableProps } from "@/modules/dashboard/types/table";

export const OrderTable = memo<OrderTableProps>(
  ({
    orders,
    selectedOrders,
    hoveredOrderId,
    openDropdownId,
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

    const handleRowMouseLeave = useCallback(
      (orderId: string) => {
        const isDropdownOpen = openDropdownId === orderId;
        if (!isDropdownOpen) {
          onHoverOrder(null);
        }
      },
      [openDropdownId, onHoverOrder]
    );

    const isAllSelected =
      selectedOrders.length === orders.length && orders.length > 0;

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="text-black/40 dark:text-white/40">
              <TableHead className="w-12">
                <Checkbox
                  className="border-black/40 shadow-none dark:border-white/40"
                  checked={isAllSelected}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead className="font-normal">Order ID</TableHead>
              <TableHead className="font-normal">User</TableHead>
              <TableHead className="font-normal">Project</TableHead>
              <TableHead className="font-normal">Address</TableHead>
              <TableHead className="font-normal">Date</TableHead>
              <TableHead className="font-normal">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      No orders found
                    </h3>
                    <p className="max-w-sm text-gray-500">
                      No orders available at the moment.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => {
                const isHovered = hoveredOrderId === order.id;
                const isDropdownOpen = openDropdownId === order.id;
                const isSelected = selectedOrders.includes(order.id);
                const showActions = isSelected || isHovered || isDropdownOpen;

                return (
                  <TableRow
                    key={order.id}
                    className="normal hover:bg-dashboard-revenue"
                    onMouseEnter={() => handleRowMouseEnter(order.id)}
                    onMouseLeave={() => handleRowMouseLeave(order.id)}
                  >
                    <TableCell>
                      <Checkbox
                        className="border-black/40 shadow-none dark:border-white/40"
                        checked={isSelected}
                        onCheckedChange={() => onSelectOrder(order.id)}
                      />
                    </TableCell>
                    <TableCell className="font-normal">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <UserAvatar
                          name={order.user.name}
                          avatar={order.user.avatar}
                        />
                        <span className="font-normal">{order.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-normal">
                      {order.project}
                    </TableCell>
                    <TableCell className="font-normal">
                      {order.address}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 font-normal">
                        <CalendarBlank size={24} />
                        {order.date}
                      </div>
                    </TableCell>
                    <TableCell>
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
                    <TableCell>
                      <OrderActions
                        orderId={order.id}
                        isVisible={showActions}
                        onDelete={onDeleteOrder}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
);

OrderTable.displayName = "OrderTable";
