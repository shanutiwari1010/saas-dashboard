import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import type {
  DashboardState,
  DashboardActions,
} from "@/modules/dashboard/types/dashboard";
import {
  REVENUE_LINE_DATA,
  REVENUE_BY_LOCATION_DATA,
} from "@/modules/dashboard/data/revenue";
import { DASHBOARD_METRICS } from "@/modules/dashboard/data/metrics";
import { TOP_SELLING_PRODUCTS } from "@/modules/dashboard/data/products";
import { PROJECTIONS_VS_ACTUALS_DATA } from "@/modules/dashboard/data/projections";

type DashboardStore = DashboardState & DashboardActions;

export const useDashboardStore = create<DashboardStore>()(
  subscribeWithSelector((set) => ({
    isLoading: false,
    error: null,
    data: {
      metrics: DASHBOARD_METRICS,
      revenueData: REVENUE_LINE_DATA,
      projectionData: PROJECTIONS_VS_ACTUALS_DATA,
      topSellingProducts: TOP_SELLING_PRODUCTS,
      revenueByLocation: REVENUE_BY_LOCATION_DATA,
      lastUpdated: new Date(),
    },
    selectedMetricId: null,
    lastRefreshTime: new Date(),

    setSelectedMetric: (metricId) => {
      set({ selectedMetricId: metricId });
    },

    clearError: () => {
      set({ error: null });
    },
  }))
);

export const useDashboardData = () => useDashboardStore((state) => state.data);

export const useSelectedMetric = () =>
  useDashboardStore((state) => state.selectedMetricId);
export const useDashboardLoading = () =>
  useDashboardStore((state) => state.isLoading);
export const useDashboardError = () =>
  useDashboardStore((state) => state.error);
export const useLastRefreshTime = () =>
  useDashboardStore((state) => state.lastRefreshTime);

export const useDashboardMetrics = () =>
  useDashboardStore((state) => state.data?.metrics || []);
export const useRevenueData = () =>
  useDashboardStore((state) => state.data?.revenueData || []);
export const useProjectionData = () =>
  useDashboardStore((state) => state.data?.projectionData || []);
export const useRevenueByLocation = () =>
  useDashboardStore((state) => state.data?.revenueByLocation || []);

// Action hooks
export const useDashboardActions = () =>
  useDashboardStore((state) => ({
    setSelectedMetric: state.setSelectedMetric,
    clearError: state.clearError,
  }));
