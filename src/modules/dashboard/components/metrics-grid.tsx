import { MetricCard } from "@/modules/dashboard/components/metric-card";
import { useDashboardStore } from "@/modules/dashboard/store/use-dashboard-store";

const MetricsGrid: React.FunctionComponent = () => {
  const metrics = useDashboardStore((state) => state.data?.metrics);

  return (
    <div className="flex flex-wrap gap-7 md:grid md:grid-cols-2">
      {metrics?.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};

export { MetricsGrid };
MetricsGrid.displayName = "MetricsGrid";
