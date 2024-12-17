import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-500 mr-4 cursor-pointer" />
            <h1 className="text-2xl font-bold text-indigo-600">WestApp</h1>
          </div>
          
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des activités..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
              <User className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}