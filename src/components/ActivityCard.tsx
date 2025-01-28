import React, { ReactNode, useState } from 'react';
import { MapPin, Calendar, Clock, Users} from 'lucide-react';
import { Dialog } from './shared/Dialog';
import { MapContainer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface ActivityCardProps {
  activity: Activity;
}

interface Activity {
  imageUrl: string | undefined;
  title: string;
  maxParticipants: ReactNode;
  organizer: any;
  participants: any;
  description: string;
  categories: string[];
  reviews: Review[];
  location: {
    city: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(100); // Budget maximum pour filtrer les logements

  const airbnbListings = [
    { id: 1, name: 'Appartement cosy', price: 85, link: '#', imageUrl: 'https://dqevkwcr7bdtq.cloudfront.net/filer_public_thumbnails/filer_public/22/32/2232f6f6-9de4-48d0-af65-316bfc40c447/residence-principale-belleville-t.jpg__1170x0_q85_subsampling-2_upscale.jpg' },
    { id: 2, name: 'Maison spacieuse', price: 120, link: '#', imageUrl: 'https://dqevkwcr7bdtq.cloudfront.net/filer_public_thumbnails/filer_public/8d/0d/8d0dd618-ea7c-496d-ba68-309c5a0fd772/local-commercial-airbnb-t.jpg__1170x0_q85_subsampling-2_upscale.jpg' },
    { id: 3, name: 'Studio moderne', price: 60, link: '#', imageUrl: 'https://dqevkwcr7bdtq.cloudfront.net/filer_public_thumbnails/filer_public/c8/7f/c87f5bdf-91ac-45cf-95f4-cc1dafcd0693/chambre-airbnb-bnblord-t.jpg__1170x0_q85_subsampling-2_upscale.jpg' },
  ];

  const filteredListings = airbnbListings.filter(listing => listing.price <= maxPrice);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => setShowDetails(true)}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">{activity.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{activity.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{activity.location.city}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span className="text-sm">
                {activity.participants.length}/{activity.maxParticipants} participants
              </span>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setShowDetails(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Voir les détails
            </button>
          </div>
        </div>
      </div>

      <Dialog isOpen={showDetails} onClose={() => setShowDetails(false)} title={activity.title}>
        <div className="space-y-6">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800">Description</h4>
            <p className="text-gray-600 mb-4">{activity.description}</p>
            <h5 className="font-semibold mb-2 text-gray-800">Logements disponibles :</h5>
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="priceFilter" className="text-sm font-medium text-gray-700">
                Budget max. (€) :
              </label>
              <input
                id="priceFilter"
                type="number"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-20 border rounded-md px-2 py-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {filteredListings.length > 0 ? (
                filteredListings.map(listing => (
                  <a
                    key={listing.id}
                    href={listing.link}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img src={listing.imageUrl} alt={listing.name} className="w-full h-32 object-cover" />
                    <div className="p-2">
                      <h6 className="text-sm font-medium">{listing.name}</h6>
                      <p className="text-sm text-gray-500">{listing.price} €/nuit</p>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-2">Aucun logement disponible dans ce budget.</p>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-800">Localisation</h4>
      
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowDetails(false)}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
