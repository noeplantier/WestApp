import React, { useState } from 'react';
import { Menu, Search, Bell, User, Compass } from 'lucide-react';
import { NotificationsPanel } from './notifications/NotificationsPanel';
import { useSearch } from '../hooks/useSearch';
import { Dialog } from './shared/Dialog';
import LocationMap from './map/LocationMap';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { searchQuery, setSearchQuery, filteredActivities } = useSearch();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu
              className="h-6 w-6 text-gray-500 mr-4 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            <h1 className="text-2xl font-bold text-indigo-600">WestApp</h1>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des activités..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMap(true)}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <Compass className="h-6 w-6 text-gray-500" />

            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-200 rounded-full"
              >
                <Bell className="h-6 w-6 text-gray-500" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              {showNotifications && <NotificationsPanel />}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200"
              >
                <User className="h-6 w-6 text-gray-500" />
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profil</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Paramètres</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Déconnexion</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {showMenu && (
          <div className="bg-white border-t border-gray-200 shadow-lg p-4">
            <ul>
              <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Accueil</li>
              <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Activités</li>
              <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Catégories</li>
              <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Aide</li>
            </ul>
          </div>
        )}
      </div>

      <Dialog isOpen={showMap} onClose={() => setShowMap(false)} title="Activités à proximité">
        <div className="h-[600px] w-full">
          <LocationMap center={undefined} activities={undefined} />
        </div>
      </Dialog>
    </header>
  );
}
