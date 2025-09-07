import type { Notification } from "@/modules/notification/interfaces/notification";

export const notifications: Notification[] = [
  {
    id: "1",
    title: "You have a bug that needs to be fixed",
    message: "Critical bug reported in the payment system",
    timestamp: new Date(),
    priority: "urgent",
    type: "bug_urgent",
    isRead: false,
    isArchived: false,
    bugId: "BUG-001",
    projectName: "Payment System",
  },
  {
    id: "2",
    title: "New user registered",
    message: "A new user has joined the platform",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    priority: "medium",
    type: "user_registered",
    isRead: true,
    isArchived: false,
    userName: "John Doe",
    userAvatar: "/avatars/john-doe.svg",
  },
  {
    id: "3",
    title: "System maintenance scheduled",
    message: "Scheduled maintenance for tonight at 2 AM",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    priority: "high",
    type: "system_maintenance",
    isRead: false,
    isArchived: false,
    actionUrl: "#",
    actionText: "View Details",
  },
  {
    id: "4",
    title: "Andi Lane subscribed to you",
    message: "Andi Lane has subscribed to your updates",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    priority: "low",
    type: "user_subscribed",
    isRead: true,
    isArchived: false,
    userName: "Andi Lane",
    userAvatar: "/avatars/andi-lane.svg",
  },
];
