import React from "react";
import {
  useTimeAgo,
  useFilteredNotifications,
  useNotificationActions,
} from "../index";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Check, Archive, Trash2 } from "lucide-react";

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-500";
    case "high":
      return "bg-orange-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "bug_reported":
    case "bug_fixed":
    case "bug_urgent":
      return "🐛";
    case "user_registered":
    case "user_subscribed":
    case "user_followed":
      return "👤";
    case "system_maintenance":
    case "system_update":
    case "feature_release":
      return "⚙️";
    default:
      return "📢";
  }
};

export const NotificationList: React.FC = () => {
  const { calculateTimeAgo, formatExactTime } = useTimeAgo();
  const notifications = useFilteredNotifications();
  const { markAsRead, markAsArchived, deleteNotification } =
    useNotificationActions();

  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="text-muted-foreground p-6 text-center">
          <Bell className="mx-auto mb-4 h-12 w-12 opacity-50" />
          <p>No notifications to display</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`transition-all duration-200 hover:shadow-md ${
            !notification.isRead
              ? "border-l-4 border-l-blue-500 bg-blue-50/50"
              : ""
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {getTypeIcon(notification.type)}
                </span>
                <div className="flex-1">
                  <CardTitle className="text-base font-medium">
                    {notification.title}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {notification.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`${getPriorityColor(notification.priority)} text-white`}
                >
                  {notification.priority}
                </Badge>
                {!notification.isRead && (
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <span>{calculateTimeAgo(notification.timestamp)}</span>
                <span>•</span>
                <span>{formatExactTime(notification.timestamp)}</span>
              </div>

              <div className="flex items-center gap-2">
                {!notification.isRead && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsArchived(notification.id)}
                  className="h-8 w-8 p-0"
                >
                  <Archive className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNotification(notification.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* User-specific info for user notifications */}
            {"userName" in notification && notification.userName && (
              <div className="mt-3 flex items-center gap-2 border-t pt-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={notification.userAvatar}
                    alt={notification.userName}
                  />
                  <AvatarFallback>
                    {notification.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-sm">
                  {notification.userName}
                </span>
              </div>
            )}

            {/* Bug-specific info for bug notifications */}
            {"bugId" in notification && notification.bugId && (
              <div className="mt-3 flex items-center gap-2 border-t pt-3">
                <Badge variant="outline" className="text-xs">
                  {notification.bugId}
                </Badge>
                {notification.projectName && (
                  <Badge variant="outline" className="text-xs">
                    {notification.projectName}
                  </Badge>
                )}
              </div>
            )}

            {/* Action buttons for system notifications */}
            {"actionUrl" in notification && notification.actionUrl && (
              <div className="mt-3 border-t pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(notification.actionUrl, "_blank")}
                >
                  {notification.actionText || "View Details"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
