import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import projectionsVsActualsRaw from "../data/projections-vs-actuals";

type Item = {
  month: string;
  actual: number;
  projected: number;
  projectedGap: number;
};

const raw = projectionsVsActualsRaw;

const data: Item[] = raw.map((d) => ({
  ...d,
  projectedGap: Math.max(d.projected - d.actual, 0),
}));

// Colors (exactly 5 total):
// 1) Primary brand: blue-300  2) Accent: blue-100
// 3) Neutral bg: white        4) Neutral text: slate-900
// 5) Neutral grid: gray-200
const COLORS = {
  actual: "#A8C5DA",
  projectedGap: "#A8C5DA",
  text: "#0F172A",
  grid: "#E5E7EB",
};

function formatMillionsTick(v: number) {
  if (v === 0) return "0";
  return `${v}M`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: Readonly<{
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number }>;
  label?: string;
}>) {
  if (!active || !payload || !payload.length) return null;
  const actual = payload.find((p) => p.dataKey === "actual")?.value ?? 0;
  const gap = payload.find((p) => p.dataKey === "projectedGap")?.value ?? 0;
  const projected = actual + gap;

  return (
    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
      <div className="font-medium text-gray-900">{label}</div>
      <div className="mt-1 flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-sm"
            style={{ backgroundColor: COLORS.actual }}
            aria-hidden
          />
          <span className="text-gray-600">Actual:</span>
          <span className="font-medium text-gray-900">{actual}M</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-sm"
            style={{ backgroundColor: COLORS.projectedGap }}
            aria-hidden
          />
          <span className="text-gray-600">Projected:</span>
          <span className="font-medium text-gray-900">{projected}M</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectionsVsActualsChart() {
  return (
    <div className="flex h-64 flex-1 flex-shrink-0 flex-grow basis-0 flex-col items-start gap-4 rounded-2xl bg-[var(--color-primary-blue)] p-6">
      <h2 className="heading ">
        Projections vs Actuals
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
        className="relative -left-1"
      >
        <BarChart data={data} barCategoryGap={32} margin={{ left: -30 }}>
          <CartesianGrid
            vertical={false}
            stroke={COLORS.grid}
            strokeDasharray="0"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
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
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            tickFormatter={formatMillionsTick}
            tick={{
              fill: "rgba(28, 28, 28, 0.40)",
              fontSize: 12,
              fontFamily: "Inter",
              fontWeight: 400,
              textAnchor: "middle",
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="actual"
            stackId="a"
            fill={COLORS.actual}
            radius={[0, 0, 0, 0]}
            barSize={20}
          />
          <Bar
            dataKey="projectedGap"
            stackId="a"
            fill={COLORS.projectedGap}
            radius={[4, 4, 0, 0]}
            barSize={20}
            fillOpacity={0.5}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProjectionsVsActualsChart;
