import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Notification, NotificationType, NotificationPriority, NotificationFilters, NotificationStats } from '../interfaces/notification';
import { DEFAULT_NOTIFICATIONS } from '../constants/notification-data';

interface NotificationsState {
  // State
  notifications: Notification[];
  filters: NotificationFilters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  markAsArchived: (id: string) => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  setFilters: (filters: Partial<NotificationFilters>) => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed selectors (memoized)
  unreadCount: number;
  filteredNotifications: Notification[];
  stats: NotificationStats;
  recentNotifications: Notification[];
  urgentNotifications: Notification[];
}

const defaultFilters: NotificationFilters = {
  types: [],
  priorities: [],
  isRead: null,
  isArchived: null,
};

export const useNotificationsStore = create<NotificationsState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    notifications: DEFAULT_NOTIFICATIONS,
    filters: defaultFilters,
    isLoading: false,
    error: null,
    
    // Actions
    addNotification: (notificationData: Omit<Notification, 'id' | 'timestamp'>) => {
      const newNotification: Notification = {
        ...notificationData,
        id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
      };
      
      set((state) => ({
        notifications: [newNotification, ...state.notifications],
      }));
    },
    
    markAsRead: (id: string) => {
      set((state: NotificationsState) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id ? { ...notification, isRead: true } : notification
        ),
      }));
    },
    
    markAllAsRead: () => {
      set((state: NotificationsState) => ({
        notifications: state.notifications.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      }));
    },
    
    markAsArchived: (id: string) => {
      set((state: NotificationsState) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id ? { ...notification, isArchived: true } : notification
        ),
      }));
    },
    
    deleteNotification: (id: string) => {
      set((state: NotificationsState) => ({
        notifications: state.notifications.filter((notification) => notification.id !== id),
      }));
    },
    
    clearAll: () => {
      set({ notifications: [] });
    },
    
    setFilters: (newFilters: Partial<NotificationFilters>) => {
      set((state: NotificationsState) => ({
        filters: { ...state.filters, ...newFilters },
      }));
    },
    
    resetFilters: () => {
      set({ filters: defaultFilters });
    },
    
    setLoading: (loading: boolean) => {
      set({ isLoading: loading });
    },
    
    setError: (error: string | null) => {
      set({ error });
    },
    
    // Computed selectors
    get unreadCount() {
      return get().notifications.filter((n) => !n.isRead).length;
    },
    
    get filteredNotifications() {
      const { notifications, filters } = get();
      
      return notifications.filter((notification) => {
        // Type filter
        if (filters.types.length > 0 && !filters.types.includes(notification.type)) {
          return false;
        }
        
        // Priority filter
        if (filters.priorities.length > 0 && !filters.priorities.includes(notification.priority)) {
          return false;
        }
        
        // Read status filter
        if (filters.isRead !== null && notification.isRead !== filters.isRead) {
          return false;
        }
        
        // Archived status filter
        if (filters.isArchived !== null && notification.isArchived !== filters.isArchived) {
          return false;
        }
        
        // Date range filter
        if (filters.dateRange) {
          const timestamp = notification.timestamp.getTime();
          const start = filters.dateRange.start.getTime();
          const end = filters.dateRange.end.getTime();
          
          if (timestamp < start || timestamp > end) {
            return false;
          }
        }
        
        return true;
      });
    },
    
    get stats() {
      const { notifications } = get();
      
      const byType: Record<NotificationType, number> = {
        user_registered: 0,
        user_subscribed: 0,
        user_followed: 0,
        bug_reported: 0,
        bug_fixed: 0,
        bug_urgent: 0,
        system_maintenance: 0,
        system_update: 0,
        feature_release: 0,
      };
      
      const byPriority: Record<NotificationPriority, number> = {
        low: 0,
        medium: 0,
        high: 0,
        urgent: 0,
      };
      
      notifications.forEach((notification) => {
        byType[notification.type]++;
        byPriority[notification.priority]++;
      });
      
      return {
        total: notifications.length,
        unread: notifications.filter((n) => !n.isRead).length,
        archived: notifications.filter((n) => n.isArchived).length,
        byType,
        byPriority,
      };
    },
    
    get recentNotifications() {
      const { notifications } = get();
      return notifications
        .filter((n) => !n.isArchived)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 5);
    },
    
    get urgentNotifications() {
      const { notifications } = get();
      return notifications
        .filter((n) => n.priority === 'urgent' && !n.isRead && !n.isArchived)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    },
  }))
);

// Performance-optimized selectors using Zustand's subscribeWithSelector
export const useUnreadCount = () => useNotificationsStore((state) => state.unreadCount);
export const useFilteredNotifications = () => useNotificationsStore((state) => state.filteredNotifications);
export const useNotificationStats = () => useNotificationsStore((state) => state.stats);
export const useRecentNotifications = () => useNotificationsStore((state) => state.recentNotifications);
export const useUrgentNotifications = () => useNotificationsStore((state) => state.urgentNotifications);

// Action hooks for better performance
export const useNotificationActions = () => useNotificationsStore((state) => ({
  addNotification: state.addNotification,
  markAsRead: state.markAsRead,
  markAllAsRead: state.markAllAsRead,
  markAsArchived: state.markAsArchived,
  deleteNotification: state.deleteNotification,
  clearAll: state.clearAll,
}));

export const useNotificationFilters = () => useNotificationsStore((state) => ({
  filters: state.filters,
  setFilters: state.setFilters,
  resetFilters: state.resetFilters,
}));
