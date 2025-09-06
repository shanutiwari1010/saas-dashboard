import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import totalSalesData from "../data/total-sales";

const data = totalSalesData;

const total = data.reduce((sum, item) => sum + item.value, 0);
const directPercentage = ((data[0].value / total) * 100).toFixed(1);

export function TotalSalesChart() {
  return (
    <div className="w-80 rounded-2xl bg-gray-50 p-8 shadow-sm">
      <h2 className="mb-8 heading">
        Total Sales
      </h2>

      <div className="relative mb-8">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={8}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-lg bg-gray-800 px-4 py-2 text-lg font-medium text-white">
            {directPercentage}%
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-gray-700">{item.name}</span>
            </div>
            <span className="font-semibold text-gray-900">
              ${item.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
