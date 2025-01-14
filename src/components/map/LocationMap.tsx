import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LocationMap = ({ center }: { center: any }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Données fictives des événements
  const events = [
    {
      id: 1,
      name: 'Concert en plein air',
      location: { lat: 48.8566, lng: 2.3522 }, // Paris
      date: new Date('2025-01-20'),
    },
    {
      id: 2,
      name: 'Fête de la gastronomie',
      location: { lat: 45.764, lng: 4.8357 }, // Lyon
      date: new Date('2025-01-25'),
    },
    {
      id: 3,
      name: 'Festival d\'art',
      location: { lat: 43.6108, lng: 3.8767 }, // Montpellier
      date: new Date('2025-02-01'),
    },
  ];

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null); // Réinitialise l'événement sélectionné
  };

  const filteredEvents = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div>
      {/* Date Picker */}
      <div className="p-4 flex justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className="p-2 border rounded"
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Carte interactive */}
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: '500px', width: '100%', margin: '20px 0' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredEvents.map((event) => (
          <Marker
            key={event.id}
            position={[event.location.lat, event.location.lng]}
            eventHandlers={{
              click: () => {
                setSelectedEvent(event);
              },
            }}
          >
            <Popup>
              <h3>{event.name}</h3>
              <p>Date : {event.date.toLocaleDateString()}</p>
              <p>Localisation : [{event.location.lat}, {event.location.lng}]</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Informations sur l'événement sélectionné */}
      {selectedEvent && (
        <div className="fixed bottom-10 right-10 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-bold">{selectedEvent.name}</h2>
          <p>Date : {selectedEvent.date.toLocaleDateString()}</p>
          <p>Localisation : [{selectedEvent.location.lat}, {selectedEvent.location.lng}]</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => setSelectedEvent(null)}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
