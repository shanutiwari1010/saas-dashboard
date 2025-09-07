import type { Notification } from "@/modules/notification/types/notification";

export const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "bug_reported",
    title: "You have a bug that needs to be fixed",
    message:
      "A critical bug has been reported in the dashboard module that requires immediate attention.",
    timestamp: new Date(Date.now() - 1000 * 60), // 1 minute ago
    isRead: false,
    isArchived: false,
    priority: "high",
    bugId: "BUG-001",
    severity: "high",
    projectName: "Dashboard",
  },
  {
    id: "2",
    type: "user_registered",
    title: "New user registered",
    message: "A new user has successfully registered to the platform.",
    timestamp: new Date(Date.now() - 1000 * 60 * 59), // 59 minutes ago
    isRead: false,
    isArchived: false,
    priority: "low",
    userId: "user-123",
    userName: "John Smith",
    userAvatar: "/avatars/john-doe.svg",
  },
  {
    id: "3",
    type: "bug_reported",
    title: "You have a bug that needs to be fixed",
    message:
      "A medium priority bug has been reported in the authentication system.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    isRead: true,
    isArchived: false,
    priority: "medium",
    bugId: "BUG-002",
    severity: "medium",
    projectName: "Authentication",
  },
  {
    id: "4",
    type: "user_subscribed",
    title: "Andi Lane subscribed to you",
    message: "Andi Lane has subscribed to your premium content and updates.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60), // Today, 11:59 AM (relative)
    isRead: false,
    isArchived: false,
    priority: "medium",
    userId: "user-456",
    userName: "Andi Lane",
    userAvatar: "/avatars/andi-lane.svg",
  },
  {
    id: "5",
    type: "system_update",
    title: "System maintenance scheduled",
    message:
      "Scheduled maintenance will occur tonight at 2:00 AM EST. Expected downtime: 30 minutes.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    isRead: true,
    isArchived: false,
    priority: "medium",
    actionUrl: "/maintenance",
    actionText: "View Details",
  },
  {
    id: "6",
    type: "feature_release",
    title: "New analytics dashboard released",
    message:
      "We've released a new analytics dashboard with advanced reporting features.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    isRead: true,
    isArchived: false,
    priority: "low",
    actionUrl: "/analytics",
    actionText: "Try Now",
  },
  {
    id: "7",
    type: "user_followed",
    title: "Rebecca Clarke started following you",
    message: "Rebecca Clarke is now following your updates and content.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    isRead: true,
    isArchived: false,
    priority: "low",
    userId: "user-789",
    userName: "Rebecca Clarke",
    userAvatar: "/avatars/rebecca-clarke.svg",
  },
  {
    id: "8",
    type: "bug_fixed",
    title: "Bug BUG-003 has been resolved",
    message:
      "The reported bug in the payment system has been successfully fixed and deployed.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168), // 1 week ago
    isRead: true,
    isArchived: true,
    priority: "medium",
    bugId: "BUG-003",
    severity: "medium",
    projectName: "Payments",
  },
];

export const NOTIFICATION_TYPES = [
  "user_registered",
  "user_subscribed",
  "user_followed",
  "bug_reported",
  "bug_fixed",
  "bug_urgent",
  "system_maintenance",
  "system_update",
  "feature_release",
] as const;

export const NOTIFICATION_PRIORITIES = [
  "low",
  "medium",
  "high",
  "urgent",
] as const;
