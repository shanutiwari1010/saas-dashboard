import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLeftPanel } from "./components/sidebar/sidebar-left-panel";

import { SectionCards } from "@/modules/dashboard/components/section-cards";
import { ProjectionsVsActualsChart } from "./modules/dashboard/components/projections-vs-actuals";
import RevenueLineChart from "@/modules/dashboard/components/revenue-line";
import RevenueByLocation from "@/modules/dashboard/components/revenue-by-location";
import TopSellingProducts from "@/modules/dashboard/components/top-selling-products";
import { TotalSalesChart } from "@/modules/dashboard/components/total-sales-chart";
import SidebarHeader from "@/components/sidebar/sidebar-header";
import { ThemeProvider } from "@/providers/theme-provider";

export default function Page() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <SidebarProvider>
        <SidebarLeftPanel />
        <SidebarInset>
          <SidebarHeader />
          <div className="flex flex-col gap-4 p-7 sm:gap-7">
            <h1 className="px-2 py-1 text-sm leading-5 font-semibold text-black dark:text-white/10">
              eCommerce
            </h1>
            <div className="flex flex-wrap gap-4 sm:gap-7">
              <div className="grid grid-cols-1 gap-4 sm:gap-7 xl:grid-cols-2">
                <SectionCards />
                <ProjectionsVsActualsChart />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 sm:gap-7 lg:grid-cols-2">
                <RevenueLineChart />
                <RevenueByLocation />
                <TopSellingProducts />
                <TotalSalesChart />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
