// types.ts
export interface Review {
    id: string;
    author: string;
    rating: number;
    text: string;
    date: string;
  }
  
  export interface Location {
    city: string;
    address: string;
  }
  
  export interface Organizer {
    id: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
  }
  
  export interface Participant {
    id: string;
    name: string;
    avatar: string;
  }
  
  export interface Activity {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    imageUrl: string;
    location: Location;
    organizer: Organizer;
    participants: Participant[];
    maxParticipants: number;
    categories: string[];
    reviews: Review[];
  }