import { MetricCard } from "@/modules/dashboard/components/metric-card";
import { useDashboardStore } from "@/modules/dashboard/store/use-dashboard-store";

export const MetricsGrid = () => {
  const metrics = useDashboardStore((state) => state.data?.metrics);

  return (
    <div className="flex flex-wrap gap-7 md:grid md:grid-cols-2">
      {metrics?.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};
