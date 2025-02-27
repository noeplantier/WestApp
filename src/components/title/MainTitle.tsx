import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import '../../index.css';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { SignUpButton } from '@clerk/clerk-react';
import { MapPin, Calendar, X } from "lucide-react";
import { useActivities } from '../../hooks/useActivities'; // Ajustez le chemin d'import selon votre structure

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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const { activities } = useActivities();
  
  const nearbyEvents = activities.map(activity => ({
    id: activity.id,
    name: activity.title,
    distance: `${((Math.random() * 5) + 0.5).toFixed(1)}km`, // Distance simulée
    date: activity.date,
    imageUrl: activity.imageUrl,
    description: activity.description,
    time: activity.time,
    location: activity.location.city,
  }));

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setShowUserModal(true);
      
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
    }
  }, [user]);

  const handleOpenLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleOpenSignupModal = () => setShowSignupModal(true);
  const handleCloseSignupModal = () => setShowSignupModal(false);

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
    <h1 className="text-white text-9xl font-bold" id="main-title">
      WestApp
    </h1>
    
    <h2 className="text-white font-semibold text-4xl mt-4 mb-6">
      Sortez. Rencontrez. Vivez.
    </h2>
    
    <p className="text-white text-xl mb-8">
      Le réseau social qui transforme vos connexions virtuelles en rencontres réelles.
      Découvrez des événements, trouvez des compagnons d'aventure et créez de véritables liens dans votre ville.
    </p>
    
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
    
    <p className="text-white text-xl mb-8">
      Prêt à quitter votre canapé et à vivre de vraies aventures ?
    </p>


{ /* Boutons de connexion */}
    <div className="mt-6">
      <div className="button-container flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          variant="secondary" 
          className="custom-button text-base px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white" 
          onClick={handleOpenLoginModal}
        >
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </Button>
        <Button 
          className="custom-button text-base px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white" 
          onClick={handleOpenSignupModal}
        >
          <SignedOut>
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </Button>
      </div>
    </div>
    
    <p className="text-gray-300 mt-6 text-sm">
      Rejoignez plus de 50 000 personnes qui ont déjà fait le premier pas vers une vie sociale plus riche
    </p>
  </div>
</div>

      {/* Modale utilisateur */}

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
  );
};

export default MainTitle;