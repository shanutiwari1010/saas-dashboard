import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarLeftPanel } from "./components/sidebar/sidebar-left-panel";

import { SectionCards } from "./modules/dashboard/components/section-cards";
import { ProjectionsVsActualsChart } from "./modules/dashboard/components/projections-vs-actuals";
import RevenueLineChart from "./modules/dashboard/components/revenue-line";
import RevenueByLocation from "./modules/dashboard/components/revenue-by-location";
import TopSellingProducts from "./modules/dashboard/components/top-selling-products";
import { TotalSalesChart } from "./modules/dashboard/components/total-sales-chart";

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarLeftPanel />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col gap-4 p-4 pt-0">
          <h1
            className="text-sm leading-5 font-semibold text-[#1C1C1C]"
            style={{ fontFeatureSettings: "'ss01' on, 'cv01' on, 'cv11' on" }}
          >
            eCommerce
          </h1>
          <div className="flex flex-wrap gap-4">
            <SectionCards />
            <ProjectionsVsActualsChart />
            <RevenueLineChart />
            <RevenueByLocation />
            <TopSellingProducts />
            <TotalSalesChart />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
