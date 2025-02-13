import { useState, useEffect, useRef, useMemo } from 'react';
import { Search } from 'lucide-react';

interface Activity {
  id?: string;
  title: string;
  description: string;
  date?: string;
  time?: string;
  location: {
    city: string;
    address: string;
  };
  categories: string[];
}

export function SearchBar({ 
  activities = [], // Valeur par défaut pour éviter les undefined
  onActivitySelect 
}: {
  activities: Activity[];
  onActivitySelect: (activity: Activity) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Optimisation avec useMemo pour éviter les recalculs inutiles
  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return activities.filter(activity => {
      if (!activity) return false;
      
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = activity.title?.toLowerCase().includes(searchLower) || false;
      const descriptionMatch = activity.description?.toLowerCase().includes(searchLower) || false;
      const cityMatch = activity.location?.city?.toLowerCase().includes(searchLower) || false;
      const categoryMatch = Array.isArray(activity.categories) && 
        activity.categories.some(category => 
          category?.toLowerCase().includes(searchLower)
        );

      return titleMatch || descriptionMatch || cityMatch || categoryMatch;
    });
  }, [searchQuery, activities]);

  // Gérer le clic en dehors de la barre de recherche
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gestionnaire de recherche optimisé avec debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(value.trim() !== '');
  };

  const handleActivitySelect = (activity: Activity) => {
    if (!activity) return;
    
    setSelectedActivityId(activity.id || activity.title);
    onActivitySelect(activity);
    setSearchQuery(activity.title);
    setIsDropdownOpen(false);
  };

  // Gérer les raccourcis clavier
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="flex justify-center mt-10 mb-4">
      <div className="flex-1 max-w-lg mx-6" ref={searchRef}>
        <div className="searchbar relative flex justify-center items-center">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery.trim() !== '' && setIsDropdownOpen(true)}
            placeholder="Rechercher des activités..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     transition-all duration-200 hover:border-gray-400"
            aria-label="Rechercher des activités"
          />
          <Search 
            className="absolute right-3 top-2.5 transform -translate-y-1/2 h-5 w-5 
                     text-gray-400 transition-colors duration-200 
                     group-hover:text-gray-500" 
          />
          
          {isDropdownOpen && searchQuery && (
            <div className="absolute top-full mt-2 w-full bg-white border 
                          border-gray-200 rounded-lg shadow-lg z-10 max-h-64 
                          overflow-y-auto">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  activity && (
                    <div
                      key={activity.id || activity.title}
                      className={`px-4 py-2 cursor-pointer transition-all duration-200
                                ${(activity.id || activity.title) === selectedActivityId 
                                  ? 'bg-blue-50 ring-2 ring-blue-400 ring-opacity-50' 
                                  : 'hover:bg-gray-50'}`}
                      onClick={() => handleActivitySelect(activity)}
                    >
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>{activity.location?.city}</span>
                        {Array.isArray(activity.categories) && 
                         activity.categories.length > 0 && (
                          <span className="text-xs px-2 py-0.5 bg-gray-100 
                                       rounded-full">
                            {activity.categories[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">Aucune activité trouvée.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}