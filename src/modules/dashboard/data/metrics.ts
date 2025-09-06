import {
  MetricTrend,
  MetricChangeType,
  type MetricCard,
} from "@/modules/dashboard/types/metrics";

export const DASHBOARD_METRICS: MetricCard[] = [
  {
    id: "customers",
    title: "Customers",
    value: "3,781",
    change: 11.01,
    changeType: MetricChangeType.INCREASE,
    trend: MetricTrend.UP,
    // color: DASHBOARD_CONSTANTS.METRIC_COLORS.CUSTOMERS,
    description: "Total number of active customers",
  },
  {
    id: "orders",
    title: "Orders",
    value: "1,219",
    change: 0.03,
    changeType: MetricChangeType.DECREASE,
    trend: MetricTrend.DOWN,
    // color: DASHBOARD_CONSTANTS.METRIC_COLORS.ORDERS,
    description: "Total number of orders placed",
  },
  {
    id: "revenue",
    title: "Revenue",
    value: "$695",
    change: 15.03,
    changeType: MetricChangeType.INCREASE,
    trend: MetricTrend.UP,
    // color: DASHBOARD_CONSTANTS.METRIC_COLORS.REVENUE,
    description: "Total revenue generated",
  },
  {
    id: "growth",
    title: "Growth Rate",
    value: "30.1%",
    change: 6.08,
    changeType: MetricChangeType.INCREASE,
    trend: MetricTrend.UP,
    // color: DASHBOARD_CONSTANTS.METRIC_COLORS.GROWTH,
    description: "Month-over-month growth rate",
  },
];
