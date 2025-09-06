// Metric types
export const MetricChangeType = {
  INCREASE: "increase",
  DECREASE: "decrease",
} as const;

export type MetricChangeType =
  (typeof MetricChangeType)[keyof typeof MetricChangeType];

export const MetricTrend = {
  UP: "up",
  DOWN: "down",
  STABLE: "stable",
} as const;

export type MetricTrend = (typeof MetricTrend)[keyof typeof MetricTrend];

export interface MetricCard {
  id: string;
  title: string;
  description?: string;
  value: string | number;
  change: number;
  changeType: MetricChangeType;
  trend?: MetricTrend;
  color?: string;
}
