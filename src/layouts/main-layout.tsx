import { Outlet } from "react-router-dom";

import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RightSidebarProvider } from "@/providers/right-sidebar-provider";
import { SidebarLeftPanel } from "@/components/sidebar/sidebar-left-panel";
import { SidebarRightPanel } from "@/components/sidebar/sidebar-right-panel";

export function MainLayout() {
  return (
    <SidebarProvider>
      <RightSidebarProvider>
        <div className="flex h-screen w-full">
          <SidebarLeftPanel />
          <SidebarInset>
            <SidebarHeader />
            <Outlet />
          </SidebarInset>
          <SidebarRightPanel />
        </div>
      </RightSidebarProvider>
    </SidebarProvider>
  );
}
