import React from 'react';

const categories = [
  "Sport",
  "Culture",
  "Gastronomie",
  "Nature",
  "Musique",
  "Art",
  "Jeux",
  "Langue"
];

export function CategoryFilter() {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      {categories.map((category) => (
        <button
          key={category}
          className="px-4 py-2 rounded-full text-sm bg-white border border-gray-300 hover:border-indigo-500 hover:text-indigo-500 transition-colors"
        >
          {category}
        </button>
      ))}
    </div>
  );
}