import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { MapPin, Calendar, X, ChevronDown, ArrowRight } from "lucide-react";
import { useActivities } from '../../hooks/useActivities'; 
import RotatingText from '../RotatingText/RotatingText'
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion'; // Assuming framer-motion is installed

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div 
        className="bg-white rounded-lg w-[95%] md:max-w-[800px] w-full max-h-[90vh] overflow-y-auto relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 md:top-4 right-2 md:right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const Card = ({ children, className = "" }) => (
  <motion.div 
    className={`rounded-lg shadow-lg overflow-hidden ${className}`}
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {children}
  </motion.div>
);

const MainTitle = () => {
  const [userLocation, setUserLocation] = useState(null);
  const { activities } = useActivities();
  const contentRef = useRef(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });

    setTimeout(() => {
      navigate('/activities', {
        state: { slideIn: true }
      });
    }, 600);
  };

  // Handle video loading
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };
 
  return (
    <div className="relative min-h-screen">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 z-[-1]"></div>
      
      {/* Background video */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-[-2]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          className="absolute top-0 left-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source
            src="/videos/204565-924698132_small.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Loading state */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-800 z-[-2]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Main content */}
      <div className="flex justify-center items-center min-h-screen">
        <motion.div 
          className="text-center w-full px-4 mb:20 md:px-6 lg:px-8" 
          id="main-container" 
          style={{textShadow: "1px 1px 2px rgba(0,0,0,0.5)"}}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-4xl sm:text-6xl lg:text-8xl font-bold">Riche en</h1>
            <div className="h-16 sm:h-20 lg:h-24">
              <RotatingText
                texts={['rencontres', 'découvertes', 'connexions', 'expériences']}
                mainClassName="px-4 sm:px-0 py-1 text-4xl sm:text-6xl lg:text-8xl font-bold bg-blue-600 text-white justify-center rounded-full inline-block min-w-[300px] sm:min-w-[400px] lg:min-w-[600px]"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                staggerDuration={0.01}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-white text-center md:text-left text-2xl sm:text-4xl lg:text-5xl font-semibold m-4 md:m-8 mt-10 mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Le réseau social qui transforme vos <br className="hidden md:block" /> connexions virtuelles en rencontres réelles.
          </motion.h2>
    
          <div ref={contentRef} className="pt-8 md:pt-16">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div 
                className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl mx-4 md:mx-0 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-pink-400 text-3xl md:text-4xl mb-2">🗓️</div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-2">Événements locaux</h3>
                <p className="text-gray-200 text-sm md:text-base">Découvrez des sorties, activités et événements près de chez vous</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl mx-4 md:mx-0 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-pink-400 text-3xl md:text-4xl mb-2">👋</div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-2">Rencontres réelles</h3>
                <p className="text-gray-200 text-sm md:text-base">Connectez-vous avec des personnes qui partagent vos intérêts</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl mx-4 md:mx-0 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-pink-400 text-3xl md:text-4xl mb-2">🌟</div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-2">Expériences sociales</h3>
                <p className="text-gray-200 text-sm md:text-base">Créez des souvenirs en participant à des expériences enrichissantes</p>
              </motion.div>
            </motion.div>
            
            {/* Optimized Call-to-Action */}
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 my-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button 
                onClick={scrollToContent}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg shadow-blue-600/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Découvrir les activités"
              >
                Vivez une nouvelle aventure
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button 
                onClick={() => setShowUserModal(true)}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full text-xl font-semibold transition-all duration-300 flex items-center gap-3 border-2 border-white/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label="En savoir plus"
              >
                En savoir plus
              </motion.button>
            </motion.div>

            {/* Modal section */}
            <Modal open={showUserModal} onClose={() => setShowUserModal(false)}>
              <div id="modal-title" className="text-blue-600 text-3xl md:text-5xl font-bold text-center mb-6 md:mb-10 mt-6 md:mt-10" style={{textShadow: "1px 1px 2px gray"}}>
                Bienvenue sur WestApp, {user?.firstName} ! 
              </div>
              
              <div className="space-y-4 md:space-y-6">
                {/* User info */}
                <Card className="bg-blue-600 text-white">
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4 mt-4">
                      <img
                        src={user?.imageUrl}
                        alt="Photo de profil"
                        className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white"
                      />
                      <div className="text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold">{user?.fullName}</h3>
                        <p className="text-base md:text-lg opacity-90">{user?.primaryEmailAddress?.emailAddress}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Nearby events section */}
                <Card>
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                      Événements à proximité
                    </h3>
                    <div className="space-y-4">
                      {nearbyEvents.slice(0, 3).map(event => (
                        <motion.div 
                          key={event.id} 
                          className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
                            <img
                              src={event.imageUrl}
                              alt={event.name}
                              className="w-full md:w-16 h-32 md:h-16 rounded-lg object-cover"
                              loading="lazy"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                                <h4 className="font-semibold text-base md:text-lg">{event.name}</h4>
                              </div>
                              <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>
                              <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 text-xs md:text-sm text-gray-600">
                                <span>{event.distance}</span>
                                <span className="hidden md:inline">•</span>
                                <span>{event.location}</span>
                                <span className="hidden md:inline">•</span>
                                <span>{event.date} à {event.time}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <motion.button
                        onClick={scrollToContent}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Voir tous les événements
                      </motion.button>
                    </div>
                  </div>
                </Card>
              </div>
            </Modal>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainTitle;