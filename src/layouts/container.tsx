import { OrderList } from "@/modules/dashboard/components/order-list";
import { MetricsGrid } from "@/modules/dashboard/components/metrics-grid";
import { RevenueLineChart } from "@/modules/dashboard/components/revenue-line";
import { TotalSalesChart } from "@/modules/dashboard/components/total-sales-chart";
import { TopSellingProducts } from "@/modules/dashboard/components/top-selling-products";
import { RevenueByLocation } from "@/modules/dashboard/components/revenue-by-location";
import { ProjectionsVsActualsChart } from "@/modules/dashboard/components/projections-vs-actuals";

export function DashboardContainer() {
  return (
    <div className="flex flex-col gap-4 p-7 font-semibold sm:gap-7">
      <h1 className="heading px-2 py-1">eCommerce</h1>
      <div className="flex flex-col gap-4 sm:gap-7">
        <div className="grid grid-cols-1 gap-4 sm:gap-7 xl:grid-cols-2">
          <MetricsGrid />
          <ProjectionsVsActualsChart />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-7 xl:grid-cols-4">
          <div className="xl:col-span-3">
            <RevenueLineChart />
          </div>
          <div className="col-span-1">
            <RevenueByLocation />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-7 xl:grid-cols-4">
          <div className="xl:col-span-3">
            <TopSellingProducts />
          </div>
          <TotalSalesChart />
        </div>

        <OrderList />
      </div>
    </div>
  );
}
