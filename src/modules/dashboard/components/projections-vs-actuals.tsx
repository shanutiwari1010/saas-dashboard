import { useMemo } from "react";
import {
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useTheme } from "@/hooks/use-theme";
import { formatNumberToMillions } from "@/modules/dashboard/utils/format";
import { PROJECTIONS_VS_ACTUALS_DATA } from "@/modules/dashboard/data/projections";
import { ChartTooltip } from "@/modules/dashboard/components/chart-wrappers/tooltip";

const ProjectionsVsActualsChart: React.FunctionComponent = () => {
  const { theme } = useTheme();

  const data = useMemo(() => {
    return PROJECTIONS_VS_ACTUALS_DATA.map((item) => ({
      ...item,
      projected: Math.max(item.projected - item.actual, 0),
    }));
  }, []);

  const colors = useMemo(() => {
    return {
      actual: "var(--color-dashboard-bars)",
      projected: "var(--color-dashboard-bars)",
      axis: theme === "dark" ? "var(--color-white)" : "var(--color-black)",
      grid: theme === "dark" ? "var(--color-white)" : "var(--color-black)",
    };
  }, [theme]);

  return (
    <div className="bg-dashboard-light flex h-64 flex-1 flex-shrink-0 flex-grow basis-0 flex-col items-start gap-4 rounded-2xl p-6">
      <h2 className="heading">Projections vs Actuals</h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
        className="relative -left-1"
      >
        <BarChart data={data} barCategoryGap={32} margin={{ left: -30 }}>
          <CartesianGrid
            vertical={false}
            strokeOpacity={0.05}
            strokeDasharray="0"
            stroke={colors.grid}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            tick={{
              fontSize: 12,
              fontWeight: 400,
              fillOpacity: 0.4,
              fill: colors.axis,
              textAnchor: "middle",
              fontFamily: "Inter",
            }}
          />
          <YAxis
            domain={[0, 30000000]}
            ticks={[0, 10000000, 20000000, 30000000]}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            tickFormatter={formatNumberToMillions}
            tick={{
              fontSize: 12,
              fontWeight: 400,
              fillOpacity: 0.4,
              fill: colors.axis,
              fontFamily: "Inter",
              textAnchor: "middle",
            }}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<ChartTooltip colors={colors} chartType="projections" />}
          />
          <Bar
            stackId="a"
            dataKey="actual"
            barSize={20}
            fill={colors.actual}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            stackId="a"
            dataKey="projected"
            barSize={20}
            fillOpacity={0.5}
            radius={[4, 4, 0, 0]}
            fill={colors.projected}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export { ProjectionsVsActualsChart };
ProjectionsVsActualsChart.displayName = "ProjectionsVsActualsChart";
