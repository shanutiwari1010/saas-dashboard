import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Collapsible } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";

const FAVORITES_DATA = [
  {
    title: "Favorites",
    key: "favorites",
    data: [
      { id: 1, title: "Overview", url: "/overview" },
      { id: 2, title: "Projects", url: "/projects" },
    ],
  },
  {
    title: "Recently",
    key: "recently",
    data: [
      { id: 1, title: "Projects", url: "/projects" },
      { id: 2, title: "Overview", url: "/overview" },
    ],
  },
];

interface NavFavoritesProps {
  isMobile?: boolean;
}

const NavFavorites: React.FunctionComponent<NavFavoritesProps> = () => {
  return (
    <SidebarGroup className="px-5 group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        <Collapsible asChild className="group/collapsible">
          <Tabs
            defaultValue="favorites"
            className="flex max-w-54 flex-col items-start gap-1 self-stretch"
          >
            <TabsList className="flex flex-wrap content-center items-center gap-2 self-stretch text-center text-sm leading-5 font-normal text-black/40">
              {FAVORITES_DATA.map((tab) => (
                <TabsTrigger
                  key={tab.key}
                  value={tab.key}
                  className="flex flex-wrap content-center items-center gap-2 self-stretch px-2 data-[state=active]:text-black/40 data-[state=inactive]:text-black/20"
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {FAVORITES_DATA.map((tab) => (
              <TabsContent key={tab.key} value={tab.key}>
                <ul className="flex list-inside list-disc flex-col gap-1 pl-3 text-sm font-normal [&>li::marker]:text-black/20">
                  {tab.data.map((item) => (
                    <li key={item.id} className="py-1">
                      <a
                        href={item.url}
                        className="hover:text-sidebar-accent-foreground transition-colors"
                      >
                        {item.title}
                      </a>
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
