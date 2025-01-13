interface AudioMessage {
    id: string;
    senderId: string;
    audioUrl: string;
    timestamp: string;
  }
  
  interface UserProfile {
    id: string;
    name: string;
    age: number;
    location: string;
    interests: string[];
    avatar: string;
    bio: string;
    lastActive: string;
  }