"use client";

import {
  CartesianGrid,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  LineChart,
  ResponsiveContainer,
  Line,
} from "recharts";
import revenueLineBase from "../data/revenue-line";

type Point = {
  month: string;
  previous: number;
  current: number;
  currentSolid: number | null;
  currentForecast: number | null;
};

// Source-like demo data (units in millions)
const base: Array<Omit<Point, "currentSolid" | "currentForecast">> =
  revenueLineBase;

// Split "current" into solid (Jan–Apr) and dotted forecast (Apr–Jun)
const data: Point[] = base.map((d, i) => ({
  ...d,
  currentSolid: i <= 3 ? d.current : null,
  currentForecast: i >= 3 ? d.current : null,
}));

// Color system (4 total):
// 1) Blue for previous week, 2) Black for current week, 3) Grid gray, 4) Background from theme
const BLUE = "#9BB9D4";
const BLACK = "#111827";
const GRID = "#E5E7EB";

const formatMillions = (v: number) => `${v}M`;

export default function RevenueLineChart() {
  return (
    <section className="flex h-[19.875rem] flex-1 flex-shrink-0 flex-grow basis-0 flex-col items-start gap-4 rounded-2xl bg-[var(--color-primary-blue)] p-6">
      {/* Header + Legend */}
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="heading">
          Revenue
        </h2>
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
            domain={[0, 30]}
            ticks={[0, 10, 20, 30]}
            tickFormatter={formatMillions}
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
            formatter={(value: number, name: string) => [`${value}M`, name]}
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
