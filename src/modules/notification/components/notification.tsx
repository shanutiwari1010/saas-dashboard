import { BugBeetle, Broadcast, Bell, UserPlus } from "phosphor-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { formatTimeAgo } from "@/modules/notification/utils/format";
import { NOTIFICATIONS_DATA } from "@/modules/notification/data/notifications";

const getTypeIcon = (type: string) => {
  switch (type) {
    case "bug_urgent":
    case "bug_reported":
    case "bug_fixed":
      return <BugBeetle className="h-4 w-4" />;
    case "user_registered":
    case "user_subscribed":
    case "user_followed":
      return <UserPlus className="h-4 w-4" />;
    case "system_maintenance":
    case "system_update":
    case "feature_release":
      return <Broadcast className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getIconBackgroundClass = (type: string) => {
  switch (type) {
    case "bug_urgent":
    case "bug_reported":
    case "bug_fixed":
    case "system_maintenance":
    case "system_update":
    case "feature_release":
      return "bg-dashboard-blue-light";
    case "user_registered":
    case "user_subscribed":
    case "user_followed":
    default:
      return "bg-dashboard-purple-light";
  }
};

export function Notifications() {
  return (
    <div className="flex h-full flex-col">
      <div>
        <h3 className="heading m-5 mb-2 px-1 py-2">Notifications</h3>

        <div className="mx-5">
          {NOTIFICATIONS_DATA.map((notification) => (
            <Card
              key={notification.id}
              className={cn(
                "rounded-none border-none bg-transparent shadow-none transition-all duration-200"
              )}
            >
              <CardContent className="p-2">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex flex-shrink-0 items-center justify-center rounded-md p-1 text-black",
                      getIconBackgroundClass(notification.type)
                    )}
                  >
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="max-w-48 min-w-0 flex-1 text-lg">
                    <p className="truncate overflow-hidden text-sm font-light text-ellipsis whitespace-nowrap">
                      {notification.title}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs font-light">
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
