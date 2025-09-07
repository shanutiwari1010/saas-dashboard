import { MetricChangeType } from "@/modules/dashboard/types/metrics";

// format number to millions with M suffix
export function formatNumberToMillions(value: number): string {
  return `${value / 1000000}M`;
}

// format number to thousands with K suffix
export function formatNumberToThousands(value: number): string {
  return `${value / 1000}K`;
}

// format metric change percentage with appropriate prefix
export function formatMetricChange(
  changeType: MetricChangeType,
  change: number
): string {
  const prefix = changeType === MetricChangeType.INCREASE ? "+" : "-";
  return `${prefix}${change}%`;
}
