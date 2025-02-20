import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MoreVertical } from 'lucide-react';

// Composant pour les messages individuels avec mémorisation
const ChatMessage = React.memo(({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`rounded-lg px-4 py-2 max-w-[70%] ${
        isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100'
      }`}>
        <p className="text-sm">{message.content}</p>
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
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour faire défiler vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulation d'envoi de message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    
    // Ajout du nouveau message
    const messageToSend = {
      id: Date.now(),
      content: newMessage,
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, messageToSend]);
    setNewMessage('');

    // Simulation de délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulation de réponse automatique
    const autoResponse = {
      id: Date.now() + 1,
      content: "Message reçu !",
      timestamp: new Date(),
      isOwn: false
    };

    setMessages(prev => [...prev, autoResponse]);
    setIsLoading(false);
  };

  // Gestionnaire de la touche Entrée
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl bg-white rounded-lg shadow">
      {/* En-tête du chat */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <h2 className="font-semibold">Chat en direct</h2>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical size={20} />
        </button>
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
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip size={20} />
          </button>
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écrivez votre message..."
              className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:border-blue-500"
              rows="1"
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={isLoading || !newMessage.trim()}
            className={`p-2 rounded-full ${
              isLoading || !newMessage.trim()
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;