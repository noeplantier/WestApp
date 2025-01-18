import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ActivityCard } from './components/ActivityCard';
import { Chatbot } from './components/chatbot/Chatbot';
import { PremiumModal} from './components/premium/PremiumModal';
import type { Activity } from './types';
import './index.css';
import MainTitle from './components/title/MainTitle';
import { useEffect, useState } from 'react';
import Loader from './components/loader/Loader';
const App = () => {
const [isLoading, setIsLoading] = useState(true);

const SAMPLE_ACTIVITIES: Activity[] = [
  
  {
    id: '1',
    title: 'Randonnée sur la Baie de St. Brieuc',
    description: 'Une belle randonnée guidée autour de la Baie de St. Brieuc',
    date: '15 Mars 2024',
    time: '09:00',
    location: {
      city: 'St. Brieuc, Bretagne',
      address: 'Rue Ernest Renan, St. Brieuc',
      coordinates: { lat: 48.636, lng: -1.511 }
    },
    category: 'Nature',
    organizer: {
      id: '1',
      name: 'Marie Dubois',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      bio: 'Guide touristique passionnée',
      location: 'Bretagne',
      interests: ['Randonnée', 'Histoire', 'Photographie']
    },
    participants: [],
    maxParticipants: 15,
    imageUrl: 'https://www.voyagefamily.com/wp-content/uploads/2023/02/visiter-saint-brieuc-2-copie-220314-144851.jpg'
  },
  {
    id: '2',
    title: 'Exploration de la Côte de Granit Rose',
    description: 'Découvrez la magnifique Côte de Granit Rose à Ploumanac’h.',
    date: '18 Mars 2024',
    time: '10:00',
    location: {
      city: 'Ploumanac’h, Bretagne',
      address: 'Sentier des Douaniers',
      coordinates: { lat: 48.824, lng: -3.482 }
    },
    category: 'Nature',
    organizer: {
      id: '2',
      name: 'Jean Le Corre',
      avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004',
      bio: 'Explorateur local',
      location: 'Bretagne',
      interests: ['Nature', 'Randonnée', 'Aventure']
    },
    participants: [],
    maxParticipants: 20,
    imageUrl: 'https://www.sejours-pep22.com/article/produit/photo/photo191.jpg'
  },
  {
    id: '3',
    title: 'Visite du Phare de Brest',
    description: 'Partez à la découverte du Phare de Brest et son histoire.',
    date: '22 Mars 2024',
    time: '14:00',
    location: {
      city: 'Brest, Bretagne',
      address: 'Port de Brest',
      coordinates: { lat: 48.390, lng: -4.486 }
    },
    category: 'Culture',
    organizer: {
      id: '3',
      name: 'Lucie Bernard',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      bio: 'Historienne passionnée',
      location: 'Bretagne',
      interests: ['Histoire', 'Photographie']
    },
    participants: [],
    maxParticipants: 12,
    imageUrl: 'https://static.actu.fr/uploads/2023/06/d312511f49946ea12511f4994d3225v-960x640.jpg'
  },
  {
    id: '4',
    title: 'Atelier crêpe bretonne à Quimper',
    description: 'Apprenez à faire de délicieuses crêpes bretonnes !',
    date: '25 Mars 2024',
    time: '16:00',
    location: {
      city: 'Quimper, Bretagne',
      address: '5 Place de la Cathédrale',
      coordinates: { lat: 47.996, lng: -4.103 }
    },
    category: 'Gastronomie',
    organizer: {
      id: '4',
      name: 'Anne Le Gall',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      bio: 'Chef spécialisée en cuisine bretonne',
      location: 'Bretagne',
      interests: ['Cuisine', 'Tradition', 'Partage']
    },
    participants: [],
    maxParticipants: 8,
    imageUrl: 'https://www.quimper-tourisme.bzh/wp-content/uploads/l-atelier-du-phare-st-pierre-penmarch-10-11187.jpg'
  },
  {
    id: '5',
    title: 'Marché aux huîtres à Cancale',
    description: 'Dégustation des fameuses huîtres de Cancale en bord de mer.',
    date: '28 Mars 2024',
    time: '11:00',
    location: {
      city: 'Cancale, Bretagne',
      address: 'Quai Gambetta',
      coordinates: { lat: 48.676, lng: -1.851 }
    },
    category: 'Gastronomie',
    organizer: {
      id: '5',
      name: 'Julien Morel',
      avatar: 'https://images.unsplash.com/photo-1564564295391-7f24f26f568b',
      bio: 'Pêcheur et passionné de fruits de mer',
      location: 'Bretagne',
      interests: ['Mer', 'Cuisine', 'Nature']
    },
    participants: [],
    maxParticipants: 15,
    imageUrl: 'https://api.cloudly.space/resize/clip/1200/760/75/aHR0cHM6Ly9jZHQzNS5tZWRpYS50b3VyaW5zb2Z0LmV1L3VwbG9hZC9NQUgtMS5qcGc=/image.jpg'
  },
  {
    id: '6',
    title: 'Visite des remparts de Saint-Malo',
    description: 'Une promenade historique sur les remparts de Saint-Malo.',
    date: '30 Mars 2024',
    time: '10:30',
    location: {
      city: 'Saint-Malo, Bretagne',
      address: 'Remparts de Saint-Malo',
      coordinates: { lat: 48.649, lng: -2.025 }
    },
    category: 'Culture',
    organizer: {
      id: '6',
      name: 'Isabelle Roux',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
      bio: 'Guide locale',
      location: 'Bretagne',
      interests: ['Culture', 'Histoire', 'Photographie']
    },
    participants: [],
    maxParticipants: 25,
    imageUrl: 'https://content.carnetsvanille.com/wp-content/uploads/2021/12/remparts-saint-malo.jpg'
  }
  // Ajoutez encore 6 cartes similaires ici...
];


useEffect(() => {
  // Simulez un temps de chargement avant que l'application soit prête
  const timer = setTimeout(() => setIsLoading(false), 3000);
  return () => clearTimeout(timer);
}, []);

if (isLoading) {
  return <Loader />; // Affiche le loader pendant le chargement
}


return (
  <div>
    <Header />
    <MainTitle />
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter />
     
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {SAMPLE_ACTIVITIES.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      <PremiumModal isOpen={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />
      </main>
      <Chatbot />
    </div>
    </div>
  );
}

export default App;
