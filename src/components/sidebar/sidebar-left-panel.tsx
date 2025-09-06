import * as React from "react";

import { cn } from "@/lib/utils";
import { SIDEBAR_DATA } from "@/data/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarRail,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import { NavPages } from "@/components/sidebar/nav-pages";
import { NavDashboard } from "@/components/sidebar/nav-dashboard";
import { NavFavorites } from "@/components/sidebar/nav-favorites";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Memoize the user profile component to prevent unnecessary re-renders
const UserProfile = React.memo(({ isVisible }: { isVisible: boolean }) => (
  <div
    className={cn(
      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex cursor-pointer flex-wrap items-center gap-2 rounded-md",
      isVisible ? "p-1" : "rounded-full p-0"
    )}
  >
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar className="flex h-9 w-9 items-center">
          <AvatarImage src={SIDEBAR_DATA.user.avatar} />
          <AvatarFallback>BY</AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      {!isVisible && (
        <TooltipContent>
          <p>{SIDEBAR_DATA.user.name}</p>
        </TooltipContent>
      )}
    </Tooltip>
    <span
      className={cn(
        "truncate text-sm font-normal",
        isVisible ? "block" : "hidden"
      )}
    >
      {SIDEBAR_DATA.user.name}
    </span>
  </div>
));

UserProfile.displayName = "UserProfile";

export const SidebarLeftPanel = React.memo<
  React.ComponentProps<typeof Sidebar>
>(({ ...props }) => {
  const { isMobile, state } = useSidebar();

  const isVisible = React.useMemo(() => {
    return state !== "collapsed" || isMobile;
  }, [state, isMobile]);

  const headerClassName = React.useMemo(
    () => cn(isVisible ? "md:p-4 md:pt-5" : "items-center"),
    [isVisible]
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={headerClassName}>
        <UserProfile isVisible={isVisible} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites isMobile={isVisible} />
        <NavDashboard items={SIDEBAR_DATA.dashboard} isMobile={isVisible} />
        <NavPages items={SIDEBAR_DATA.pages} isMobile={isVisible} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
});

SidebarLeftPanel.displayName = "SidebarLeftPanel";
