import { TrendUp, TrendDown, Minus } from "phosphor-react";

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

export const MetricCard = ({ metric }: MetricCardProps) => {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case MetricTrend.UP:
        return <TrendUp className="h-4 w-4" />;
      case MetricTrend.DOWN:
        return <TrendDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getCardBackgroundColor = (metricId: string) => {
    switch (metricId) {
      case "customers":
        return "bg-card-customers hover:ring-[var(--color-card-customers)]";
      case "orders":
        return "bg-card-orders hover:ring-[var(--color-card-orders)]";
      case "revenue":
        return "bg-card-revenue hover:ring-[var(--color-card-revenue)]";
      case "growth":
        return "bg-card-growth hover:ring-[var(--color-card-growth)]";
      default:
        return "bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <Card
      key={metric.id}
      className={`h-fit w-full rounded-2xl border-none shadow-none transition-all duration-300 ease-in hover:cursor-pointer hover:shadow-inner hover:ring-4 ${getCardBackgroundColor(metric.id)}`}
    >
      <CardHeader className="gap-2 text-black">
        <CardTitle className="text-sm leading-5 font-semibold">
          {metric.title}
        </CardTitle>

        <CardDescription className="flex w-full items-center justify-between gap-2 text-black">
          <p className="text-2xl font-semibold">{metric.value}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs leading-[1.125rem] font-normal">
              {metric.changeType === "increase" ? "+" : "-"}
              {metric.change}%
            </span>
            {getTrendIcon()}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
