export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    isPremium: boolean;
  };
  timestamp: string;
  attachments?: {
    type: 'image' | 'link';
    url: string;
  }[];
}

export interface ChatRoom {
  id: string;
  activityId: string;
  messages: Message[];
  participants: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  }[];
}