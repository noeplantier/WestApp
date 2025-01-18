import React, { useState, useEffect } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Contrôle de l'ouverture du menu
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const { searchQuery, setSearchQuery, filteredActivities } = useSearch();

  const closeAllMenus = () => {
    setIsMenuOpen(false); // Ferme le menu
    setShowNotifications(false);
  };

  const handleOpenModal = (modalSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    closeAllMenus(); // Ferme tous les menus et notifications
    modalSetter(true); // Ouvre la modale cible
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.modale-content') &&
      !target.closest('.menu') &&
      !target.closest('.header-button')
    ) {
      closeAllMenus();
      setIsPremiumModalOpen(false);
      setShowCategoriesModal(false);
      setShowHelpModal(false);
      setShowMap(false);
      setShowProfileModal(false);
      setIsSettingsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Bouton pour ouvrir/fermer le menu */}
            <Menu
              className="menu h-6 w-6 text-gray-500 mr-4 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              onClick={() => handleOpenModal(setShowMap)}
              className="header-button p-1 hover:bg-gray-200 rounded-full"
            >
              <Compass className="h-5 w-5 text-gray-500" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="header-button relative p-1 hover:bg-gray-200 rounded-full"
              >
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-blue-600 rounded-full" />
              </button>
              {showNotifications && <NotificationsPanel />}
            </div>

            <div className="relative">
              <button
                onClick={() => handleOpenModal(setShowProfileModal)}
                className="header-button h-8 w-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200"
              >
                <User className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu déroulant */}
        {isMenuOpen && (
          <div className="menu absolute left-30 top-14 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <ul>
              <li
                className="py-2 px-4 cursor-pointer"
                onClick={() => handleOpenModal(setIsPremiumModalOpen)}
              >
                Premium
              </li>
              <li
                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOpenModal(setShowCategoriesModal)}
              >
                Catégories
              </li>
              <li
                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOpenModal(setShowHelpModal)}
              >
                Aide
              </li>
              <li
                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOpenModal(setIsSettingsOpen)}
              >
                Paramètres
              </li>
              <li className="py-2 px-4 cursor-pointer hover:bg-gray-100">Déconnexion</li>
            </ul>
          </div>
        )}
      </div>

      {/* Modales */}
      <PremiumModal isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)} />
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
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
      {showProfileModal && (
        <Dialog
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          title="Profil Utilisateur"
        >
          <UserProfile userId="user123" />
        </Dialog>
      )}
      {isSettingsOpen && (
        <SettingsModal open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      )}
    </header>
  );
}
