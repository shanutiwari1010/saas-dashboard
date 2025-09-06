import {
  ChartDataMonthType,
  type RevenueByLocation,
  type RevenueLineDataPoint,
} from "@/modules/dashboard/types/charts";

export const REVENUE_BY_LOCATION_DATA: RevenueByLocation[] = [
  {
    id: "1",
    name: "New York",
    country: "USA",
    coordinates: { latitude: 40.7128, longitude: -74.006 },
    revenue: 72000, // 7.2M
    percentage: 35.2,
    growthRate: 12.3,
    orderCount: 1250,
    averageOrderValue: 5760.0,
  },
  {
    id: "2",
    name: "San Francisco",
    country: "USA",
    coordinates: { latitude: 37.7749, longitude: -122.4194 },
    revenue: 55000, // 5.5M
    percentage: 26.9,
    growthRate: 8.7,
    orderCount: 980,
    averageOrderValue: 5612.2,
  },
  {
    id: "3",
    name: "Sydney",
    country: "Australia",
    coordinates: { latitude: -33.8688, longitude: 151.2093 },
    revenue: 32000, // 3.2M
    percentage: 15.7,
    growthRate: 15.2,
    orderCount: 870,
    averageOrderValue: 3678.2,
  },
  {
    id: "4",
    name: "Singapore",
    country: "Singapore",
    coordinates: { latitude: 1.3521, longitude: 103.8198 },
    revenue: 46000, // 4.6M
    percentage: 22.5,
    growthRate: 22.1,
    orderCount: 760,
    averageOrderValue: 6052.6,
  },
];

export const REVENUE_LINE_DATA: RevenueLineDataPoint[] = [
  {
    month: ChartDataMonthType.JAN,
    current: 13000000,
    previous: 7000000,
  },
  {
    month: ChartDataMonthType.FEB,
    current: 10000000,
    previous: 19000000,
  },
  {
    month: ChartDataMonthType.MAR,
    current: 12000000,
    previous: 17000000,
  },
  {
    month: ChartDataMonthType.APR,
    current: 16000000,
    previous: 13000000,
  },
  {
    month: ChartDataMonthType.MAY,
    current: 20000000,
    previous: 12000000,
  },
  {
    month: ChartDataMonthType.JUN,
    current: 18000000,
    previous: 23000000,
  },
];
