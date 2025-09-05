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
import { useSidebar } from "@/hooks/use-sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Folder,
  Notebook,
  BookOpen,
  UsersThree,
  ChartPieSlice,
  ChatsTeardrop,
  IdentificationBadge,
  IdentificationCard,
  ShoppingCartSimple,
} from "phosphor-react";

const data = {
  user: {
    name: "ByeWind",
    avatar: "/byewind.svg",
  },
  dashboard: [
    {
      title: "Default",
      url: "/dashboard",
      icon: ChartPieSlice,
      isActive: true,
    },
    {
      title: "eCommerce",
      url: "#",
      icon: ShoppingCartSimple,
    },
    {
      title: "Projects",
      url: "#",
      icon: Folder,
    },
    {
      title: "Online Courses",
      url: "#",
      icon: BookOpen,
    },
  ],
  pages: [
    {
      title: "User Profile",
      url: "#",
      icon: IdentificationBadge,
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
      icon: IdentificationCard,
    },
    {
      title: "Corporate",
      url: "#",
      icon: UsersThree,
    },
    {
      title: "Blog",
      url: "#",
      icon: Notebook,
    },
    {
      title: "Social",
      url: "#",
      icon: ChatsTeardrop,
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

export function SidebarLeftPanel({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, state } = useSidebar();

  const isVisible = React.useMemo(() => {
    return state !== "collapsed" || isMobile;
  }, [state, isMobile]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader
        className={cn(isVisible ? "md:p-4 md:pt-5" : "items-center")}
      >
        <div
          className={cn(
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex cursor-pointer flex-wrap items-center gap-2 rounded-md",
            isVisible ? "p-1" : "rounded-full p-0"
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
        <NavDashboard items={data.dashboard} isMobile={isVisible} />
        <NavPages items={data.pages} isMobile={isVisible} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
