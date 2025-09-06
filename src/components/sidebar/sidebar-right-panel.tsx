import { RightSidebar } from "@/components/ui/right-sidebar";
import { ContactsLists } from "@/modules/history/components/contacts-lists";
import { Notifications } from "@/modules/notification/components/notification";
import { TimelineActivities } from "@/modules/history/components/timeline-activities";

export function SidebarRightPanel() {
  return (
    <RightSidebar className="bg-background border-l">
      <div className="flex h-full flex-col overflow-y-auto">
        <Notifications />
        <TimelineActivities />
        <ContactsLists />
      </div>
    </RightSidebar>
  );
}
