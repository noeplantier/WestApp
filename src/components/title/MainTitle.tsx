import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import '../../index.css';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { SignUpButton } from '@clerk/clerk-react';
import { MapPin, Calendar } from "lucide-react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
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
  const [nearbyEvents, setNearbyEvents] = useState([
    { id: 1, name: "Concert au Parc", distance: "0.5km", date: "Ce soir" },
    { id: 2, name: "Festival de Street Food", distance: "1.2km", date: "Demain" },
    { id: 3, name: "Exhibition d'Art", distance: "2.0km", date: "Ce weekend" },
  ]);

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
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source
          src="/videos/204565-924698132_small.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Contenu principal */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center my-2 p-6" id="main-container" style={{textShadow: "1px 1px 2px gray"}}>
          <h1 className="text-white text-9xl font-bold" id="main-title">
            WestApp
          </h1>
          <h2 className="text-white font-semibold text-5xl mt-4">
            Vivez l'instant présent.
          </h2>
          <div className="mt-8">
            <div className="button-container">
              <Button variant="secondary" className="custom-button" onClick={handleOpenLoginModal}>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </Button>
              <Button variant="secondary" className="custom-button" onClick={handleOpenSignupModal}>
                <SignedOut>
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modale utilisateur */}
      <Modal open={showUserModal} onClose={() => setShowUserModal(false)}>
        <div className="text-4xl font-bold text-center mb-6">
          Bienvenue, {user?.firstName} !
        </div>
        
        <div className="space-y-6">
          {/* Informations utilisateur */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
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
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="font-semibold">{event.name}</h4>
                        <p className="text-sm text-gray-600">{event.distance}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-purple-600">{event.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </Modal>
    </div>
  );
};

export default MainTitle;