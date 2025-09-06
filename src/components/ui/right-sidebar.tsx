import * as React from "react";
import { useRightSidebar } from "@/hooks/use-right-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface RightSidebarProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  side?: "left" | "right";
}

const RightSidebar = React.forwardRef<HTMLDivElement, RightSidebarProps>(
  ({ children, className, ...props }, ref) => {
    const { isOpen, setIsOpen } = useRightSidebar();
    const isMobile = useIsMobile();

    // Handle escape key to close sidebar
    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
      }
    }, [isOpen, setIsOpen]);

    // Mobile behavior - use Sheet component
    if (isMobile) {
      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} {...props}>
          <SheetContent
            data-sidebar="right-sidebar"
            data-slot="right-sidebar"
            data-mobile="true"
            className="bg-background text-foreground w-80 p-0 [&>button]:hidden border-l"
            side="right"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Right Sidebar</SheetTitle>
              <SheetDescription>
                Displays the right sidebar content.
              </SheetDescription>
            </SheetHeader>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    // Desktop behavior - fixed positioned sidebar
    return (
      <div
        ref={ref}
        className={cn(
          "fixed top-0 right-0 z-40 h-full overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "w-full md:w-[17.5rem]" : "w-0",
          className
        )}
        {...props}
      >
        <div className="h-full w-full md:w-[17.5rem] bg-background border-l">
          {children}
        </div>
      </div>
    );
  }
);

RightSidebar.displayName = "RightSidebar";

export { RightSidebar };
