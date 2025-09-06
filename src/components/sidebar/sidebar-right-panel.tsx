import { RightSidebar } from "@/components/ui/right-sidebar";

import { Notifications } from "@/modules/notification/components/notification";
import { TimelineActivities } from "@/modules/history/components/timeline-activities";
import { ContactsLists } from "@/modules/history/components/contacts-lists";

export function SidebarRightPanel() {
  return (
    <RightSidebar className="bg-background border-l">
      <div className="flex h-full flex-col">
       
          <Notifications />
          <TimelineActivities />
          <ContactsLists />
       
      </div>
    </RightSidebar>
  );
}
