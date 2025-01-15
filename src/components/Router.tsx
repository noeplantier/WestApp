import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import MainTitle from './title/MainTitle';
import HomePage from './home/HomePage';

const App: React.FC = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainTitle />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;