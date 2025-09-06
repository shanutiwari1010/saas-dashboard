import type { IconProps } from "phosphor-react";

export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<IconProps>;
  isActive?: boolean;
  items?: Array<{ title: string; url: string }>;
}

export interface SidebarData {
  user: {
    name: string;
    avatar: string;
  };
  dashboard: SidebarItem[];
  pages: SidebarItem[];
}
