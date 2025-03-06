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
      <div className="bg-white rounded-lg max-w-[800px] w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-6">
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
        <div className="text-center my-2 p-6 max-w-9xl" id="main-container" style={{textShadow: "1px 1px 2px gray"}}>
          <div className="flex items-center justify-center gap-4 mb-6 mt-10">
            <h1 className="text-white text-8xl font-bold">Une vie de</h1>
            <div className="h-24"> {/* Increased height for larger text */}
              <RotatingText
                texts={['rencontres', 'découverte', 'connexions']}
                mainClassName="px-6 py-2 text-8xl font-bold bg-blue-600 text-black  rounded-full"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.02}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            </div>
          </div>
          
          <h2 className="text-white text-left m-8 font-semibold font-italic text-5xl mt-8 mb-0">
            Le réseau social qui transforme vos <br></br> connexions virtuelles en rencontres réelles.
          </h2>
    
          
          <div ref={contentRef} className="pt-16"> {/* Point d'ancrage pour le défilement */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-xs">
                <div className="text-pink-400 text-4xl mb-2">🗓️</div>
                <h3 className="text-white text-xl font-bold mb-2">Événements locaux</h3>
                <p className="text-gray-200">Découvrez des sorties, activités et événements près de chez vous</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-xs">
                <div className="text-pink-400 text-4xl mb-2">👋</div>
                <h3 className="text-white text-xl font-bold mb-2">Rencontres réelles</h3>
                <p className="text-gray-200">Connectez-vous avec des personnes qui partagent vos intérêts</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-xs">
                <div className="text-pink-400 text-4xl mb-2">🌟</div>
                <h3 className="text-white text-xl font-bold mb-2">Expériences sociales</h3>
                <p className="text-gray-200">Créez des souvenirs en participant à des expériences enrichissantes</p>
              </div>
            </div>
            
                  
            <button 
      onClick={scrollToContent}
      className="mt-8 mb-16 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
    >
      Vivez une nouvelle aventure
      <ChevronDown className="ml-2 animate-bounce" />
    </button>
     
           

      {/* Modale Bienvenue */}
      <div className="flex flex-col space-y-6 bg-blue-600">
        <Modal open={showUserModal} onClose={() => setShowUserModal(false)}>
          <div className="text-blue-600 text-5xl font-bold text-center mb-10 mt-10"  style={{textShadow: "1px 1px 2px gray"}}>
            Bienvenue sur WestApp, {user?.firstName} ! 
          </div>
          
          <div className="space-y-6">
            {/* Informations utilisateur */}
            <Card className="bg-blue-600 text-white">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 mt-4">
                  <img
                    src={user?.imageUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">{user?.fullName}</h3>
                    <p className="text-lg opacity-90">{user?.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Section événements à proximité */}
            <Card>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  Événements à proximité
                </h3>
                <div className="space-y-4">
                  {nearbyEvents.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={event.imageUrl}
                          alt={event.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            <h4 className="font-semibold text-lg">{event.name}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>{event.distance}</span>
                            <span>•</span>
                            <span>{event.location}</span>
                            <span>•</span>
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