import React, { useState } from 'react';
import { Send, Image, Paperclip } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ParticipantsList } from './ParticipantsList';
import type { ChatRoom as ChatRoomType } from '../../types/chat';

interface ChatRoomProps {
  chatRoom: ChatRoomType;
  currentUserId: string;
}

export function ChatRoom({ chatRoom, currentUserId }: ChatRoomProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    // Here you would typically dispatch an action or call an API
    setMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatRoom.messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isOwnMessage={msg.sender.id === currentUserId}
            />
          ))}
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Image className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Paperclip className="h-5 w-5 text-gray-500" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <ParticipantsList participants={chatRoom.participants} />
    </div>
  );
}