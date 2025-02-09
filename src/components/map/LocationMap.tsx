import React, { createContext, useState, useContext } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MyContextType {
  locations: Array<{ lat: number; lng: number; name: string }>;
}

export const MyContext = createContext<MyContextType>({ locations: [] });

const MyContextProvider: React.FC = ({ children }) => {
  const [locations, setLocations] = useState([
    { lat: 48.8566, lng: 2.3522, name: 'Paris' },
    // Ajoutez d'autres emplacements ici
  ]);

  return (
    <MyContext.Provider value={{ locations }}>
      {children}
    </MyContext.Provider>
  );
};

const LocationMap: React.FC = () => {
  const { locations } = useContext(MyContext);

  const mapStyles = {
    height: "80vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: 48.8566, lng: 2.3522
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCX4ipTA1KM0z-UyAKWK-yVdg80n48lmrc">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={defaultCenter}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            title={location.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

const App: React.FC = () => {
  return (
    <MyContextProvider>
      <LocationMap />
    </MyContextProvider>
  );
};

export default App;
