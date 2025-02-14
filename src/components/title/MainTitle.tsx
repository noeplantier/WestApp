import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../index.css';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const MainTitle = () => {

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

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
          src="/videos/204565-924698132_small.mp4" // Chemin vers votre vidéo locale
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Contenu principal */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center my-2 p-6" id="main-container" style={{textShadow: "1px 1px 2px gray"}}>
          <h1 className="text-white text-9xl font-bold" id="main-title" >
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
            <UserButton />
          </SignedIn>
   
</Button>
    </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default MainTitle;
