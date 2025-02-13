import React, { useEffect } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { formatDistanceToNow } from '../../utils/dateUtils';

export function NotificationsPanel() {
  const { notifications, markAsRead, addNotification } = useNotifications();

  useEffect(() => {
    const notificationTypes = [
      { title: 'Nouvelle inscription', message: "Un utilisateur s'est inscrit à un événement." },
      { title: 'Demande d\'ami', message: "Vous avez reçu une nouvelle demande d'ami." },
    ];

    const interval = setInterval(() => {
      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      addNotification({
        id: Date.now(),
        title: randomNotification.title,
        message: randomNotification.message,
        timestamp: new Date(),
        read: false
      });
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [addNotification]);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Notifications</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="p-4 text-center text-gray-500">
            Aucune notification
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <p className="font-medium text-sm">{notification.title}</p>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                {formatDistanceToNow(notification.timestamp)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
