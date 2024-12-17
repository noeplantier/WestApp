import { useState, useMemo } from 'react';
import { useActivities } from './useActivities';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const { activities } = useActivities();

  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) return activities;

    const query = searchQuery.toLowerCase();
    return activities.filter((activity) => {
      return (
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.location.city.toLowerCase().includes(query) ||
        activity.category.toLowerCase().includes(query)
      );
    });
  }, [activities, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredActivities,
  };
}