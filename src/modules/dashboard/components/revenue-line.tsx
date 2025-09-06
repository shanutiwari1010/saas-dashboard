import { useMemo } from "react";
import {
  Line,
  XAxis,
  YAxis,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

import { useTheme } from "@/hooks/use-theme";
import { REVENUE_LINE_DATA } from "@/modules/dashboard/data/revenue";
import { formatNumberToMillions } from "@/modules/dashboard/utils/format";

// Color system (4 total):
// 1) Blue for previous week, 2) Black for current week, 3) Grid gray, 4) Background from theme
const BLUE = "#9BB9D4";
const BLACK = "#111827";
const GRID = "#E5E7EB";

const CustomTooltip = ({ active, payload, label }: any) => {
  const { theme } = useTheme();
  if (active && payload && payload.length) {
    // Filter out null values and combine current week data
    const filteredPayload = payload.filter(
      (entry: any) => entry.value !== null
    );

    // Group by name to avoid duplicates
    const groupedData = filteredPayload.reduce((acc: any, entry: any) => {
      if (entry.name === "Current Week") {
        if (!acc["Current Week"]) {
          acc["Current Week"] = entry;
        }
      } else {
        acc[entry.name] = entry;
      }
      return acc;
    }, {});

    return (
      <div
        className={`rounded-lg border border-black/10 px-3 py-2 shadow-[#A7C4D9] ${
          theme === "dark"
            ? "border-white/20 bg-[#191919] text-white"
            : "bg-white text-black"
        }`}
      >
        {Object.values(groupedData).map((entry, index: number) => (
          <div
            key={index}
            className="flex items-center gap-1 p-1 text-xs"
            style={{ color: theme === "dark" ? "white" : "black" }}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            {entry.name}:{" "}
            <span className="font-thin">${entry.value?.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueLineChart() {
  const data = useMemo(() => {
    // Split "current" into solid (Jan–Apr) and dotted forecast (Apr–Jun)
    return REVENUE_LINE_DATA.map((d, i) => ({
      ...d,
      currentSolid: i <= 3 ? d.current : null,
      currentForecast: i >= 3 ? d.current : null,
    }));
  }, []);

  return (
    <section className="flex h-[19.875rem] w-full flex-1 flex-shrink-0 flex-grow basis-0 flex-col items-start gap-4 rounded-2xl bg-[var(--color-primary-blue)] p-6">
      {/* Header + Legend */}
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="heading">Revenue</h2>
        <div className="bg-border h-5 w-px" aria-hidden />
        <div className="text-muted-foreground flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: BLACK }}
              aria-hidden
            />
            <span>
              Current Week{" "}
              <span className="text-foreground font-semibold">$58,211</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: BLUE }}
              aria-hidden
            />
            <span>
              Previous Week{" "}
              <span className="text-foreground font-semibold">$68,768</span>
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer
        width="100%"
        height="100%"
        // className="relative -left-3.5"
      >
        <LineChart
          data={data}
          margin={{ top: 0, right: 24, bottom: 0, left: -20 }}
        >
          <defs>
            {/* Subtle blue area fill  */}
            <linearGradient id="rev-blue-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BLUE} stopOpacity={0.28} />
              <stop offset="100%" stopColor={BLUE} stopOpacity={0.04} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke={GRID} vertical={false} strokeDasharray="3 0" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={{ stroke: GRID }}
            tickMargin={8}
            tick={{
              fill: "rgba(28, 28, 28, 0.40)",
              fontSize: 12,
              fontFamily: "Inter",
              fontWeight: 400,
              textAnchor: "middle",
            }}
          />
          <YAxis
            domain={[0, 30000000]}
            ticks={[0, 10000000, 20000000, 30000000]}
            tickFormatter={formatNumberToMillions}
            tickLine={false}
            axisLine={false}
            tick={{
              dy: -4,
              dx: -20,
              fill: "rgba(28, 28, 28, 0.40)",
              fontSize: 12,
              fontFamily: "Inter",
              fontWeight: 400,
              textAnchor: "middle",
            }}
          />
          <RechartsTooltip
            cursor={{ stroke: GRID }}
            formatter={(value: number, name: string) => [
              formatNumberToMillions(value),
              name,
            ]}
            content={<CustomTooltip />}
          />

          <Line
            type="natural"
            dataKey="previous"
            stroke="#A8C5DA"
            strokeWidth={3}
            dot={false}
            name="Previous Week"
          />

          {/* Current Week solid (Jan–Apr) */}
          <Line
            type="monotone"
            dataKey="currentSolid"
            stroke={BLACK}
            strokeWidth={3.5}
            dot={false}
            isAnimationActive={false}
          />

          {/* Current Week dotted forecast (Apr–Jun) */}
          <Line
            type="monotone"
            dataKey="currentForecast"
            stroke={BLACK}
            strokeDasharray="6 10"
            strokeWidth={3.5}
            dot={false}
            strokeLinecap="round"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
