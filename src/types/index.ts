export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  interests: string[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    city: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  organizer: User;
  participants: User[];
  maxParticipants: number;
  imageUrl: string;
}