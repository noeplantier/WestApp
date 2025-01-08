import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'lucide-react';
import Login from './Login';
import Profile from './Profile';

const App: React.FC = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  return (
    <Router>
      <Switch>
        <Route path="/profile">
          {user ? <Profile user={user} /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route path="/">
          <Login onLogin={handleLogin} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;