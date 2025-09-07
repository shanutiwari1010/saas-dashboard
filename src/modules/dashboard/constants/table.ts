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
