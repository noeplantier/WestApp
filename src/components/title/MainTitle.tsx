import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { MapPin, Calendar, X, ChevronDown } from "lucide-react";
import { useActivities } from '../../hooks/useActivities'; 
import RotatingText from '../RotatingText/RotatingText'
import { useUser } from '@clerk/clerk-react';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-[95%] md:max-w-[800px] w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-2 md:top-4 right-2 md:right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const MainTitle = () => {
  const [setUserLocation] = useState(null);
  const { activities } = useActivities();
  const contentRef = useRef(null);
  const [showUserModal, setShowUserModal] = useState(false);
  
  const nearbyEvents = activities.map(activity => ({
    id: activity.id,
    name: activity.title,
    distance: `${((Math.random() * 5) + 0.5).toFixed(1)}km`,
    date: activity.date,
    imageUrl: activity.imageUrl,
    description: activity.description,
    time: activity.time,
    location: activity.location.city,
  }));

  const user = useUser();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
        }
      );
    }
  }, []);

  const scrollToContent = () => {
    navigate('/activities');
  };

  return (
    <div className="relative min-h-screen">
      {/* Video overlay */}
      <div className="absolute inset-0 bg-black/40 z-[-1]"></div>
      
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      >
        <source
          src="/videos/204565-924698132_small.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Contenu principal */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center w-full px-4 mb:20 md:px-6 lg:px-8" id="main-container" style={{textShadow: "1px 1px 2px gray"}}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 mt-2">
  <h1 className="text-white text-4xl sm:text-6xl lg:text-8xl font-bold">Une vie de</h1>
  <div className="h-16 sm:h-22 lg:h-24 -mt-0">
    <RotatingText
      texts={['rencontres', 'découverte', 'connexions']}
      mainClassName="px-4 sm:px-0 py-1 text-4xl sm:text-6xl lg:text-8xl font-bold bg-blue-600 text-white rounded-full -translate-y-10"
      staggerFrom={"last"}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      staggerDuration={0.01}
      splitLevelClassName="overflow-hidden"
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
      rotationInterval={2000}
    />
  </div>
</div>
          
          <h2 className="text-white text-center md:text-left text-2xl sm:text-4xl lg:text-5xl font-semibold font-italic m-4 md:m-8 mt-10 mb-0">
            Le réseau social qui transforme vos <br className="hidden md:block" /> connexions virtuelles en rencontres réelles.
          </h2>
    
          <div ref={contentRef} className="pt-8 md:pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl mx-4 md:mx-0">
                <div className="text-pink-400 text-3xl md:text-4xl mb-2">🗓️</div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-2">Événements locaux</h3>
                <p className="text-gray-200 text-sm md:text-base">Découvrez des sorties, activités et événements près de chez vous</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl mx-4 md:mx-0">
                <div className="text-pink-400 text-3xl md:text-4xl mb-2">👋</div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-2">Rencontres réelles</h3>
                <p className="text-gray-200 text-sm md:text-base">Connectez-vous avec des personnes qui partagent vos intérêts</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl mx-4 md:mx-0">
                <div className="text-pink-400 text-3xl md:text-4xl mb-2">🌟</div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-2">Expériences sociales</h3>
                <p className="text-gray-200 text-sm md:text-base">Créez des souvenirs en participant à des expériences enrichissantes</p>
              </div>
            </div>
            
            <button 
              onClick={scrollToContent}
              className="mt-6 md:mt-8 mb-8 mb-16 px-6 md:px-8 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg md:text-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
              Vivez une nouvelle aventure
              <ChevronDown className="ml-2 mt-1 animate-bounce w-4 h-4 md:w-6 md:h-6" />
            </button>

            {/* Modale Bienvenue */}
            <div className="flex flex-col space-y-6 bg-blue-600">
              <Modal open={showUserModal} onClose={() => setShowUserModal(false)}>
                <div className="text-blue-600 text-3xl md:text-5xl font-bold text-center mb-6 md:mb-10 mt-6 md:mt-10" style={{textShadow: "1px 1px 2px gray"}}>
                  Bienvenue sur WestApp, {user?.firstName} ! 
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  {/* Informations utilisateur */}
                  <Card className="bg-blue-600 text-white">
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row items-center gap-4 mb-4 mt-4">
                        <img
                          src={user?.imageUrl}
                          alt="Profile"
                          className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white"
                        />
                        <div className="text-center md:text-left">
                          <h3 className="text-xl md:text-2xl font-bold">{user?.fullName}</h3>
                          <p className="text-base md:text-lg opacity-90">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Section événements à proximité */}
                  <Card>
                    <div className="p-4 md:p-6">
                      <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                        Événements à proximité
                      </h3>
                      <div className="space-y-4">
                        {nearbyEvents.map(event => (
                          <div key={event.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
                              <img
                                src={event.imageUrl}
                                alt={event.name}
                                className="w-full md:w-16 h-32 md:h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                                  <h4 className="font-semibold text-base md:text-lg">{event.name}</h4>
                                </div>
                                <p className="text-xs md:text-sm text-gray-600 mt-1">{event.description}</p>
                                <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 text-xs md:text-sm text-gray-600">
                                  <span>{event.distance}</span>
                                  <span className="hidden md:inline">•</span>
                                  <span>{event.location}</span>
                                  <span className="hidden md:inline">•</span>
                                  <span>{event.date} à {event.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTitle;