import React, { ReactNode, useState } from 'react';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import { Dialog } from './shared/Dialog';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



interface Participant {
  id: string;
  name: string;
  photoUrl: string;
}


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
    participants: Participant[];
    maxParticipants: number;
  };
}

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

// Types étendus
interface Availability {
  date: string;
  timeSlots: string[];
}
interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);


  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

const [participants, setParticipants] = useState<Participant[]>(activity.participants);
const [map, setMap] = useState<L.Map | null>(null);

const handleParticipate = () => {
  if (participants.length < activity.maxParticipants) {
    const newParticipant: Participant = {
      id: `participant-${participants.length + 1}`,
      name: `Participant ${participants.length + 1}`,
      photoUrl: `/api/placeholder/40/40` // Utilisez une vraie URL d'API pour les photos de profil
    };
    setParticipants([...participants, newParticipant]);
  }
};

const airbnbListings = [
  { id: 1, name: 'Appartement cosy', price: 85, link: '#', imageUrl: 'https://dqevkwcr7bdtq.cloudfront.net/filer_public_thumbnails/filer_public/22/32/2232f6f6-9de4-48d0-af65-316bfc40c447/residence-principale-belleville-t.jpg__1170x0_q85_subsampling-2_upscale.jpg' },
  { id: 2, name: 'Maison spacieuse', price: 120, link: '#', imageUrl: 'https://dqevkwcr7bdtq.cloudfront.net/filer_public_thumbnails/filer_public/8d/0d/8d0dd618-ea7c-496d-ba68-309c5a0fd772/local-commercial-airbnb-t.jpg__1170x0_q85_subsampling-2_upscale.jpg' },
  { id: 3, name: 'Studio moderne', price: 60, link: '#', imageUrl: 'https://dqevkwcr7bdtq.cloudfront.net/filer_public_thumbnails/filer_public/c8/7f/c87f5bdf-91ac-45cf-95f4-cc1dafcd0693/chambre-airbnb-bnblord-t.jpg__1170x0_q85_subsampling-2_upscale.jpg' },
];


// Modifiez la section des participants dans la modale de détails
const participantsSection = 
  <div className="bg-gray-50 p-4 rounded-lg mt-2">
    <h4 className="font-semibold mb-2">
      Participants ({participants.length}/{activity.maxParticipants})
    </h4>
    <div className="flex flex-wrap gap-2">
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="relative group"
        >
          <img
            src={participant.photoUrl}
            alt={participant.name}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="absolute bottom-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-75 text-white text-xs p-1 rounded transition-opacity">
            {participant.name}
          </span>
        </div>
      ))}
    </div>
  </div>
;



