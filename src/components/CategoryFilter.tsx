import React, { useState, useEffect } from 'react';
import { MapPin, X } from 'lucide-react';

interface CategoryInfo {
  name: string;
  description: string;
  activities: string[];
  icon: string;
}

const categoryDetails: Record<string, CategoryInfo> = {
  "Sport": {
    name: "Sport",
    description: "Découvrez des activités sportives variées pour tous les niveaux",
    activities: ["Course à pied", "Yoga", "Football", "Basketball", "Tennis"],
    icon: "🏃‍♂️"
  },
  "Culture": {
    name: "Culture",
    description: "Explorez la richesse culturelle de votre région",
    activities: ["Musées", "Théâtre", "Expositions", "Conférences"],
    icon: "🎭"
  },
  "Gastronomie": {
    name: "Gastronomie",
    description: "Savourez les délices culinaires locaux",
    activities: ["Restaurants", "Cours de cuisine", "Dégustations", "Food tours"],
    icon: "🍽️"
  },
  "Nature": {
    name: "Nature",
    description: "Reconnectez-vous avec la nature environnante",
    activities: ["Randonnées", "Jardinage", "Observation d'oiseaux", "Pique-niques"],
    icon: "🌿"
  },
  "Musique": {
    name: "Musique",
    description: "Vibrez au rythme des événements musicaux",
    activities: ["Concerts", "Cours de musique", "Jam sessions", "Festivals"],
    icon: "🎵"
  },
  "Art": {
    name: "Art",
    description: "Exprimez votre créativité à travers l'art",
    activities: ["Peinture", "Sculpture", "Photographie", "Artisanat"],
    icon: "🎨"
  },
  "Jeux": {
    name: "Jeux",
    description: "Partagez des moments ludiques",
    activities: ["Jeux de société", "Escape games", "Quiz", "Jeux vidéo"],
    icon: "🎮"
  },
  "Langue": {
    name: "Langue",
    description: "Développez vos compétences linguistiques",
    activities: ["Échange linguistique", "Cours de langue", "Clubs de conversation"],
    icon: "🗣️"
  }
};

const CategoryModal = ({ category, isOpen, onClose }: { 
  category: CategoryInfo; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="text-3xl mr-2">{category.icon}</span>
              {category.name}
            </h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">{category.description}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Activités disponibles:</h4>
            <div className="grid grid-cols-2 gap-3">
              {category.activities.map((activity, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [locationError, setLocationError] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    setIsLoadingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('La géolocalisation n\'est pas supportée par votre navigateur');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=bb184887470e4e0baa0aa70407e0ae62`
          );
          const data = await response.json();
          
          if (data.results && data.results[0]) {
            const { city, town, village, suburb } = data.results[0].components;
            setLocation(city || town || village || suburb || 'votre position');
          } else {
            setLocation('votre position');
          }
        } catch (error) {
          setLocation('votre position');
        }
        setIsLoadingLocation(false);
      },
      (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Accès à la localisation refusé');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Information de localisation indisponible');
            break;
          case error.TIMEOUT:
            setLocationError('Délai d\'attente de la localisation dépassé');
            break;
          default:
            setLocationError('Une erreur est survenue lors de la géolocalisation');
        }
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="text-center my-2 p-6" id="main-container">
      <h2 className="text-white font-semibold text-8xl mt-4 mb-4">
        Activités à proximité
      </h2>
      
      {/* Location display */}
      <div className="flex items-center justify-center text-white mb-6">
        <MapPin className="w-5 h-5 mr-2" />
        {isLoadingLocation ? (
          <span>Détermination de votre position...</span>
        ) : locationError ? (
          <div className="flex items-center">
            <span className="text-red-400">{locationError}</span>
            <button
              onClick={getUserLocation}
              className="ml-2 text-blue-400 hover:text-blue-300"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <span>Découvrez les activités près de {location}</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 py-4 justify-center">
        {Object.values(categoryDetails).map((category) => (
          <button
            key={category.name}
            className="px-4 py-2 rounded-full text-sm bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors"
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <CategoryModal
          category={categoryDetails[selectedCategory]}
          isOpen={true}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
}