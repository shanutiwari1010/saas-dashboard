"use client";

import * as React from "react";
import { NavDashboard } from "@/components/sidebar/nav-dashboard";
import { NavPages } from "@/components/sidebar/nav-pages";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { NavFavorites } from "@/components/sidebar/nav-favorites";

// This is sample data.
const data = {
  user: {
    name: "ByeWind",
    avatar: "/byeWind.svg",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Avatar className="flex h-9 w-9 items-center rounded-lg">
            <AvatarImage
              src={data.user.avatar}
              alt={data.user.name}
              className="h-8 w-8 rounded-lg"
            />
            <AvatarFallback className="rounded-lg">Img</AvatarFallback>
          </Avatar>
          <span className="truncate font-medium">{data.user.name}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites />
        <NavDashboard items={data.dashboard} />
        <NavPages items={data.pages} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
