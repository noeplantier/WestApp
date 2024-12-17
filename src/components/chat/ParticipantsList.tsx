import React from 'react';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface ParticipantsListProps {
  participants: Participant[];
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <div className="w-64 border-l bg-white p-4">
      <h3 className="font-semibold mb-4">Participants ({participants.length})</h3>
      <div className="space-y-3">
        {participants.map((participant) => (
          <div key={participant.id} className="flex items-center gap-2">
            <div className="relative">
              <img
                src={participant.avatar}
                alt={participant.name}
                className="h-8 w-8 rounded-full"
              />
              <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                participant.isOnline ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            </div>
            <span className="text-sm">{participant.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}