import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLeftPanel } from "./components/sidebar/sidebar-left-panel";
import { SidebarRightPanel } from "./components/sidebar/sidebar-right-panel";
import { RightSidebarProvider } from "@/components/ui/right-sidebar-provider";
import { DashboardContent } from "@/components/dashboard-content";

import SidebarHeader from "@/components/sidebar/sidebar-header";
import { ThemeProvider } from "@/providers/theme-provider";

export default function Page() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <SidebarProvider>
        <RightSidebarProvider>
          <div className="flex h-screen w-full">
            <SidebarLeftPanel />
            <SidebarInset>
              <SidebarHeader />
              <DashboardContent />
            </SidebarInset>
            <SidebarRightPanel />
          </div>
        </RightSidebarProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
