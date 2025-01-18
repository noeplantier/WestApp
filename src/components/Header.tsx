import React, { useState } from 'react';
import { Menu, Search, Bell, User, Compass } from 'lucide-react';
import { NotificationsPanel } from './notifications/NotificationsPanel';
import { useSearch } from '../hooks/useSearch';
import { Dialog } from './shared/Dialog';
import LocationMap from './map/LocationMap';
import UserProfile from '../components/UserProfile';
import SettingsModal from './settings/SettingsModal';
import HelpModal from '../components/help/HelpModal';
import CategoriesModal from '../components/categories/CategoriesModal';
import { PremiumModal } from './premium/PremiumModal';




export function Header() {
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null); // Stocke l'utilisateur recherché
  const { searchQuery, setSearchQuery, filteredActivities } = useSearch();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);


  const handleHelpClick = () => {
    setShowMenu(false); // Ferme le menu
    setShowHelpModal(true); // Ouvre la modale
  
  };

  const handleCategoriesClick = () => {
    setShowMenu(false);
    setShowCategoriesModal(true);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu
              className="h-6 w-6 text-gray-500 mr-4 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            <h1 className="text-3xl font-bold text-blue-600">WestApp</h1>
          </div>

          <div className="flex-1 max-w-lg mx-6">
            <div className="searchbar relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des activités..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="absolute right-3 top-2.4 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

              {/* Résultats de recherche */}
              {searchQuery && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => console.log(`Selected activity: ${activity.name}`)}
                      >
                        {activity.name}
                      </div>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-500">Aucune activité trouvée.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowMap(true)}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <Compass className="h-5 w-5 text-gray-500" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1 hover:bg-gray-200 rounded-full"
              >
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-blue-600 rounded-full" />
              </button>
              {showNotifications && <NotificationsPanel />}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200"
              >
                <User className="h-5 w-5 text-gray-500" />
              </button>

              {showProfile && (
                <div className="main-infos absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedProfile('user123')} 
                    >
                      Profil
                    </li>
                    <li
  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
  onClick={() => setIsSettingsOpen(true)}
>
  Paramètres
</li>

<SettingsModal 
  open={isSettingsOpen}
  onClose={() => setIsSettingsOpen(false)}
/>
    
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Déconnexion</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>


      {showMenu && (
        <div className="absolute left-30 top-14 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <ul>
          <li
            className="py-2 px-4 cursor-pointer"
            onClick={() => setIsPremiumModalOpen(true)}
          >
            Premium
          </li>
            <li 
              className="py-2 px-4 cursor-pointer hover:bg-gray-100"
              onClick={handleCategoriesClick}
            >
              Catégories
            </li>
          <li 
              className="py-2 px-4 cursor-pointer hover:bg-gray-100"
              onClick={handleHelpClick}
            >
              Aide
            </li>
          </ul>
        </div>
      )}



      {/* Modal Premium */}
      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
      
      {/* Modal d'aide */}
      <HelpModal 
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </div>

    <CategoriesModal 
        isOpen={showCategoriesModal}
        onClose={() => setShowCategoriesModal(false)}
        userLocation="Paris"
        userInterests={['Sports', 'Culture', 'Technologie']}
      />
      

      <Dialog isOpen={showMap} onClose={() => setShowMap(false)} title="Activités à proximité">
        <div className="h-[600px] w-full">
          <LocationMap center={undefined} activities={undefined} />
        </div>
      </Dialog>

      {/* Affichage dynamique du profil utilisateur */}
      {selectedProfile && (
        <Dialog
          isOpen={!!selectedProfile}
          onClose={() => setSelectedProfile(null)}
          title="Profil Utilisateur"
        >
          <UserProfile userId={selectedProfile} />
        </Dialog>
      )}
    </header>
  );
}
