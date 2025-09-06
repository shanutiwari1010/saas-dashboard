import * as React from "react";
import { NavDashboard } from "@/components/sidebar/nav-dashboard";
import { NavPages } from "@/components/sidebar/nav-pages";
import {
  Sidebar,
  SidebarRail,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import type { IconProps } from "phosphor-react";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<IconProps>;
  isActive?: boolean;
  items?: Array<{ title: string; url: string }>;
}

interface SidebarData {
  user: {
    name: string;
    avatar: string;
  };
  dashboard: SidebarItem[];
  pages: SidebarItem[];
  favorites: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
}

const SIDEBAR_DATA: SidebarData = {
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
} as const;

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
