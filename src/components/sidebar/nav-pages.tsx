

import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";

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
  const location = useLocation();

  const itemsWithChildren = useMemo(() => 
    items.filter(item => item.items && item.items.length > 0), 
    [items]
  );

  const itemsWithoutChildren = useMemo(() => 
    items.filter(item => !item.items || item.items.length === 0), 
    [items]
  );

  return (
    <SidebarGroup className={cn(isMobile && "px-4 pt-0 pb-3")}>
      <SidebarGroupLabel className="px-3 py-1 text-sm font-normal">
        Pages
      </SidebarGroupLabel>
      <SidebarMenu>
        {/* Items with children - Collapsible menus */}
        {itemsWithChildren.map((item) => {
          const hasActiveChild = item.items?.some(subItem => location.pathname === subItem.url);
          
          return (
            <Collapsible key={item.title} asChild className="group/collapsible">
              <SidebarMenuItem className="text-sm font-normal">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      isMobile && "py-1", 
                      "relative overflow-hidden",
                      hasActiveChild && "!bg-transparent !text-foreground"
                    )}
                    isActive={false}
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
                    {item.items?.map((subItem) => {
                      const isActive = location.pathname === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton 
                            asChild 
                            isActive={isActive}
                            className={cn(
                              isActive && "before:h-4 before:w-1 before:bg-primary before:rounded-r-md before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2"
                            )}
                          >
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}

        {/* Items without children - Simple buttons with routing */}
        {itemsWithoutChildren.map((item) => {
          const isActive = location.pathname === item.url;
          
          return (
            <SidebarMenuItem key={item.title} className="text-sm font-normal">
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  isMobile && "py-1",
                  "relative overflow-hidden",
                  isActive && "before:h-4 before:w-1 before:bg-primary before:rounded-r-md before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2"
                )}
                isActive={isActive}
              >
                <Link to={item.url}>
                  <item.icon size={20} weight="duotone" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export { NavPages };
NavPages.displayName = "NavPages";
