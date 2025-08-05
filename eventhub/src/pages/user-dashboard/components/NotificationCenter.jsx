import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your ticket for Tech Conference 2024 has been confirmed',
      time: '2 hours ago',
      read: false,
      icon: 'CheckCircle',
      color: 'text-success bg-green-50'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Event Reminder',
      message: 'AI Workshop starts in 3 days. Don\'t forget to prepare!',
      time: '1 day ago',
      read: false,
      icon: 'Clock',
      color: 'text-warning bg-yellow-50'
    },
    {
      id: 3,
      type: 'update',
      title: 'Event Update',
      message: 'Digital Marketing Summit venue has been changed',
      time: '2 days ago',
      read: true,
      icon: 'Info',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 4,
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 20% off on your next event booking',
      time: '3 days ago',
      read: true,
      icon: 'Gift',
      color: 'text-purple-600 bg-purple-50'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
          {unreadCount > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-white">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs text-primary hover:text-primary-dark nav-transition"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Bell" size={20} className="text-text-secondary" />
            </div>
            <p className="text-sm text-text-secondary">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border nav-transition ${
                notification.read 
                  ? 'border-border bg-background' :'border-primary/20 bg-primary-light/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-1.5 rounded-lg flex-shrink-0 ${notification.color}`}>
                  <Icon name={notification.icon} size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary mb-1">
                        {notification.title}
                      </p>
                      <p className="text-xs text-text-secondary mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {notification.time}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-text-secondary hover:text-primary nav-transition"
                          title="Mark as read"
                        >
                          <Icon name="Check" size={12} />
                        </button>
                      )}
                      <button
                        onClick={() => dismissNotification(notification.id)}
                        className="p-1 text-text-secondary hover:text-error nav-transition"
                        title="Dismiss"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary-dark nav-transition">
            View All Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;