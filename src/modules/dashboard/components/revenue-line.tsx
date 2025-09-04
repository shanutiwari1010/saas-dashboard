"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
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

// Split "current" into solid (through Apr) and dotted forecast (May–Jun)
const data: Point[] = base.map((d, i) => ({
  ...d,
  currentSolid: i <= 3 ? d.current : null,
  currentForecast: i >= 4 ? d.current : null,
}));

// Color system (4 total):
// 1) Blue for previous week, 2) Black for current week, 3) Grid gray, 4) Background from theme
const BLUE = "#9BB9D4";
const BLACK = "#111827";
const GRID = "#E5E7EB";

const formatMillions = (v: number) => `${v}M`;

export default function RevenueLineChart() {
  return (
    <section className="bg-muted w-full rounded-2xl p-6 md:p-8">
      {/* Header + Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <h2 className="text-foreground text-lg leading-6 font-semibold">
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
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 8 }}
          >
            <defs>
              {/* Subtle blue area fill */}
              <linearGradient id="rev-blue-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={BLUE} stopOpacity={0.28} />
                <stop offset="100%" stopColor={BLUE} stopOpacity={0.04} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: GRID }}
              tickMargin={8}
            />
            <YAxis
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickFormatter={formatMillions}
              tickLine={false}
              axisLine={{ stroke: GRID }}
              width={40}
            />
            <RechartsTooltip
              cursor={{ stroke: GRID }}
              formatter={(value: number, name: string) => [`${value}M`, name]}
            />

            {/* Previous Week (blue area + line) */}
            <Area
              type="monotone"
              dataKey="previous"
              stroke={BLUE}
              strokeWidth={3}
              fill="url(#rev-blue-fill)"
              dot={false}
              activeDot={false}
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

            {/* Current Week dotted forecast (May–Jun) */}
            <Line
              type="monotone"
              dataKey="currentForecast"
              stroke={BLACK}
              strokeDasharray="4 6"
              strokeWidth={3.5}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
