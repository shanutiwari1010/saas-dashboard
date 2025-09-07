import type { Order } from "@/modules/dashboard/data/order";
import {
  Clock,
  XCircle,
  CheckCircle,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import type { FilterStatus, SortField } from "@/modules/dashboard/types/table";

export const STATUS_COLORS = {
  "In Progress": "text-status-inprogress",
  Complete: "text-status-complete",
  Pending: "text-status-pending",
  Approved: "text-status-approved",
  Rejected: "text-black/40 dark:text-white/40",
} as const;

export const STATUS_DOT_COLORS = {
  "In Progress": "bg-status-inprogress",
  Complete: "bg-status-complete",
  Pending: "bg-status-pending",
  Approved: "bg-status-approved",
  Rejected: "bg-black/40 dark:bg-white/40",
} as const;

export const STATUS_OPTIONS: Array<{
  value: Order["status"];
  label: string;
  icon: LucideIcon;
  color: string;
}> = [
  {
    value: "In Progress",
    label: "Mark as In Progress",
    icon: Clock,
    color: "text-[var(--status-in-progress)]",
  },
  {
    value: "Complete",
    label: "Mark as Complete",
    icon: CheckCircle,
    color: "text-[var(--status-complete)]",
  },
  {
    value: "Pending",
    label: "Mark as Pending",
    icon: AlertCircle,
    color: "text-[var(--status-pending)]",
  },
  {
    value: "Approved",
    label: "Mark as Approved",
    icon: CheckCircle,
    color: "text-[var(--status-approved)]",
  },
  {
    value: "Rejected",
    label: "Mark as Rejected",
    icon: XCircle,
    color: "text-black/40 dark:text-white/40",
  },
];

export const FILTER_OPTIONS: Array<{
  value: FilterStatus;
  label: string;
  color?: string;
}> = [
  { value: "all", label: "All Orders" },
  { value: "In Progress", label: "In Progress", color: "bg-status-inprogress" },
  { value: "Complete", label: "Complete", color: "bg-status-complete" },
  { value: "Pending", label: "Pending", color: "bg-status-pending" },
  { value: "Approved", label: "Approved", color: "bg-status-approved" },
  {
    value: "Rejected",
    label: "Rejected",
    color: "bg-black/40 dark:bg-white/40",
  },
];

export const SORT_OPTIONS: Array<{
  field: SortField;
  label: string;
  icon?: LucideIcon;
}> = [
  { field: "date", label: "Date" },
  { field: "id", label: "Order ID" },
  { field: "user.name", label: "User" },
  { field: "project", label: "Project" },
  { field: "address", label: "Address" },
  { field: "status", label: "Status" },
];
