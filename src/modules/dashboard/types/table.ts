import type { OrderFormData } from "@/modules/dashboard/components/table/schema/order";
import type { Order } from "@/modules/dashboard/data/order";

export interface DeleteTarget {
  type: "single" | "multiple";
  orderId?: string;
  count?: number;
}

export interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: string;
}

export interface OrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OrderFormData) => void;
}

export interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deleteTarget: DeleteTarget | null;
  onConfirm: () => void;
}

export interface OrderTableProps {
  orders: Order[];
  selectedOrders: string[];
  hoveredOrderId: string | null;
  openDropdownId: string | null;
  onSelectOrder: (orderId: string) => void;
  onSelectAll: () => void;
  onDeleteOrder: (orderId: string) => void;
  onHoverOrder: (orderId: string | null) => void;
  onDropdownChange: (orderId: string | null) => void;
}

export interface OrderActionsProps {
  orderId: string;
  isVisible: boolean;
  onDelete: (orderId: string) => void;
}
