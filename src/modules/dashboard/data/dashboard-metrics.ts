export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: "increase" | "decrease";
}

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "customers",
    title: "Customers",
    value: "3,781",
    change: 11.01,
    changeType: "increase",
  },
  {
    id: "orders",
    title: "Orders",
    value: "1,219",
    change: 0.03,
    changeType: "decrease",
  },
  {
    id: "revenue",
    title: "Revenue",
    value: "$695",
    change: 15.03,
    changeType: "increase",
  },
  {
    id: "growth",
    title: "Growth Rate",
    value: "30.1%",
    change: 6.08,
    changeType: "increase",
  },
];

export const getMetricById = (id: string): DashboardMetric | undefined => {
  return dashboardMetrics.find((metric) => metric.id === id);
};

export const getMetricsByType = (
  changeType: "increase" | "decrease"
): DashboardMetric[] => {
  return dashboardMetrics.filter((metric) => metric.changeType === changeType);
};
