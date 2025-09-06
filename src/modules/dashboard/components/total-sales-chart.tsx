import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { useTheme } from "@/hooks/use-theme";
import { TOTAL_SALES_DATA } from "@/modules/dashboard/data/sales";

export function TotalSalesChart() {
  const { theme } = useTheme();

  const [segmentHovered, setSegmentHovered] = useState<number | null>(null);

  const renderLabel = ({ cx, cy }: { cx: number; cy: number }) => {
    if (
      segmentHovered === null ||
      segmentHovered < 0 ||
      segmentHovered >= TOTAL_SALES_DATA.length
    )
      return null;

    const segment = TOTAL_SALES_DATA[segmentHovered];
    if (!segment) return null;

    return (
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={theme === "dark" ? "#FFFFFF" : "#000000"}
        className="text-sm font-semibold"
      >
        ${segment.value.toFixed(2)}
      </text>
    );
  };

  return (
    <div className="space-y-4 rounded-2xl bg-gray-50 p-6">
      <h2 className="heading">Total Sales</h2>

      <div className="relative">
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              dataKey="value"
              startAngle={90}
              endAngle={450}
              innerRadius={40}
              outerRadius={60}
              paddingAngle={4}
              cornerRadius={8}
              labelLine={false}
              label={renderLabel}
              data={TOTAL_SALES_DATA}
            >
              {TOTAL_SALES_DATA.map((entry, index) => (
                <Cell
                  key={entry.label}
                  fill={theme === "dark" ? entry.color.dark : entry.color.light}
                  fillOpacity={segmentHovered === index ? 0.8 : 1}
                  onMouseEnter={() => setSegmentHovered(index)}
                  onMouseLeave={() => setSegmentHovered(null)}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {segmentHovered !== null &&
          segmentHovered >= 0 &&
          segmentHovered < TOTAL_SALES_DATA.length && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-gray-800 px-2 py-1 text-xs font-normal text-white shadow-xl">
              ${TOTAL_SALES_DATA[segmentHovered].value.toFixed(2)}
            </div>
          )}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl">
        {TOTAL_SALES_DATA.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-xs leading-4 font-normal"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    theme === "dark" ? item.color.dark : item.color.light,
                }}
              />
              <span className="text-gray-700">{item.label}</span>
            </div>
            <span className="text-gray-900">${item.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
