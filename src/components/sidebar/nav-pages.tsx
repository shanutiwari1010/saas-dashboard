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

interface NavPagesProps {
  items: Array<{
    title: string;
    url: string;
    icon: string;
    items?: Array<{ title: string; url: string }>;
  }>;
  isMobile?: boolean;
}

const NavPages: React.FunctionComponent<NavPagesProps> = ({
  items,
  isMobile,
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Pages</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            // defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="relative overflow-hidden"
                >
                  {isMobile && (
                    <ChevronRight className="ml-1 text-black/20 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                  <img
                    src={item.icon}
                    alt={item.title}
                    aria-label="Brand Logo"
                  />
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
