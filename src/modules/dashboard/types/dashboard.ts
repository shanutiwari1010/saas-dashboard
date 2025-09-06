import type {
  ProjectionDataPoint,
  RevenueLineDataPoint,
} from "@/modules/dashboard/types/charts";
import type { MetricCard } from "@/modules/dashboard/types/metrics";

// Chart data interfaces
export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface RevenueDataPoint extends TimeSeriesDataPoint {
  previous: number;
  current: number;
}

// Location and geography interfaces
export interface Location {
  id: string;
  name: string;
  country: string;
  region?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface RevenueByLocation extends Location {
  revenue: number;
  percentage: number;
  growthRate: number;
  orderCount: number;
  averageOrderValue: number;
}

// API response interfaces
export interface DashboardDataResponse {
  metrics: MetricCard[];
  revenueData: RevenueLineDataPoint[];
  projectionData: ProjectionDataPoint[];
  revenueByLocation: RevenueByLocation[];
  lastUpdated: Date;
}

// State interfaces
export interface DashboardState {
  isLoading: boolean;
  error: string | null;
  data: DashboardDataResponse | null;
  selectedMetricId: string | null;
  lastRefreshTime: Date | null;
}

// Action interfaces
export interface DashboardActions {
  setSelectedMetric: (metricId: string | null) => void;
  clearError: () => void;
}
