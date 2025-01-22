import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Mail, Link } from 'lucide-react';
import { Dialog } from './shared/Dialog';
import type { Activity } from '../types';

// Types étendus
interface Availability {
  date: string;
  timeSlots: string[];
}

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

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
          
          <div className="mt-4 space-y-2">
            <button
              onClick={() => setShowDetails(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Voir les détails
            </button>
            <button
              onClick={() => setShowCalendar(true)}
              className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors"
            >
              Sélectionner mes disponibilités
            </button>
          </div>
        </div>
      </div>

      <Dialog
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title={activity.title}
      >
        <div className="space-y-6">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          
          <div className="prose max-w-none">
            <p>{activity.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Détails</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{activity.date}</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{activity.time}</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{activity.location.address}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Organisateur</h4>
              <div className="flex items-center">
                <a 
                  href={`/profile/${activity.organizer.id}`}
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src={activity.organizer.avatar}
                    alt={activity.organizer.name}
                    className="h-12 w-12 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{activity.organizer.name}</p>
                    <p className="text-sm text-gray-600">{activity.organizer.bio}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Participants ({activity.participants.length}/{activity.maxParticipants})</h4>
            <div className="flex -space-x-2 overflow-hidden">
              {activity.participants.map((participant) => (
                <a
                  key={participant.id}
                  href={`/profile/${participant.id}`}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="h-8 w-8 rounded-full border-2 border-white"
                    title={participant.name}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowDetails(false);
                setShowCalendar(true);
              }}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Je veux participer
            </button>
          </div>
        </div>
      </Dialog>

      <CalendarComponent />
    </>
  );
}