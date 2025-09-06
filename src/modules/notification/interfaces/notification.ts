
export interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
  priority: "urgent" | "high" | "medium" | "low";
  type: "bug_urgent" | "user_registered" | "system_maintenance" | "user_subscribed";
  isRead: boolean;
  bugId?: string;
  projectName?: string;
  userName?: string;
  userAvatar?: string;
  actionUrl?: string;
  actionText?: string;
}

export interface Activity {
  id: number;
  title: string;
  timestamp: Date;
  image: string;
  type: "bug" | "release" | "edit" | "delete";
  user: {
    name: string;
    avatar: string;
  };
  isRead?: boolean;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: "online" | "away" | "offline";
}


























// export interface BaseNotification {
//   id: string;
//   type: NotificationType;
//   title: string;
//   message: string;
//   timestamp: Date;
//   isRead: boolean;
//   isArchived: boolean;
//   priority: NotificationPriority;
// }

// export interface UserNotification extends BaseNotification {
//   type: "user_registered" | "user_subscribed" | "user_followed";
//   userId?: string;
//   userName?: string;
//   userAvatar?: string;
// }

// export interface BugNotification extends BaseNotification {
//   type: "bug_reported" | "bug_fixed" | "bug_urgent";
//   bugId?: string;
//   severity?: "low" | "medium" | "high" | "critical";
//   projectName?: string;
// }

// export interface SystemNotification extends BaseNotification {
//   type: "system_maintenance" | "system_update" | "feature_release";
//   actionUrl?: string;
//   actionText?: string;
// }

// export type NotificationType =
//   | "user_registered"
//   | "user_subscribed"
//   | "user_followed"
//   | "bug_reported"
//   | "bug_fixed"
//   | "bug_urgent"
//   | "system_maintenance"
//   | "system_update"
//   | "feature_release";

// export type NotificationPriority = "low" | "medium" | "high" | "urgent";

// export type Notification =
//   | UserNotification
//   | BugNotification
//   | SystemNotification;

// export interface NotificationFilters {
//   types: NotificationType[];
//   priorities: NotificationPriority[];
//   isRead: boolean | null;
//   isArchived: boolean | null;
//   dateRange?: {
//     start: Date;
//     end: Date;
//   };
// }

// export interface NotificationStats {
//   total: number;
//   unread: number;
//   archived: number;
//   byType: Record<NotificationType, number>;
//   byPriority: Record<NotificationPriority, number>;
// }
