import { useMemo } from "react";

import { useSidebar } from "@/hooks/use-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRightSidebar } from "@/hooks/use-right-sidebar";

export function useResponsiveLayout() {
  const { isOpen: isRightSidebarOpen } = useRightSidebar();
  const { state: leftSidebarState } = useSidebar();
  const isMobile = useIsMobile();

  const layoutConfig = useMemo(() => {
    const isLeftSidebarCollapsed = leftSidebarState === "collapsed";

    // Calculate available width based on sidebar states
    const leftSidebarWidth = isLeftSidebarCollapsed ? 3 : 13.25; // rem
    const rightSidebarWidth = isRightSidebarOpen ? 20 : 0; // rem

    // Calculate available width for content
    const availableWidth = 100 - leftSidebarWidth - rightSidebarWidth;

    // Determine grid columns based on available width
    let gridCols: { top: number; bottom: number };

    if (isMobile) {
      // Mobile: always 1x1 grid
      gridCols = { top: 1, bottom: 1 };
    } else if (availableWidth >= 80) {
      // Very wide: 2x2 grid
      gridCols = { top: 2, bottom: 2 };
    } else if (availableWidth >= 60) {
      // Wide: 2x1 grid
      gridCols = { top: 2, bottom: 1 };
    } else if (availableWidth >= 40) {
      // Medium: 1x2 grid
      gridCols = { top: 1, bottom: 2 };
    } else {
      // Narrow: 1x1 grid
      gridCols = { top: 1, bottom: 1 };
    }

    return {
      isLeftSidebarCollapsed,
      isRightSidebarOpen,
      availableWidth,
      gridCols,
      containerClass: `grid-cols-${gridCols.top} lg:grid-cols-${gridCols.bottom}`,
    };
  }, [isRightSidebarOpen, leftSidebarState, isMobile]);

  return layoutConfig;
}
