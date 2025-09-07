import {
  MetricTrend,
  MetricCardIds,
  MetricChangeType,
  type MetricCard,
} from "@/modules/dashboard/types/metrics";

export const DASHBOARD_METRICS: MetricCard[] = [
  {
    id: MetricCardIds.CUSTOMERS,
    title: "Customers",
    value: "3,781",
    change: 11.01,
    changeType: MetricChangeType.INCREASE,
    trend: MetricTrend.UP,
    description: "Total number of active customers",
  },
  {
    id: MetricCardIds.ORDERS,
    title: "Orders",
    value: "1,219",
    change: 0.03,
    changeType: MetricChangeType.DECREASE,
    trend: MetricTrend.DOWN,
    description: "Total number of orders placed",
  },
  {
    id: MetricCardIds.REVENUE,
    title: "Revenue",
    value: "$695",
    change: 15.03,
    changeType: MetricChangeType.INCREASE,
    trend: MetricTrend.UP,
    description: "Total revenue generated",
  },
  {
    id: MetricCardIds.GROWTH,
    title: "Growth Rate",
    value: "30.1%",
    change: 6.08,
    changeType: MetricChangeType.INCREASE,
    trend: MetricTrend.UP,
    description: "Month-over-month growth rate",
  },
] as const;
