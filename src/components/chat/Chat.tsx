import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Smile, Link2, Settings } from 'lucide-react';

// Composant pour l'avatar des amis
const FriendAvatar = ({ friend, isActive, onClick }) => (
  <div 
    onClick={onClick}
    className={`relative cursor-pointer transition-transform hover:scale-105 mb-4 ${isActive ? 'scale-110' : ''}`}
  >
    <img 
      src={friend.avatar} 
      alt={friend.name}
      className="w-12 h-12 rounded-full object-cover border-2 border-white"
    />
    {friend.isOnline && (
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"/>
    )}
  </div>
);

// Composant pour afficher les GIFs
const GifPicker = ({ onSelect, onClose }) => {
  const [gifs] = useState([
    '/api/placeholder/150/150',
    '/api/placeholder/150/150',
    '/api/placeholder/150/150',
  ]);

  return (
    <div className="absolute bottom-full mb-2 p-2 bg-white rounded-lg shadow-lg border">
      <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
        {gifs.map((gif, index) => (
          <img
            key={index}
            src={gif}
            alt={`gif-${index}`}
            className="w-[100px] h-[100px] object-cover rounded cursor-pointer hover:opacity-80"
            onClick={() => {
              onSelect(gif);
              onClose();
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Composant pour les messages individuels avec mémorisation
const ChatMessage = React.memo(({ message, isOwn }) => {
  const isMedia = message.type === 'image' || message.type === 'gif';
  const isLink = message.type === 'link';

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`rounded-lg px-4 py-2 max-w-[70%] ${
          isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100'
        }`}
      >
        {isMedia && (
          <img 
            src={message.content} 
            alt="media"
            className="rounded-lg max-w-full h-auto mb-2"
          />
        )}
        {isLink ? (
          <a 
            href={message.content} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {message.content}
          </a>
        ) : (
          <p className="text-sm">{message.content}</p>
        )}
        <span className="text-xs mt-1 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
});

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeUser, setActiveUser] = useState(null);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [theme, setTheme] = useState('default');
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [friends] = useState([
    { id: 1, name: "Alice", avatar: "/api/placeholder/50/50", isOnline: true },
    { id: 2, name: "Bob", avatar: "/api/placeholder/50/50", isOnline: false },
    { id: 3, name: "Charlie", avatar: "/api/placeholder/50/50", isOnline: true },
  ]);

  // Thèmes disponibles
  const themes = {
    default: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-100',
      text: 'text-black'
    },
    dark: {
      primary: 'bg-purple-500',
      secondary: 'bg-gray-700',
      text: 'text-white'
    },
    light: {
      primary: 'bg-green-500',
      secondary: 'bg-gray-50',
      text: 'text-gray-800'
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        sendMessage({ type: 'image', content: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = async (customMessage = null) => {
    const messageContent = customMessage || {
      type: 'text',
      content: newMessage.trim()
    };

    if (!messageContent.content) return;

    setIsLoading(true);

    const messageToSend = {
      id: Date.now(),
      ...messageContent,
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, messageToSend]);
    setNewMessage('');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-[600px] w-full max-w-4xl bg-white rounded-lg shadow">
      {/* Barre latérale des amis */}
      <div className="w-20 border-r p-4 flex flex-col items-center">
        {friends.map(friend => (
          <FriendAvatar
            key={friend.id}
            friend={friend}
            isActive={activeUser?.id === friend.id}
            onClick={() => setActiveUser(friend)}
          />
        ))}
      </div>

      {/* Zone principale du chat */}
      <div className="flex-1 flex flex-col">
        {/* En-tête du chat */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            {activeUser && (
              <>
                <img 
                  src={activeUser.avatar} 
                  alt={activeUser.name}
                  className="w-8 h-8 rounded-full"
                />
                <h2 className="font-semibold">{activeUser.name}</h2>
              </>
            )}
            {!activeUser && <h2 className="font-semibold">Sélectionnez un ami</h2>}
          </div>
          <div className="flex items-center space-x-2">
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="p-1 rounded border"
            >
              <option value="default">Défaut</option>
              <option value="dark">Sombre</option>
              <option value="light">Clair</option>
            </select>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Zone des messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} isOwn={msg.isOwn} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <button 
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image size={20} />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setShowGifPicker(!showGifPicker)}
            >
              <Smile size={20} />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => {
                const url = prompt('Entrez l\'URL :');
                if (url) {
                  sendMessage({ type: 'link', content: url });
                }
              }}
            >
              <Link2 size={20} />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Écrivez votre message..."
                className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:border-blue-500"
                rows="1"
              />
              {showGifPicker && (
                <GifPicker
                  onSelect={(gif) => sendMessage({ type: 'gif', content: gif })}
                  onClose={() => setShowGifPicker(false)}
                />
              )}
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !newMessage.trim()}
              className={`p-2 rounded-full ${
                isLoading || !newMessage.trim()
                  ? 'bg-gray-200 cursor-not-allowed'
                  : `${themes[theme].primary} hover:opacity-90 text-white`
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;