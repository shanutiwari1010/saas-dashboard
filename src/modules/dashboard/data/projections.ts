import {
  ChartDataMonthType,
  type ProjectionDataPoint,
} from "@/modules/dashboard/types/charts";

export const PROJECTIONS_VS_ACTUALS_DATA: ProjectionDataPoint[] = [
  {
    month: ChartDataMonthType.JAN,
    actual: 17000000,
    projected: 22000000,
  },
  {
    month: ChartDataMonthType.FEB,
    actual: 21500000,
    projected: 26000000,
  },
  {
    month: ChartDataMonthType.MAR,
    actual: 18000000,
    projected: 23000000,
  },
  {
    month: ChartDataMonthType.APR,
    actual: 24000000,
    projected: 28000000,
  },
  {
    month: ChartDataMonthType.MAY,
    actual: 16000000,
    projected: 19000000,
  },
  {
    month: ChartDataMonthType.JUN,
    actual: 21000000,
    projected: 26000000,
  },
];
