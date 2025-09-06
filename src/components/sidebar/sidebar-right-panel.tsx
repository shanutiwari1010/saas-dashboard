"use client";

import { RightSidebar } from "@/components/ui/right-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import {
  BugBeetle,
  Broadcast,
  Bell,
  Clock,
  Check,
  Trash,
  UserPlus,
  Star,
} from "phosphor-react";

// Mock data for notifications
const notifications = [
  {
    id: 1,
    title: "You have a bug that needs to be fixed",
    message: "Critical bug reported in the payment system",
    timestamp: new Date(),
    priority: "urgent",
    type: "bug_urgent",
    isRead: false,
    bugId: "BUG-001",
    projectName: "Payment System",
  },
  {
    id: 2,
    title: "New user registered",
    message: "A new user has joined the platform",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    priority: "medium",
    type: "user_registered",
    isRead: true,
    userName: "John Doe",
    userAvatar: "/avatars/john-doe.svg",
  },
  {
    id: 3,
    title: "System maintenance scheduled",
    message: "Scheduled maintenance for tonight at 2 AM",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    priority: "high",
    type: "system_maintenance",
    isRead: false,
    actionUrl: "#",
    actionText: "View Details",
  },
  {
    id: 4,
    title: "Andi Lane subscribed to you",
    message: "Andi Lane has subscribed to your updates",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    priority: "low",
    type: "user_subscribed",
    isRead: true,
    userName: "Andi Lane",
    userAvatar: "/avatars/andi-lane.svg",
  },
];

// Mock data for activities
const activities = [
  {
    id: 1,
    title: "You have a bug that needs to be fixed",
    timestamp: new Date(),
    type: "bug",
    user: { name: "System", avatar: "/avatars/system.svg" },
  },
  {
    id: 2,
    title: "Released a new version",
    timestamp: new Date(Date.now() - 1000 * 60 * 59), // 59 minutes ago
    type: "release",
    user: { name: "Dev Team", avatar: "/avatars/dev-team.svg" },
  },
  {
    id: 3,
    title: "Submitted a bug",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    type: "bug",
    user: { name: "John Doe", avatar: "/avatars/john-doe.svg" },
  },
  {
    id: 4,
    title: "Modified A data in Page X",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: "edit",
    user: { name: "Admin", avatar: "/avatars/admin.svg" },
  },
  {
    id: 5,
    title: "Deleted a page in Project X",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    type: "delete",
    user: { name: "Admin", avatar: "/avatars/admin.svg" },
  },
];

// Mock data for contacts
const contacts = [
  {
    id: 1,
    name: "Natali Craig",
    email: "natali.craig@gmail.com",
    avatar: "/avatars/natali-craig.svg",
    status: "online",
  },
  {
    id: 2,
    name: "Drew Cano",
    email: "drew.cano@gmail.com",
    avatar: "/avatars/drew-cano.svg",
    status: "away",
  },
  {
    id: 3,
    name: "Orlando Diggs",
    email: "orlando.diggs@gmail.com",
    avatar: "/avatars/orlando-diggs.svg",
    status: "offline",
  },
  {
    id: 4,
    name: "Andi Lane",
    email: "andi.lane@gmail.com",
    avatar: "/avatars/andi-lane.svg",
    status: "online",
  },
];

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

const getActivityIcon = (type: string) => {
  switch (type) {
    case "bug":
      return <BugBeetle className="h-4 w-4" />;
    case "release":
      return <Broadcast className="h-4 w-4" />;
    case "edit":
      return <Check className="h-4 w-4" />;
    case "delete":
      return <Trash className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "away":
      return "bg-yellow-500";
    case "offline":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const formatTimeAgo = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export function SidebarRightPanel() {
  return (
    <RightSidebar className="bg-background border-l">
      <div className="flex h-full flex-col">
        {/* Notifications Section */}
        <div className="space-y-4 border-b p-4">
          <h3 className="text-lg font-semibold">Notifications</h3>

          <ScrollArea className="h-64">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={cn("transition-all duration-200 shadow-none border-none")}
                >
                  <CardContent className="p-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="min-w-0 max-w-48 flex-1">
                        <p className="truncate text-sm font-medium">
                          {notification.title}
                        </p>
                        {/* <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                          {notification.message}
                        </p> */}
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-muted-foreground text-xs">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                          {/* {!notification.isRead && (
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                          )} */}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Activities Section */}
        <div className="border-b p-4">
          <h3 className="mb-4 text-lg font-semibold">Activities</h3>
          <ScrollArea className="h-48">
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {activity.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback className="text-xs">
                          {activity.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground text-xs">
                        {activity.user.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Contacts Section */}
        <div className="p-4">
          <h3 className="mb-4 text-lg font-semibold">Contacts</h3>
          <ScrollArea className="h-40">
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className="text-xs">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2",
                        getStatusColor(contact.status)
                      )}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {contact.name}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {contact.email}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </RightSidebar>
  );
}
