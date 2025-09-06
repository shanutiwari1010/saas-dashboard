import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import { FAVORITES_DATA } from "@/data/favourites";
import { Collapsible } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";

interface NavFavoritesProps {
  isMobile?: boolean;
}

const NavFavorites: React.FunctionComponent<NavFavoritesProps> = () => {
  return (
    <SidebarGroup className="px-4 py-0 pb-3 group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        <Collapsible asChild className="group/collapsible">
          <Tabs
            defaultValue="favorites"
            className="flex max-w-54 flex-col items-start gap-1 self-stretch"
          >
            <TabsList className="flex flex-wrap content-center items-center gap-2 self-stretch text-center text-sm leading-5 font-normal">
              {FAVORITES_DATA.map((tab) => (
                <TabsTrigger
                  key={tab.key}
                  value={tab.key}
                  className="flex flex-wrap content-center items-center gap-2 self-stretch px-2 py-1 data-[state=active]:text-black/40 data-[state=inactive]:text-black/20 dark:data-[state=active]:text-gray-500 dark:data-[state=inactive]:text-gray-500"
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {FAVORITES_DATA.map((tab) => (
              <TabsContent key={tab.key} value={tab.key}>
                <ul className="flex list-inside list-disc flex-col gap-1 text-sm font-normal [&>li::marker]:text-black/20 dark:[&>li::marker]:text-gray-500">
                  {tab.data.map((item) => (
                    <li key={item.id} className="px-3 py-1">
                      <Link
                        to={item.url}
                        className="hover:text-sidebar-accent-foreground relative -left-1 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export { NavFavorites };
NavFavorites.displayName = "NavFavorites";
