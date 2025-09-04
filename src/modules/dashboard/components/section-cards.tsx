import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
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
      return "bg-sky-100 ";
    case "orders":
      return "bg-slate-50 ";
    case "revenue":
      return "bg-slate-50";
    case "growth":
      return "bg-[#E5ECF6]";
    default:
      return "bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800";
  }
};

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
      {dashboardMetrics.map((metric) => (
        <Card
          key={metric.id}
          className={`@container/card  flex min-w-[12.5rem]   flex-col items-start gap-2 flex-1 ${getCardBackgroundColor(
            metric.id
          )}`}
        >
          <CardHeader>
            <CardDescription
              className="text-neutral-900 font-semibold text-sm leading-5"
              style={{ fontFeatureSettings: "'ss01' on, 'cv01' on, 'cv11' on" }}
            >
              {metric.title}
            </CardDescription>
            <div className="flex items-center gap-2 justify-between w-full">
              <CardTitle
                className=" font-semibold text-2xl leading-9 tabular-nums @[250px]/card:text-3xl"
                style={{
                  fontFamily: "Inter",
                  fontFeatureSettings: "'ss01' on, 'cv01' on, 'cv11' on",
                }}
              >
                {metric.value}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span
                  className=" font-normal text-neutral-900 text-xs leading-[1.125rem]"
                  style={{
                    fontFamily: "Inter",
                    fontFeatureSettings: "'ss01' on, 'cv01' on, 'cv11' on",
                  }}
                >
                  {metric.changeType === "increase" ? "+" : "-"}
                  {metric.change}%
                </span>
                {metric.changeType === "increase" ? (
                  <IconTrendingUp className="h-4 w-4" />
                ) : (
                  <IconTrendingDown className="h-4 w-4 " />
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
