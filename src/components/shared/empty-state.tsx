import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-12 text-center",
        className
      )}
    >
      {Icon && (
        <div className="mb-4 rounded-full bg-gray-100 p-3">
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
      )}

      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>

      {description && (
        <p className="mb-4 max-w-sm text-sm text-gray-500">{description}</p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
