import { useMemo, memo, useCallback } from "react";
import {
  Line,
  Area,
  XAxis,
  YAxis,
  ComposedChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

import { useTheme } from "@/hooks/use-theme";
import { REVENUE_LINE_DATA } from "@/modules/dashboard/data/revenue";
import { formatNumberToMillions } from "@/modules/dashboard/utils/format";
import type { RevenueLineDataPoint } from "@/modules/dashboard/types/charts";
import { ChartTooltip } from "@/modules/dashboard/components/chart-wrappers/tooltip";

interface ProcessedDataPoint extends RevenueLineDataPoint {
  currentSolid: number | null;
  currentForecast: number | null;
}

interface LegendItemProps {
  color: string;
  label: string;
  value: number;
  formatRevenue: (value: number) => string;
}

const LegendItem = memo(
  ({ color, label, value, formatRevenue }: LegendItemProps) => (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="font-normal">
        {label}{" "}
        <span className="text-foreground font-semibold" aria-label={label}>
          {formatRevenue(value)}
        </span>
      </span>
    </div>
  )
);

LegendItem.displayName = "LegendItem";

const RevenueLineChart = memo(() => {
  const { theme } = useTheme();

  const colors = useMemo(() => {
    return {
      previous: "var(--dashboard-cyan)",
      current:
        theme === "dark"
          ? "var(--dashboard-purple)"
          : "var(--color-black)",
      axis: theme === "dark" ? "var(--color-white)" : "var(--color-black)",
      grid: theme === "dark" ? "var(--color-white)" : "var(--color-black)",
    };
  }, [theme]);

  // Memoized processed data
  const data = useMemo((): ProcessedDataPoint[] => {
    // Split "current" into solid (Jan–Apr) and dotted forecast (Apr–Jun)
    return REVENUE_LINE_DATA.map((d, i) => ({
      ...d,
      currentSolid: i <= 3 ? d.current : null,
      currentForecast: i >= 3 ? d.current : null,
    }));
  }, []);

  // Memoized tooltip formatter
  const tooltipFormatter = useCallback(
    (value: number, name: string) => [formatNumberToMillions(value), name],
    []
  );

  // Revenue formatter for consistent display
  const formatRevenue = useCallback((value: number) => {
    return `$${value.toLocaleString()}`;
  }, []);

  // TODO: add legend toggle in chart
  // Calculate real values for legend
  const legendValues = useMemo(() => {
    // Get the latest month's data (June)
    const latestData = REVENUE_LINE_DATA[REVENUE_LINE_DATA.length - 1];
    return {
      currentWeek: latestData.current,
      previousWeek: latestData.previous,
    };
  }, []);

  return (
    <section
      className="bg-dashboard-revenue flex h-[19.875rem] w-full flex-1 flex-shrink-0 flex-grow basis-0 flex-col items-start gap-4 rounded-2xl p-6"
      aria-label="Revenue line chart showing current and previous week data"
    >
      {/* Header + Legend */}
      <header className="flex flex-wrap items-center gap-4">
        <h2 className="heading">Revenue</h2>
        <div className="bg-border h-5 w-px" aria-hidden="true" />
        <div className="text-muted-foreground flex items-center gap-6 text-sm">
          <LegendItem
            label="Current Week"
            color={colors.current}
            formatRevenue={formatRevenue}
            value={legendValues.currentWeek}
          />
          <LegendItem
            label="Previous Week"
            color={colors.previous}
            formatRevenue={formatRevenue}
            value={legendValues.previousWeek}
          />
        </div>
      </header>

      <div
        className="w-full flex-1"
        aria-label="Interactive revenue chart with data points"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 0, right: 24, bottom: 0, left: -20 }}
            accessibilityLayer
          >
            <defs>
              {/* Enhanced gradient for area fill */}
              <linearGradient
                id="revenue-gradient"
                x1="0"
                y1="0"
                x2="0.5"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={colors.previous}
                  stopOpacity={0.45}
                />
                <stop
                  offset="10%"
                  stopColor={colors.previous}
                  stopOpacity={0.25}
                />
                <stop
                  offset="50%"
                  stopColor={colors.previous}
                  stopOpacity={0.05}
                />
              </linearGradient>
              {/* Gradient for current week line */}
              <linearGradient
                id="current-line-gradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor={colors.current} stopOpacity={1} />
                <stop
                  offset="50%"
                  stopColor={colors.current}
                  stopOpacity={0.8}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeOpacity={0.05}
              stroke={colors.grid}
              strokeDasharray="3 0"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: colors.grid, strokeOpacity: 0.05 }}
              tickMargin={8}
              tick={{
                fontSize: 12,
                fontWeight: 400,
                fillOpacity: 0.4,
                fill: colors.axis,
                fontFamily: "Inter",
                textAnchor: "middle",
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              domain={[0, 30000000]}
              ticks={[0, 10000000, 20000000, 30000000]}
              tickFormatter={formatNumberToMillions}
              tick={{
                dy: -4,
                dx: -20,
                fontSize: 12,
                fontWeight: 400,
                fillOpacity: 0.4,
                fill: colors.axis,
                fontFamily: "Inter",
                textAnchor: "middle",
              }}
            />

            <RechartsTooltip
              cursor={{
                stroke: colors.grid,
                strokeWidth: 1,
                strokeOpacity: 0.05,
              }}
              formatter={tooltipFormatter}
              content={<ChartTooltip colors={colors} chartType="revenue" />}
            />

            {/* Area fill for visual enhancement */}
            <Area
              type="monotone"
              dataKey="previous"
              stroke="none"
              fill="url(#revenue-gradient)"
              isAnimationActive={true}
            />

            {/* Previous Week Line */}
            <Line
              type="natural"
              name="Previous Week"
              dataKey="previous"
              strokeLinecap="round"
              stroke={colors.previous}
              dot={false}
              strokeWidth={3}
              isAnimationActive={true}
            />

            {/* Current Week solid (Jan–Apr) */}
            <Line
              type="monotone"
              name="Current Week"
              dataKey="currentSolid"
              strokeLinecap="round"
              stroke="url(#current-line-gradient)"
              dot={false}
              strokeWidth={3.5}
              isAnimationActive={true}
            />

            {/* Current Week dotted forecast (Apr–Jun) */}
            <Line
              type="monotone"
              name="Current Week"
              dataKey="currentForecast"
              strokeLinecap="round"
              strokeDasharray="6 10"
              stroke="url(#current-line-gradient)"
              dot={false}
              strokeWidth={3.5}
              isAnimationActive={true}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
});

export { RevenueLineChart };
RevenueLineChart.displayName = "RevenueLineChart";
