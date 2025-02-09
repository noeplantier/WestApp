import { useState, useEffect } from 'react';
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

export function SearchBar({ activities, onActivitySelect }: {
  activities: Activity[];
  onActivitySelect: (activity: Activity) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredActivities([]);
      return;
    }

    const filtered = activities.filter(activity => {
      const searchLower = searchQuery.toLowerCase();
      return (
        activity.title.toLowerCase().includes(searchLower) ||
        activity.description.toLowerCase().includes(searchLower) ||
        activity.location.city.toLowerCase().includes(searchLower) ||
        activity.categories.some(category => 
          category.toLowerCase().includes(searchLower)
        )
      );
    });

    setFilteredActivities(filtered);
  }, [searchQuery, activities]);

  return (
    <div className="flex justify-center mt-10 mb-4">
      <div className="flex-1 max-w-lg mx-6">
        <div className="searchbar relative flex justify-center items-center">
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
                    key={activity.id || activity.title}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onActivitySelect(activity)}
                  >
                    <div className="font-medium">{activity.title}</div>
                    <div className="text-sm text-gray-500">{activity.location.city}</div>
                  </div>
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