export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'event' | 'chat' | 'system';
  activityId?: string;
}