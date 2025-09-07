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

// Specific metric card IDs for type safety
export const MetricCardIds = {
  CUSTOMERS: "customers",
  ORDERS: "orders",
  REVENUE: "revenue",
  GROWTH: "growth",
} as const;

export type MetricCardId = (typeof MetricCardIds)[keyof typeof MetricCardIds];

export interface MetricCard {
  id: MetricCardId;
  title: string;
  description?: string;
  value: string | number;
  change: number;
  changeType: MetricChangeType;
  trend?: MetricTrend;
  color?: string;
}
