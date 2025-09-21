import { useCallback } from "react";
import { TrendUp, TrendDown, Minus } from "phosphor-react";

import { cn } from "@/lib/utils";
import { formatMetricChange } from "@/modules/dashboard/utils/format";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { MetricTrend } from "@/modules/dashboard/types/metrics";
import type { MetricCard as MetricCardType } from "@/modules/dashboard/types/metrics";

interface MetricCardProps {
  metric: MetricCardType;
}

const MetricCard: React.FunctionComponent<MetricCardProps> = ({ metric }) => {
  const getTrendIcon = useCallback(() => {
    switch (metric.trend) {
      case MetricTrend.UP:
        return <TrendUp className="h-4 w-4" />;
      case MetricTrend.DOWN:
        return <TrendDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  }, [metric.trend]);

  const getCardBackgroundColor = useCallback((metricId: string) => {
    switch (metricId) {
      case "customers":
        return "bg-dashboard-customers hover:ring-[var(--dashboard-blue-light)]";
      case "orders":
        return "bg-dashboard-orders hover:ring-[var(--dashboard-orders)]";
      case "revenue":
        return "bg-dashboard-revenue hover:ring-[var(--dashboard-light)]";
      case "growth":
        return "bg-dashboard-growth hover:ring-[var(--dashboard-purple-light)]";
      default:
        return "bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800";
    }
  }, []);

  return (
    <Card
      key={metric.id}
      className={`h-fit w-full rounded-2xl border-none shadow-none transition-all duration-300 ease-in hover:cursor-pointer hover:shadow-inner hover:ring-4 ${getCardBackgroundColor(metric.id)}`}
    >
      <CardHeader
        className={cn(
          "gap-2",
          (metric.id === "growth" || metric.id === "customers") &&
            "dark:text-black"
        )}
      >
        <CardTitle
          className={cn(
            "heading",
            (metric.id === "growth" || metric.id === "customers") &&
              "dark:text-black!"
          )}
        >
          {metric.title}
        </CardTitle>
        <CardDescription
          className={cn(
            "flex w-full items-center justify-between gap-2 text-black dark:text-white",
            (metric.id === "growth" || metric.id === "customers") &&
              "dark:text-black"
          )}
        >
          <h4 className="text-2xl font-semibold">{metric.value}</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs leading-[1.125rem] font-normal">
              {formatMetricChange(metric.changeType, metric.change)}
            </span>
            {getTrendIcon()}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export { MetricCard };
// for developer tools readability.
MetricCard.displayName = "MetricCard";
