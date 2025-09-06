import { SidebarTrigger } from "@/components/ui/sidebar";
import { RightSidebarTrigger } from "@/components/ui/right-sidebar-trigger";
import { Button } from "@/components/ui/button";
import { ClockCounterClockwise, Star, Bell, Sidebar } from "phosphor-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Breadcrumbs } from "../breadcrumbs";

const SidebarHeader = () => {
  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between gap-2 border-b px-7 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Button variant="ghost" size="icon">
          <Star size={20} weight="duotone" className="size-10" />
        </Button>
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <RightSidebarTrigger variant="ghost" size="icon">
          <ClockCounterClockwise size={20} weight="duotone" />
        </RightSidebarTrigger>
        <RightSidebarTrigger variant="ghost" size="icon">
          <Bell size={20} weight="duotone" />
        </RightSidebarTrigger>
        <RightSidebarTrigger variant="ghost" size="icon">
          <Sidebar size={20} weight="duotone" />
        </RightSidebarTrigger>
      </div>
    </header>
  );
};

export default SidebarHeader;
