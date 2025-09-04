import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useUnreadCount, useRecentNotifications, useNotificationActions } from '../index';
import { NotificationList } from './notification-list';

export const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = useUnreadCount();
  const recentNotifications = useRecentNotifications();
  const { markAllAsRead } = useNotificationActions();

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleMarkAllAsRead}
                className="text-sm"
              >
                Mark all as read
              </Button>
            )}
          </div>
          
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {recentNotifications.length > 0 ? (
            <NotificationList />
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          )}
        </div>
        
        {recentNotifications.length > 0 && (
          <div className="p-3 border-t text-center">
            <Button variant="ghost" size="sm" className="text-sm">
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
