import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PremiumModal } from './premium/PremiumModal';
import Login from '../components/login/LoginModal';
import Profile from './Profile';
import MainTitle from './title/MainTitle';
import HomePage from './home/HomePage';
import SignupModal from './signin/SigninModal';
import SettingsModal from './settings/SettingsModal';
import CategoriesModal from './categories/CategoriesModal';
import HelpModal from './help/HelpModal';



interface SignupModalProps {

  // existing properties
  onSignup: (userData: any) => void;
}


function App () {
  const [user, setUser] = useState(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  function handleSignup(userData: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Router>
      <Routes>

<Route path="/settings" element={<SettingsModal open={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
      <Route path="/" element={<MainTitle />} />
      <Route path="/home" element={<HomePage activities={[]} />} />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Login onLogin={handleSignup} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupModal onSignup={handleSignup} />} />
        <Route path="/premium" element={<PremiumModal isOpen={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route
          path="/categories"
          element={<CategoriesModal isOpen={false} onClose={function (): void {
            throw new Error('Function not implemented.');
          } } userLocation="Paris" userInterests={['Sports', 'Culture', 'Technologie']} />} />
        <Route path="/help" element={<HelpModal isOpen={false} onClose={function (): void { }} />} />
        

      </Routes>
    </Router>
  );
};

export default App;