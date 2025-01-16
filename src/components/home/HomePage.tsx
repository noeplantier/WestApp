import React, { useEffect, useState } from 'react';
import { useGeolocation } from '../../hooks/useGeolocalisation';
import { calculateDistance } from '../../utils/distance';
import { ActivityCard } from '../ActivityCard';
import type { Activity } from '../../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';

interface HomePageProps {
  activities: Activity[];
  maxDistance?: number; // Distance maximale en kilomètres
}

const HomePage: React.FC<HomePageProps> = ({ activities, maxDistance = 50 }) => {
  const { location, loading } = useGeolocation();
  const [nearbyActivities, setNearbyActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (location && !location.error) {
      const filtered = activities.filter(activity => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          activity.location.coordinates.lat,
          activity.location.coordinates.lng
        );
        return distance <= maxDistance;
      });
      setNearbyActivities(filtered);
    }
  }, [location, activities, maxDistance]);

  return (
    <div className="relative min-h-screen">
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        className="homepage-bg absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="/videos/204565-924698132_small.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Contenu principal */}
      <div className="flex flex-col min-h-screen relative z-10">
        <div className="text-center my-2 p-6" id="home-container">
          <h1 className="text-white text-9xl font-bold" id="home-title">
            WestApp
          </h1>
          <h2 className="text-white font-semibold text-5xl mt-4">
            Quel est ton mood aujourd'hui ?
          </h2>
        </div>

        {/* Section des activités à proximité */}
        <div className="container mx-auto px-4 mt-8">
          {loading ? (
            <div className="text-white text-center">Recherche des activités à proximité...</div>
          ) : location?.error ? (
            <div className="text-white text-center">{location.error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;