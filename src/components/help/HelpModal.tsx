import React, { useState } from 'react';
import { ChevronDown, Mail, Shield, Users, Bell, HelpCircle, Share2, Star, X } from 'lucide-react';

const HelpModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('general');

  if (!isOpen) return null;

  const sections = {
    general: [
      {
        title: "Qu'est-ce que WestApp ?",
        content: "WestApp est un réseau social dédié au partage d'activités et d'expériences. Notre plateforme permet aux utilisateurs de découvrir, créer et participer à des activités dans leur région."
      },
      {
        title: "Comment créer un compte ?",
        content: "Pour créer un compte, cliquez sur 'S'inscrire' en haut à droite. Remplissez le formulaire avec vos informations personnelles et validez votre email pour commencer à utiliser WestApp."
      }
    ],
    securite: [
      {
        title: "Protection des données",
        content: "Vos données personnelles sont cryptées et sécurisées. Nous ne partageons jamais vos informations avec des tiers sans votre consentement."
      },
      {
        title: "Signalement de contenu",
        content: "Si vous rencontrez du contenu inapproprié, utilisez le bouton de signalement pour alerter notre équipe de modération."
      }
    ],
    activites: [
      {
        title: "Créer une activité",
        content: "Cliquez sur le bouton '+' pour créer une nouvelle activité. Remplissez les détails comme le titre, la description, la date et le lieu. Vous pouvez aussi ajouter des photos et des tags."
      },
      {
        title: "Participer à une activité",
        content: "Parcourez les activités disponibles et cliquez sur 'Participer' pour rejoindre celles qui vous intéressent. Vous recevrez une confirmation et pourrez échanger avec l'organisateur."
      }
    ],
    contact: [
      {
        title: "Support technique",
        content: "Pour toute question technique, contactez-nous à support@westapp.com. Notre équipe est disponible 7j/7 de 9h à 18h."
      },
      {
        title: "Suggestions",
        content: "Vos retours sont précieux ! Envoyez vos suggestions d'amélioration à feedback@westapp.com."
      }
    ]
  };

  const renderIcon = (section) => {
    switch (section) {
      case 'general':
        return <HelpCircle className="w-6 h-6" />;
      case 'securite':
        return <Shield className="w-6 h-6" />;
      case 'activites':
        return <Users className="w-6 h-6" />;
      case 'contact':
        return <Mail className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Centre d'aide WestApp</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg">
                <div className="p-2">
                  {Object.keys(sections).map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`w-full flex items-center space-x-2 p-2 rounded-lg mb-2 
                        ${activeSection === section 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'hover:bg-gray-100'}`}
                    >
                      {renderIcon(section)}
                      <span className="capitalize">
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3 overflow-y-auto max-h-[60vh]">
              <div className="bg-white">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
                  {activeSection}
                </h2>
                <div className="space-y-4">
                  {sections[activeSection].map((item, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;