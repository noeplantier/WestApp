import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import { Dialog } from './shared/Dialog';
import type { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showParticipateModal, setShowParticipateModal] = useState(false);

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
              onClick={() => setShowParticipateModal(true)}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Participer
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
                <img
                  src={activity.organizer.avatar}
                  alt={activity.organizer.name}
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{activity.organizer.name}</p>
                  <p className="text-sm text-gray-600">{activity.organizer.bio}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Participants ({activity.participants.length}/{activity.maxParticipants})</h4>
            <div className="flex -space-x-2 overflow-hidden">
              {activity.participants.map((participant) => (
                <img
                  key={participant.id}
                  src={participant.avatar}
                  alt={participant.name}
                  className="h-8 w-8 rounded-full border-2 border-white"
                  title={participant.name}
                />
              ))}
            </div>
          </div>
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
            <button
              onClick={() => {
                // Handle participation logic here
                setShowParticipateModal(false);
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Confirmer ma participation
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}