import { useMemo, memo } from "react";
import type { TooltipProps } from "recharts";

import { cn } from "@/lib/utils";
import { formatNumberToMillions } from "@/modules/dashboard/utils/format";

interface TooltipEntry {
  dataKey: string;
  value: number;
  name: string;
  color?: string;
}

interface ChartColors {
  axis: string;
  grid: string;
  [key: string]: string;
}

interface ChartTooltipProps extends TooltipProps<number, string> {
  label?: string;
  active?: boolean;
  payload?: TooltipEntry[];
  colors: ChartColors;
  chartType?: "revenue" | "projections" | "default";
  showDollarSign?: boolean;
  customFormatter?: (value: number, dataKey: string) => string;
}

const ChartTooltip = memo<ChartTooltipProps>(
  ({
    label,
    active,
    colors,
    payload,
    chartType = "default",
    showDollarSign = true,
    customFormatter,
  }) => {
    const processedPayload = useMemo(() => {
      if (!active || !payload?.length) return null;

      // Filter out null values
      const filteredPayload = payload.filter(
        (entry: TooltipEntry) => entry.value !== null
      );

      // Handle different chart types
      switch (chartType) {
        case "revenue":
          // Group current week data (currentSolid + currentForecast)
          return filteredPayload.reduce(
            (acc: Record<string, TooltipEntry>, entry: TooltipEntry) => {
              if (
                entry.dataKey === "currentForecast" ||
                entry.dataKey === "currentSolid"
              ) {
                if (!acc["current"]) {
                  acc["current"] = { ...entry, name: "Current Week" };
                }
              } else {
                acc[entry.dataKey] = entry;
              }
              return acc;
            },
            {}
          );

        case "projections":
          // Handle projections vs actuals logic
          return filteredPayload.reduce(
            (acc: Record<string, TooltipEntry>, entry: TooltipEntry) => {
              if (entry.dataKey === "projected") {
                const actual =
                  filteredPayload.find((p) => p.dataKey === "actual")?.value ??
                  0;
                const projected = actual + entry.value;
                acc["projected"] = {
                  ...entry,
                  value: projected,
                  name: "Projected",
                };
              } else {
                acc[entry.dataKey] = entry;
              }
              return acc;
            },
            {}
          );

        default:
          return filteredPayload.reduce(
            (acc: Record<string, TooltipEntry>, entry: TooltipEntry) => {
              acc[entry.dataKey] = entry;
              return acc;
            },
            {}
          );
      }
    }, [active, payload, chartType]);

    const formatValue = useMemo(() => {
      return (value: number, dataKey: string) => {
        if (customFormatter) {
          return customFormatter(value, dataKey);
        }

        const formatted = formatNumberToMillions(value);
        return showDollarSign ? `$${formatted}` : formatted;
      };
    }, [customFormatter, showDollarSign]);

    const getColorForDataKey = useMemo(() => {
      return (dataKey: string) => {
        // Map dataKey to color keys
        const colorMap: Record<string, string> = {
          current: "current",
          previous: "previous",
          actual: "actual",
          projected: "projected",
          currentSolid: "current",
          currentForecast: "current",
        };

        const colorKey = colorMap[dataKey] || dataKey;
        return colors[colorKey] || colors.axis;
      };
    }, [colors]);

    if (!processedPayload) return null;

    const entries = Object.values(processedPayload);

    return (
      <div
        role="tooltip"
        aria-label="Chart data"
        className="space-y-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        {label && (
          <h4 className="font-medium text-black dark:text-white">{label}</h4>
        )}
        <div className="flex flex-col gap-0.5 font-normal">
          {entries.map((entry, index) => (
            <div
              key={`${entry.dataKey}-${index}`}
              className="flex items-center gap-2"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-sm",
                  chartType === "projections" && entry.dataKey === "projected"
                    ? "opacity-50"
                    : "opacity-100"
                )}
                style={{
                  backgroundColor: getColorForDataKey(entry.dataKey),
                }}
              />
              <span
                aria-label={`${entry.name} value`}
                className="text-gray-600 capitalize dark:text-gray-300"
              >
                {entry.name}:
              </span>
              <span className="text-gray-900 dark:text-white">
                {formatValue(entry.value, entry.dataKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ChartTooltip.displayName = "ChartTooltip";

export { ChartTooltip };
export type { ChartTooltipProps, ChartColors };
