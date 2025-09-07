export type SortDirection = "asc" | "desc";
export type SortField =
  | "id"
  | "date"
  | "status"
  | "address"
  | "project"
  | "user.name";
export type FilterStatus =
  | "all"
  | "Pending"
  | "Approved"
  | "Complete"
  | "Rejected"
  | "In Progress";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  status: FilterStatus;
}
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
