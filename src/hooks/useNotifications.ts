import { useState, useEffect } from 'react';
import type { Notification } from '../types/notification';

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Nouvelle participation',
    message: 'Jean a rejoint votre activité "Randonnée en montagne"',
    timestamp: new Date(),
    read: false,
    type: 'event',
    activityId: '1'
  },
  {
    id: '2',
    title: 'Nouveau message',
    message: 'Vous avez reçu un message dans le chat de l\'activité "Soirée jeux"',
    timestamp: new Date(Date.now() - 3600000),
    read: false,
    type: 'chat',
    activityId: '2'
  }
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    unreadCount: notifications.filter((n) => !n.read).length,
  };
}