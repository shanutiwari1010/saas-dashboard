"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarGroup,
  SidebarMenuSub,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { IconProps } from "phosphor-react";

interface NavPagesProps {
  items: Array<{
    title: string;
    url: string;
    icon: React.ForwardRefExoticComponent<IconProps>;
    items?: Array<{ title: string; url: string }>;
  }>;
  isMobile?: boolean;
}

const NavPages: React.FunctionComponent<NavPagesProps> = ({
  items,
  isMobile,
}) => {
  return (
    <SidebarGroup className={cn(isMobile && "px-4 pt-0 pb-3")}>
      <SidebarGroupLabel className="px-3 py-1 text-sm font-normal">
        Pages
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild className="group/collapsible">
            <SidebarMenuItem className="text-sm font-normal">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn(isMobile && "py-1", "relative overflow-hidden")}
                >
                  {isMobile && (
                    <ChevronRight className="ml-1 text-black/20 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 dark:text-gray-500" />
                  )}
                  <item.icon size={20} weight="duotone" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export { NavPages };
NavPages.displayName = "NavPages";