// Modifiez la section des logements avec le prix fixe
const accommodationsSection = 
  <div className="bg-gray-50 p-4 rounded-lg mt-2">
    <h5 className="font-semibold mb-2 text-gray-800">
      Logements disponibles à proximité (max 60€/nuit) :
    </h5>
    <div className="grid grid-cols-2 gap-4">
      {airbnbListings
        .filter(listing => listing.price <= 60)
        .map(listing => (
          <a
            key={listing.id}
            href={listing.link}
            className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={listing.imageUrl}
              alt={listing.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-2">
              <h6 className="text-sm font-medium">{listing.name}</h6>
              <p className="text-sm text-gray-500">{listing.price} €/nuit</p>
            </div>
          </a>
        ))}
    </div>
  </div>
;

  const handleParticipationRequest = () => {
    const mailtoLink = `mailto:${activity.organizer.email}?subject=Participation à l'événement : ${activity.title}&body=Bonjour,
    
Je souhaite participer à votre événement "${activity.title}" prévu le ${activity.date}.
Mes disponibilités sont :
${availabilities.map(av => `- ${av.date}: ${av.timeSlots.join(', ')}`).join('\n')}
Merci de me confirmer ma participation.
Cordialement.`;
    window.location.href = encodeURI(mailtoLink);
  };
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };
  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlots(prev => {
      const newSlots = prev.includes(timeSlot) 
        ? prev.filter(slot => slot !== timeSlot)
        : [...prev, timeSlot];
      
      // Mettre à jour les disponibilités
      const existingDateIndex = availabilities.findIndex(av => av.date === selectedDate);
      if (existingDateIndex >= 0) {
        const newAvailabilities = [...availabilities];
        newAvailabilities[existingDateIndex] = { date: selectedDate, timeSlots: newSlots };
        setAvailabilities(newAvailabilities);
      } else {
        setAvailabilities([...availabilities, { date: selectedDate, timeSlots: newSlots }]);
      }
      
      return newSlots;
    });
  };



  const filteredListings = airbnbListings.filter(listing => listing.price <= maxPrice);


  const CalendarComponent = () => (
    <Dialog
      isOpen={showCalendar}
      onClose={() => setShowCalendar(false)}
      title="Sélectionnez vos disponibilités"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
            <button
              key={day}
              onClick={() => handleDateSelect(`2024-01-${day.toString().padStart(2, '0')}`)}
              className={`p-2 rounded-lg ${
                selectedDate === `2024-01-${day.toString().padStart(2, '0')}`
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        {selectedDate && (
          <div className="space-y-4">
            <h4 className="font-semibold">Créneaux horaires disponibles pour le {selectedDate}</h4>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  onClick={() => handleTimeSlotSelect(slot)}
                  className={`p-2 rounded-lg ${
                    selectedTimeSlots.includes(slot)
                      ? 'bg-blue-600 text-white'
                      : 'border hover:bg-gray-100'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-semibold">Disponibilités sélectionnées :</h4>
          {availabilities.map(av => (
            <div key={av.date} className="p-2 bg-gray-50 rounded-lg">
              <p className="font-medium">{av.date}</p>
              <p className="text-sm text-gray-600">{av.timeSlots.join(', ')}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowCalendar(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={handleParticipationRequest}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Envoyer ma demande
          </button>
        </div>
      </div>
    </Dialog>
  );


  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ">
        <img
        
          src={activity.imageUrl}
          alt={activity.title}
          className="w-full h-65  cursor-pointer"
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
          <div className="mt-4 flex gap-2">
  <button
    onClick={() => setShowDetails(true)}
    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
  >
    Détails
  </button>
  <button
    onClick={() => setShowParticipateModal(true)}
    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
  >
    Participer
  </button>
</div>
        </div>
      </div>
      <Dialog isOpen={showDetails} onClose={() => setShowDetails(false)} title={activity.title}>
      <div className="relative space-y-6">
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="w-30 h-45 rounded-lg"
        />
   



          <div className="bg-gray-50 p-4 rounded-lg mb-2">
            <h4 className="font-semibold text-gray-800">Description</h4>
            <p className="text-gray-600 mb-4">{activity.description}</p>
          
            <div className="grid grid-cols-2 gap-1">
           
              <div className="flex items-center">
                <a 
                  href={`/profile/${activity.organizer.id}`}></a>
            </div>

        </div>
      </div>


      <div className="bg-gray-50 p-4 rounded-lg mt-2">
      <h4 className="font-semibold mb-2">Participants ({activity.participants.length}/{activity.maxParticipants})</h4>
            </div>
          </div>

          
      
          <div className="bg-gray-50 p-4 rounded-lg mt-2">
            <h5 className="font-semibold mb-2 text-gray-800">Logements disponibles à proximité :</h5>
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="priceFilter" className="text-sm font-medium text-gray-700">
                Budget max. / nuit (€) :
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
                    <img src={listing.imageUrl} alt={listing.name} className="w-full h-45 object-cover" />
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
       
          <div className="flex justify-end">
            <button
              onClick={() => setShowDetails(false)}
              className="bg-blue-600 text-white py-2 px-6 mt-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Fermer
            </button>
          </div>
    </Dialog>
    
    <Dialog
        isOpen={showParticipateModal}
        onClose={() => setShowParticipateModal(false)}
        title="Participer à l'événement"
      >
        <div className="space-y-4">
          <p>
            Vous êtes sur le point de participer à l'événement "{activity.title}".
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Rappel des informations</h4>
            <ul className="space-y-2">
              <li>Date : {activity.date}</li>
              <li>Heure : {activity.time}</li>
              <li>Lieu : {activity.location.address}</li>
            </ul>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowParticipateModal(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
          <div className="flex justify-end">
            <button
              onClick={() => {
                // Handle participation logic here
                setShowParticipateModal(false);
                setShowDetails(false);
                setShowCalendar(true);
              }}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Confirmer ma participation
            </button>
          </div>
        </div>
        </div>
      </Dialog>
    <CalendarComponent />

  </>
  );
}
