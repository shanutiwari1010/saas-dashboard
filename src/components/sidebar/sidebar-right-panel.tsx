"use client";

import * as React from "react";
import { NavDashboard } from "@/components/sidebar/nav-dashboard";
import { NavPages } from "@/components/sidebar/nav-pages";
import {
  Sidebar,
  SidebarRail,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { NavFavorites } from "@/components/sidebar/nav-favorites";
import { cn } from "@/lib/utils";
import { useRightSidebar } from "@/hooks/use-right-sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const data = {
  user: {
    name: "ByeWind",
    avatar: "/byewind.svg",
  },
  dashboard: [
    {
      title: "Default",
      url: "/dashboard",
      icon: "/icons/pie-chart.svg",
      isActive: true,
    },
    {
      title: "eCommerce",
      url: "#",
      icon: "/icons/ecommerce.svg",
    },
    {
      title: "Projects",
      url: "#",
      icon: "/icons/projects.svg",
    },
    {
      title: "Online Courses",
      url: "#",
      icon: "/icons/online-courses.svg",
    },
  ],
  pages: [
    {
      title: "User Profile",
      url: "#",
      icon: "/icons/user-profile.svg",
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Projects",
          url: "#",
        },
        {
          title: "Campaigns",
          url: "#",
        },
        {
          title: "Documents",
          url: "#",
        },
        {
          title: "Followers",
          url: "#",
        },
      ],
    },
    {
      title: "Account",
      url: "#",
      icon: "/icons/account.svg",
    },
    {
      title: "Corporate",
      url: "#",
      icon: "/icons/corporate.svg",
    },
    {
      title: "Blog",
      url: "#",
      icon: "/icons/blog.svg",
    },
    {
      title: "Social",
      url: "#",
      icon: "/icons/social.svg",
    },
  ],
  favorites: [
    {
      title: "Inbox",
      url: "#",
      icon: "/icons/inbox.svg",
    },
    {
      title: "File Manager",
      url: "#",
      icon: "/icons/file-manager.svg",
    },
    {
      title: "Calendar",
      url: "#",
      icon: "/icons/calendar.svg",
    },
  ],
};

export function SidebarRightPanel({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { isOpen } = useRightSidebar();

  const isVisible = React.useMemo(() => {
    return isOpen;
  }, [isOpen]);

  return (
    <Sidebar side="right" collapsible="icon" {...props}>
      <SidebarHeader
        className={cn(isVisible ? "md:p-5 md:pb-4" : "items-center")}
      >
        <div
          className={cn(
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex cursor-pointer flex-wrap items-center gap-2 rounded-md",
            isVisible ? "p-2" : "rounded-full p-0"
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="flex items-center">
                <AvatarImage src={data.user.avatar} />
                <AvatarFallback>BY</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            {!isVisible && (
              <TooltipContent>
                <p>{data.user.name}</p>
              </TooltipContent>
            )}
          </Tooltip>
          <span
            className={cn(
              "truncate text-sm font-normal",
              isVisible ? "block" : "hidden"
            )}
          >
            {data.user.name}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites isMobile={isVisible} />
        {/* <NavDashboard items={data.dashboard} isMobile={isVisible} /> */}
        <NavPages items={data.pages} isMobile={isVisible} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
