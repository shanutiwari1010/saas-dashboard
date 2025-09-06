import * as React from "react";
import { RightSidebarContext } from "@/hooks/use-right-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface RightSidebarProviderProps {
  readonly children: React.ReactNode;
  readonly defaultOpen?: boolean;
}

export function RightSidebarProvider({
  children,
  defaultOpen = false,
}: RightSidebarProviderProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const isMobile = useIsMobile();

  const toggle = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Auto-close sidebar on mobile
  React.useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // Add keyboard shortcut (Shift + Ctrl/Cmd + B)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "b" &&
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey
      ) {
        event.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggle]);

  const contextValue = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      toggle,
    }),
    [isOpen, toggle]
  );

  return (
    <RightSidebarContext.Provider value={contextValue}>
      <div
        style={
          {
            "--right-sidebar-width": isOpen ? "17.5rem" : "0rem",
            "--right-sidebar-open": isOpen ? "1" : "0",
          } as React.CSSProperties
        }
        className="w-full"
      >
        {children}
      </div>
    </RightSidebarContext.Provider>
  );
}
