import React, { useState, useEffect } from 'react';
import { Map, Tag, MapPin, Heart, X, Search, Compass } from 'lucide-react';

const CategoriesModal = ({ isOpen, onClose, userInterests = [] }) => {
  const [activeTab, setActiveTab] = useState('nearby');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [locationError, setLocationError] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    if (isOpen) {
      getUserLocation();
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  const categories = {
    nearby: [
      { id: 1, name: 'Sports & Fitness', count: 24, icon: '🏃‍♂️' },
      { id: 2, name: 'Arts & Culture', count: 18, icon: '🎨' },
      { id: 3, name: 'Gastronomie', count: 32, icon: '🍽️' },
      { id: 4, name: 'Plein Air', count: 15, icon: '🏕️' },
      { id: 5, name: 'Bien-être', count: 12, icon: '🧘‍♀️' },
      { id: 6, name: 'Musique', count: 28, icon: '🎵' },
      { id: 7, name: 'Photographie', count: 9, icon: '📸' },
      { id: 8, name: 'Tech & Innovation', count: 14, icon: '💻' },
      { id: 9, name: 'Langues', count: 7, icon: '🗣️' },
    ],
    recommended: [
      { id: 1, name: 'Sports & Fitness', count: 24, icon: '🏃‍♂️' },
      { id: 2, name: 'Arts & Culture', count: 18, icon: '🎨' },
      { id: 3, name: 'Gastronomie', count: 32, icon: '🍽️' },
      { id: 4, name: 'Plein Air', count: 15, icon: '🏕️' },
      { id: 7, name: 'Photographie', count: 9, icon: '📸' },
      { id: 8, name: 'Tech & Innovation', count: 14, icon: '💻' },
      { id: 9, name: 'Langues', count: 7, icon: '🗣️' },
    ]
  };

  const filteredCategories = {
    nearby: categories.nearby.filter(cat => 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    recommended: categories.recommended.filter(cat => 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  const CategoryCard = ({ category }) => (
    <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{category.icon}</span>
        <span className="text-sm text-gray-500">{category.count} activités</span>
      </div>
      <h3 className="font-medium text-gray-800">{category.name}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-50 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden relative">
        {/* Header */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Catégories</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search bar */}
          <div className="mt-4 relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une catégorie..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Location info */}
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {isLoadingLocation ? (
              <span>Détermination de votre position...</span>
            ) : locationError ? (
              <div className="flex items-center">
                <span className="text-red-500">{locationError}</span>
                <button
                  onClick={getUserLocation}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  Réessayer
                </button>
              </div>
            ) : (
              <span>Catégories près de {location}</span>
            )}
          </div>
        </div>

        {/* Rest of the component remains the same */}
        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'nearby'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('nearby')}
            >
              <div className="flex items-center">
                <Compass className="w-4 h-4 mr-2" />
                À proximité
              </div>
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'recommended'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('recommended')}
            >
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Recommandés
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-220px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredCategories[activeTab].map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {filteredCategories[activeTab].length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune catégorie trouvée pour "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;