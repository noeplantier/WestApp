import { useState } from 'react';
import type { Activity } from '../types';

const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Randonnée en montagne',
    description: 'Une belle randonnée dans les Alpes avec un groupe dynamique.',
    date: '2024-03-20',
    time: '09:00',
    location: {
      city: 'Chamonix',
      address: '23 Avenue de la Montagne, 74400 Chamonix',
      coordinates: {
        lat: 45.923697,
        lng: 6.869433
      }
    },
    category: 'Sport',
    organizer: {
      id: 'org1',
      name: 'Marie',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      bio: 'Guide de montagne passionnée',
      location: 'Chamonix',
      interests: ['Randonnée', 'Escalade']
    },
    participants: [],
    maxParticipants: 10,
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306'
  },
  {
    id: '2',
    title: 'Soirée jeux de société',
    description: 'Venez découvrir de nouveaux jeux dans une ambiance conviviale.',
    date: '2024-03-22',
    time: '19:00',
    location: {
      city: 'Paris',
      address: '15 Rue des Jeux, 75011 Paris',
      coordinates: {
        lat: 48.856614,
        lng: 2.352222
      }
    },
    category: 'Jeux',
    organizer: {
      id: 'org2',
      name: 'Thomas',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      bio: 'Passionné de jeux de société',
      location: 'Paris',
      interests: ['Jeux', 'Culture']
    },
    participants: [],
    maxParticipants: 8,
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09'
  }
];

export function useActivities() {
  const [activities] = useState<Activity[]>(SAMPLE_ACTIVITIES);

  return {
    activities,
  };
}