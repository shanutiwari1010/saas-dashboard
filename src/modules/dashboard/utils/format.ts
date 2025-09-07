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

// Helper function to parse date strings for sorting
export const parseDateString = (dateStr: string): number => {
  const now = new Date();
  const lowerDateStr = dateStr.toLowerCase();

  if (lowerDateStr.includes("just now")) return now.getTime();
  if (lowerDateStr.includes("minute ago")) return now.getTime() - 60000;
  if (lowerDateStr.includes("hour ago")) return now.getTime() - 3600000;
  if (lowerDateStr.includes("yesterday")) return now.getTime() - 86400000;
  if (lowerDateStr.includes("day ago")) return now.getTime() - 86400000;
  if (lowerDateStr.includes("week ago")) return now.getTime() - 604800000;
  if (lowerDateStr.includes("days ago")) {
    const match = /\d+/.exec(lowerDateStr);
    const days = parseInt(match?.[0] || "0");
    return now.getTime() - days * 86400000;
  }
  if (lowerDateStr.includes("weeks ago")) {
    const match = /\d+/.exec(lowerDateStr);
    const weeks = parseInt(match?.[0] || "0");
    return now.getTime() - weeks * 604800000;
  }

  // Try to parse as a regular date
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
};
