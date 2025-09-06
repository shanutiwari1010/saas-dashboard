"use client";

import { useResponsiveLayout } from "@/hooks/use-responsive-layout";
import { SectionCards } from "@/modules/dashboard/components/section-cards";
import { ProjectionsVsActualsChart } from "@/modules/dashboard/components/projections-vs-actuals";
import RevenueLineChart from "@/modules/dashboard/components/revenue-line";
import RevenueByLocation from "@/modules/dashboard/components/revenue-by-location";
import TopSellingProducts from "@/modules/dashboard/components/top-selling-products";
import { TotalSalesChart } from "@/modules/dashboard/components/total-sales-chart";
import { cn } from "@/lib/utils";
import OrderList from "@/modules/dashboard/components/order-list";

export function DashboardContent() {
  const { gridCols } = useResponsiveLayout();

  return (
    <div className="flex flex-col gap-4 p-7 sm:gap-7">
      <h1 className="px-2 py-1 heading">
        eCommerce
      </h1>
      <div className="flex flex-wrap gap-4 sm:gap-7">
        {/* Top row - SectionCards and ProjectionsVsActualsChart */}
        <div
          className={cn(
            "grid w-full gap-4 transition-all duration-300 sm:gap-7",
            gridCols.top === 2 ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1"
          )}
        >
          <SectionCards />
          <ProjectionsVsActualsChart />
        </div>

        {/* Bottom row - RevenueLineChart, RevenueByLocation, TopSellingProducts, TotalSalesChart */}
        <div
          className={cn(
            "flex flex-wrap gap-4 transition-all duration-300 sm:gap-7"
          )}
        >
          <RevenueLineChart />
          <RevenueByLocation />
          <TopSellingProducts />
          <TotalSalesChart />
          <OrderList/>
        </div>
      </div>
    </div>
  );
}
