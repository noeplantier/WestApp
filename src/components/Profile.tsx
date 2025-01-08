import React from 'react';

interface ProfileProps {
  user: any;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h1>Profile Page</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Ajoutez d'autres informations utilisateur ici */}
      </div>
    </div>
  );
};

export default Profile;