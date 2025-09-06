"use client";

import * as React from "react";
import { useRightSidebar } from "@/hooks/use-right-sidebar";
import { Button } from "./button";

interface RightSidebarTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  asChild?: boolean;
}

const RightSidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  RightSidebarTriggerProps
>(({ className, onClick, ...props }, ref) => {
  const { toggle } = useRightSidebar();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      toggle();
    },
    [onClick, toggle]
  );

  return (
    <Button
      ref={ref}
      data-sidebar="right-trigger"
      className={className}
      type="button"
      aria-label="Toggle right sidebar"
      onClick={handleClick}
      {...props}
    />
  );
});

RightSidebarTrigger.displayName = "RightSidebarTrigger";

export { RightSidebarTrigger };
