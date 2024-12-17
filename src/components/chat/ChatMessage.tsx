import React from 'react';
import { formatDistanceToNow } from '../utils/dateUtils';
import type { Message } from '../../types/chat';
import { Crown } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export function ChatMessage({ message, isOwnMessage }: ChatMessageProps) {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isOwnMessage && (
        <img
          src={message.sender.avatar}
          alt={message.sender.name}
          className="h-8 w-8 rounded-full mr-2"
        />
      )}
      <div className={`max-w-[70%] ${isOwnMessage ? 'bg-indigo-600 text-white' : 'bg-white'} rounded-lg p-3 shadow`}>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">
            {message.sender.name}
          </span>
          {message.sender.isPremium && (
            <Crown className="h-4 w-4 text-yellow-400" />
          )}
        </div>
        <p className="text-sm mt-1">{message.content}</p>
        {message.attachments?.map((attachment, index) => (
          attachment.type === 'image' ? (
            <img
              key={index}
              src={attachment.url}
              alt="attachment"
              className="mt-2 rounded-md max-w-full"
            />
          ) : (
            <a
              key={index}
              href={attachment.url}
              className="text-blue-500 hover:underline mt-2 block text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {attachment.url}
            </a>
          )
        ))}
        <span className="text-xs opacity-70 mt-1 block">
          {formatDistanceToNow(new Date(message.timestamp))}
        </span>
      </div>
    </div>
  );
}