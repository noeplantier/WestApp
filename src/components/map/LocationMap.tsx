import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useActivities } from '../../hooks/useActivities';
import 'leaflet/dist/leaflet.css';

export function LocationMap() {
  const { activities } = useActivities();
  const center = { lat: 46.603354, lng: 1.888334 }; // Center of France

  return (
    <MapContainer
      center={center}
      zoom={6}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {activities.map((activity) => (
        <Marker
          key={activity.id}
          position={[activity.location.coordinates.lat, activity.location.coordinates.lng]}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.location.city}</p>
              <p className="text-sm text-gray-600">{activity.date} - {activity.time}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}