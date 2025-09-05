import { TrendDown, TrendUp } from "phosphor-react";
import { dashboardMetrics } from "../data/dashboard-metrics";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

export function SectionCards() {
  return (
    <div className="flex flex-wrap gap-7 md:grid md:grid-cols-2">
      {dashboardMetrics.map((metric) => (
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
                {metric.changeType === "increase" ? (
                  <TrendUp className="h-4 w-4" />
                ) : (
                  <TrendDown className="h-4 w-4" />
                )}
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
