import {
  Folder,
  Notebook,
  BookOpen,
  UsersThree,
  ChartPieSlice,
  ChatsTeardrop,
  IdentificationCard,
  ShoppingCartSimple,
  IdentificationBadge,
} from "phosphor-react";

import type { SidebarData } from "@/types/sidebar";

export const SIDEBAR_DATA: SidebarData = {
  user: {
    name: "ByeWind",
    avatar: "/icons/byewind.svg",
  },
  dashboard: [
    {
      title: "Default",
      url: "/",
      icon: ChartPieSlice,
      isActive: true,
    },
    {
      title: "eCommerce",
      url: "/ecommerce",
      icon: ShoppingCartSimple,
      items: [
        { title: "Orders", url: "/ecommerce/orders" },
        { title: "Customers", url: "/ecommerce/customers" },
      ],
    },
    {
      title: "Projects",
      url: "/projects",
      icon: Folder,
      items: [
        { title: "All Projects", url: "/projects/all" },
        { title: "Active", url: "/projects/active" },
        { title: "Completed", url: "/projects/completed" },
        { title: "Archived", url: "/projects/archived" },
      ],
    },
    {
      title: "Online Courses",
      url: "/courses",
      icon: BookOpen,
      items: [
        { title: "My Courses", url: "/courses/my-courses" },
        { title: "Progress", url: "/courses/progress" },
        { title: "Certificates", url: "/courses/certificates" },
      ],
    },
  ],
  pages: [
    {
      title: "User Profile",
      url: "/profile",
      icon: IdentificationBadge,
      items: [
        {
          title: "Overview",
          url: "/profile/overview",
        },
        {
          title: "Projects",
          url: "/profile/projects",
        },
        {
          title: "Campaigns",
          url: "/profile/campaigns",
        },
        {
          title: "Documents",
          url: "/profile/documents",
        },
        {
          title: "Followers",
          url: "/profile/followers",
        },
      ],
    },
    {
      title: "Account",
      url: "/account",
      icon: IdentificationCard,
      items: [
        {
          title: "Subscription",
          url: "/account/subscription",
        },
        {
          title: "Usage",
          url: "/account/usage",
        },
      ],
    },
    {
      title: "Corporate",
      url: "/corporate",
      icon: UsersThree,
      items: [
        {
          title: "Team",
          url: "/corporate/team",
        },

        {
          title: "Roles",
          url: "/corporate/roles",
        },

        {
          title: "Organization",
          url: "/corporate/organization",
        },
      ],
    },
    {
      title: "Blog",
      url: "/blog",
      icon: Notebook,
      items: [
        {
          title: "All Posts",
          url: "/blog/posts",
        },
        {
          title: "Drafts",
          url: "/blog/drafts",
        },
        {
          title: "Categories",
          url: "/blog/categories",
        },
      ],
    },
    {
      title: "Social",
      url: "/social",
      icon: ChatsTeardrop,
      items: [
        {
          title: "Feed",
          url: "/social/feed",
        },
        {
          title: "Messages",
          url: "/social/messages",
        },
        {
          title: "Notifications",
          url: "/social/notifications",
        },
      ],
    },
  ],
} as const;
