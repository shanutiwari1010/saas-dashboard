export const ChartType = {
  LINE: "line",
  BAR: "bar",
  PIE: "pie",
  AREA: "area",
} as const;

export type ChartType = (typeof ChartType)[keyof typeof ChartType];

export const ChartDataMonthType = {
  JAN: "Jan",
  FEB: "Feb",
  MAR: "Mar",
  APR: "Apr",
  MAY: "May",
  JUN: "Jun",
  JUL: "Jul",
  AUG: "Aug",
  SEP: "Sep",
  OCT: "Oct",
  NOV: "Nov",
  DEC: "Dec",
} as const;

export type ChartDataMonthType =
  (typeof ChartDataMonthType)[keyof typeof ChartDataMonthType];

export interface ProjectionDataPoint {
  month: ChartDataMonthType;
  actual: number;
  projected: number;
}

export interface RevenueLineDataPoint {
  month: ChartDataMonthType;
  previous: number;
  current: number;
  currentSolid?: number | null;
  currentForecast?: number | null;
}

export interface Location {
  id: string;
  name: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface RevenueByLocation extends Location {
  revenue: number;
  percentage: number;
  growthRate: number;
  color?: string;
  orderCount: number;
  averageOrderValue: number;
}
