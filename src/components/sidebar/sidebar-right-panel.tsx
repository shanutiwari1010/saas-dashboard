import React from "react";
import { RightSidebar } from "@/components/ui/right-sidebar";
import { ContactsLists } from "@/modules/history/components/contacts-lists";
import { Notifications } from "@/modules/notification/components/notification";
import { TimelineActivities } from "@/modules/history/components/timeline-activities";
import type { Sidebar } from "@/components/ui/sidebar";

export const SidebarRightPanel = React.memo<
  React.ComponentProps<typeof Sidebar>
>(({ ...props }) => {
  return (
    <RightSidebar className="bg-background border-l" {...props}>
      <div className="flex h-full flex-col overflow-y-auto">
        <Notifications />
        <TimelineActivities />
        <ContactsLists />
      </div>
    </RightSidebar>
  );
});
