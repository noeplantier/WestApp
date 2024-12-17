import React from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ActivityCard } from './components/ActivityCard';
import type { Activity } from './types';

const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Randonnée au Mont Saint-Michel',
    description: 'Une belle randonnée guidée autour du Mont Saint-Michel',
    date: '15 Mars 2024',
    time: '09:00',
    location: {
      city: 'Mont Saint-Michel, Normandie',
      address: 'Grande Rue, 50170 Le Mont-Saint-Michel',
      coordinates: { lat: 48.636, lng: -1.511 }
    },
    category: 'Nature',
    organizer: {
      id: '1',
      name: 'Marie Dubois',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      bio: 'Guide touristique passionnée',
      location: 'Normandie',
      interests: ['Randonnée', 'Histoire', 'Photographie']
    },
    participants: [],
    maxParticipants: 15,
    imageUrl: 'https://images.unsplash.com/photo-1543844851-0bc8d0359ba1'
  },
  {
    id: '2',
    title: 'Dégustation de Vins à Bordeaux',
    description: 'Découverte des grands crus bordelais',
    date: '20 Mars 2024',
    time: '18:00',
    location: {
      city: 'Bordeaux, Nouvelle-Aquitaine',
      address: '10 Rue des Vignerons',
      coordinates: { lat: 44.837, lng: -0.579 }
    },
    category: 'Gastronomie',
    organizer: {
      id: '2',
      name: 'Pierre Martin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      bio: 'Sommelier professionnel',
      location: 'Bordeaux',
      interests: ['Vin', 'Gastronomie', 'Culture']
    },
    participants: [],
    maxParticipants: 10,
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3'
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {SAMPLE_ACTIVITIES.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;