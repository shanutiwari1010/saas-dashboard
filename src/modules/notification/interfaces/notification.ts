export interface BaseNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  isArchived: boolean;
  priority: NotificationPriority;
}

export interface UserNotification extends BaseNotification {
  type: 'user_registered' | 'user_subscribed' | 'user_followed';
  userId?: string;
  userName?: string;
  userAvatar?: string;
}

export interface BugNotification extends BaseNotification {
  type: 'bug_reported' | 'bug_fixed' | 'bug_urgent';
  bugId?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  projectName?: string;
}

export interface SystemNotification extends BaseNotification {
  type: 'system_maintenance' | 'system_update' | 'feature_release';
  actionUrl?: string;
  actionText?: string;
}

export type NotificationType = 
  | 'user_registered' 
  | 'user_subscribed' 
  | 'user_followed'
  | 'bug_reported' 
  | 'bug_fixed' 
  | 'bug_urgent'
  | 'system_maintenance' 
  | 'system_update' 
  | 'feature_release';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export type Notification = UserNotification | BugNotification | SystemNotification;

export interface NotificationFilters {
  types: NotificationType[];
  priorities: NotificationPriority[];
  isRead: boolean | null;
  isArchived: boolean | null;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface NotificationStats {
  total: number;
  unread: number;
  archived: number;
  byType: Record<NotificationType, number>;
  byPriority: Record<NotificationPriority, number>;
}
