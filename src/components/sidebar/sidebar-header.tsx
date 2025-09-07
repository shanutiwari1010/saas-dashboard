import { Search, X, Command } from "lucide-react";
import { ClockCounterClockwise, Star, Bell, Sidebar } from "phosphor-react";
import { useState, useCallback, useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { RightSidebarTrigger } from "@/components/ui/right-sidebar-trigger";

export const SidebarHeader = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    searchInputRef.current?.focus();
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between gap-2 border-b px-7 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Button variant="ghost" size="icon">
          <Star size={20} weight="duotone" className="size-10" />
        </Button>
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-2">
        <div className="relative px-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            ref={searchInputRef}
            value={searchTerm}
            placeholder="Search..."
            onChange={handleSearchChange}
            className="text-foreground placeholder:text-muted-foreground focus:bg-background focus:ring-ring w-52 bg-black/5 pr-20 pl-8 font-normal shadow-none focus:ring-1 dark:bg-white/5"
          />
          <div className="absolute top-1/2 right-3 flex -translate-y-1/2 transform items-center gap-1">
            {searchTerm ? (
              <Button
                size="icon"
                variant="ghost"
                onClick={clearSearch}
                className="text-muted-foreground hover:text-foreground h-5 w-5 rounded-full [&_svg]:size-3"
              >
                <X className="h-3 w-3" />
              </Button>
            ) : (
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <Command className="h-3 w-3" />
                <span>/</span>
              </div>
            )}
          </div>
        </div>
        <ModeToggle />
        <RightSidebarTrigger variant="ghost" size="icon">
          <ClockCounterClockwise size={20} weight="duotone" />
        </RightSidebarTrigger>
        <RightSidebarTrigger variant="ghost" size="icon">
          <Bell size={20} weight="duotone" />
        </RightSidebarTrigger>
        <RightSidebarTrigger variant="ghost" size="icon">
          <Sidebar size={20} weight="duotone" />
        </RightSidebarTrigger>
      </div>
    </header>
  );
};
