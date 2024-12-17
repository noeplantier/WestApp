import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMap = ({ center, activities }: { center: any, activities: any[] }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded-full"
        onClick={handleOpenModal}
      >
        <i className="fas fa-compass"></i> {/* Assurez-vous d'avoir FontAwesome pour l'icône */}
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Carte de Géolocalisation</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
           
                <MapContainer
                  center={center}
                  zoom={6}
                  style={{ height: '400px', width: '100%' }}
             
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_ACCESS_TOKEN`}
                  id="mapbox/streets-v11"
                  tileSize={512}
                  zoomOffset={-1}
                  attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
                />
                {activities.map((activity) => (
                  <Marker
                    key={activity.id}
                    position={[activity.location.coordinates.lat, activity.location.coordinates.lng]}
                  />
                ))}
              </MapContainer>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCloseModal}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;