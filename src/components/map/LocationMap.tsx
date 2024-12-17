import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Modal, Button } from 'react-bootstrap'; // Assurez-vous d'installer react-bootstrap

const LocationMap = ({ center, activities }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleOpenModal}>
        <i className="fas fa-compass"></i> {/* Assurez-vous d'avoir FontAwesome pour l'icône */}
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Google Maps</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="400px"
            src="https://www.google.com/maps"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

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
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationMap;